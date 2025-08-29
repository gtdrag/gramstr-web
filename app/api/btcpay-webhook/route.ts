import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// BTCPay Server Webhook Secret
const WEBHOOK_SECRET = process.env.BTCPAY_WEBHOOK_SECRET || ''

interface BTCPayWebhookPayload {
  deliveryId: string
  webhookId: string
  originalDeliveryId: string
  isRedelivery: boolean
  type: string // "InvoiceProcessing", "InvoiceSettled", etc.
  timestamp: number
  storeId: string
  invoiceId: string
  metadata?: {
    orderId?: string
    buyerName?: string
    itemDesc?: string
  }
  // Invoice details
  invoice?: {
    id: string
    amount: string
    currency: string
    status: string
    createdTime: number
    metadata?: any
  }
}

// Verify webhook signature from BTCPay
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  const expectedSignature = hmac.digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

// Invalidate donation stats cache when new payment received
async function invalidateStatsCache() {
  // In production, you might use Redis or another cache system
  // For now, we'll rely on the API route's internal cache timeout
  console.log('New donation received - cache will refresh on next request')
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text()
    
    // Get signature from headers
    const signature = request.headers.get('BTCPay-Sig') || ''
    
    // Verify webhook signature if secret is configured
    if (WEBHOOK_SECRET) {
      const isValid = verifyWebhookSignature(rawBody, signature, WEBHOOK_SECRET)
      if (!isValid) {
        console.error('Invalid webhook signature')
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      }
    }
    
    // Parse webhook payload
    const payload: BTCPayWebhookPayload = JSON.parse(rawBody)
    
    console.log(`BTCPay webhook received: ${payload.type} for invoice ${payload.invoiceId}`)
    
    // Handle different webhook types
    switch (payload.type) {
      case 'InvoiceSettled':
      case 'InvoiceComplete':
        // Payment confirmed - update stats
        await invalidateStatsCache()
        
        // You could also send notifications, update database, etc.
        console.log(`Payment confirmed for invoice ${payload.invoiceId}`)
        
        // Optional: Send notification to Discord/Telegram
        if (payload.invoice) {
          const btcAmount = parseFloat(payload.invoice.amount)
          const satsAmount = Math.round(btcAmount * 100000000)
          const donorName = payload.metadata?.buyerName || 'Anonymous'
          
          console.log(`New donation: ${satsAmount} sats from ${donorName}`)
          
          // Here you could send to Discord webhook, Telegram bot, etc.
        }
        break
        
      case 'InvoiceProcessing':
        // Payment detected but not confirmed yet
        console.log(`Payment processing for invoice ${payload.invoiceId}`)
        break
        
      case 'InvoiceExpired':
        // Invoice expired without payment
        console.log(`Invoice expired: ${payload.invoiceId}`)
        break
        
      default:
        console.log(`Unhandled webhook type: ${payload.type}`)
    }
    
    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Failed to process BTCPay webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

// Also handle GET for webhook verification
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'BTCPay webhook endpoint active',
    timestamp: new Date().toISOString()
  })
}