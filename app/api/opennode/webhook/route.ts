import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const OPENNODE_WEBHOOK_SECRET = process.env.OPENNODE_WEBHOOK_SECRET || ''

interface OpenNodeWebhookPayload {
  id: string
  callback_url: string
  success_url: string
  status: string
  order_id: string
  description: string
  price: number
  fee: number
  auto_settle: boolean
  hashed_order_id: string
}

// Verify webhook signature from OpenNode
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

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text()
    
    // Get signature from headers
    const signature = request.headers.get('OpenNode-Signature') || ''
    
    // Verify webhook signature if secret is configured
    if (OPENNODE_WEBHOOK_SECRET && OPENNODE_WEBHOOK_SECRET !== '') {
      const isValid = verifyWebhookSignature(rawBody, signature, OPENNODE_WEBHOOK_SECRET)
      if (!isValid) {
        console.error('Invalid OpenNode webhook signature')
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      }
    }
    
    // Parse webhook payload
    const payload: OpenNodeWebhookPayload = JSON.parse(rawBody)
    
    console.log(`OpenNode webhook received: ${payload.status} for charge ${payload.id}`)
    
    // Handle different webhook statuses
    switch (payload.status) {
      case 'paid':
      case 'settled':
        // Payment confirmed
        console.log(`Payment confirmed for charge ${payload.id}`)
        console.log(`Amount: ${payload.price} sats`)
        console.log(`Description: ${payload.description}`)
        
        // Invalidate stats cache so next request fetches fresh data
        // In production, you might store this in a database
        
        // Optional: Send notification to Discord/Telegram/Nostr
        if (payload.price >= 10000) { // Notify for donations >= 10k sats
          console.log(`Large donation received: ${payload.price} sats!`)
          // Here you could send to Discord webhook, Telegram bot, etc.
        }
        break
        
      case 'processing':
        // Payment detected but not confirmed yet
        console.log(`Payment processing for charge ${payload.id}`)
        break
        
      case 'expired':
        // Invoice expired without payment
        console.log(`Invoice expired: ${payload.id}`)
        break
        
      default:
        console.log(`Unhandled webhook status: ${payload.status}`)
    }
    
    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error('Failed to process OpenNode webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

// Also handle GET for webhook verification
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'OpenNode webhook endpoint active',
    timestamp: new Date().toISOString()
  })
}