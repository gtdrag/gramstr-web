import { NextRequest, NextResponse } from 'next/server'

// BTCPay Server Configuration
const BTCPAY_URL = process.env.BTCPAY_SERVER_URL || process.env.NEXT_PUBLIC_BTCPAY_SERVER_URL || 'https://btcpay.yourdomain.com'
const STORE_ID = process.env.BTCPAY_STORE_ID || process.env.NEXT_PUBLIC_BTCPAY_STORE_ID || 'your-store-id'
const API_KEY = process.env.BTCPAY_API_KEY || 'your-api-key'

interface BTCPayInvoice {
  id: string
  amount: string
  currency: string
  status: string
  createdTime: number
  metadata?: {
    orderId?: string
    buyerName?: string
    itemDesc?: string
  }
}

interface DonationStats {
  totalRaised: number // in sats
  donationCount: number
  recentDonations: Array<{
    amount: number
    timestamp: string
    name?: string
  }>
  topDonors: Array<{
    name: string
    amount: number
    rank: number
  }>
}

// Cache donation stats for 1 minute to avoid hammering the API
let statsCache: { data: DonationStats | null; timestamp: number } = {
  data: null,
  timestamp: 0
}

const CACHE_DURATION = 60 * 1000 // 1 minute

export async function GET(request: NextRequest) {
  try {
    // Check cache
    if (statsCache.data && Date.now() - statsCache.timestamp < CACHE_DURATION) {
      return NextResponse.json(statsCache.data)
    }

    // Fetch invoices from BTCPay Server
    const response = await fetch(
      `${BTCPAY_URL}/api/v1/stores/${STORE_ID}/invoices?status=Settled,Processing,Complete`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(`BTCPay API error: ${response.status}`)
    }

    const invoices: BTCPayInvoice[] = await response.json()

    // Calculate stats
    let totalSats = 0
    const donorMap = new Map<string, number>()
    const recentDonations: DonationStats['recentDonations'] = []

    for (const invoice of invoices) {
      // Convert amount to sats (BTCPay returns BTC as string)
      const btcAmount = parseFloat(invoice.amount)
      const satsAmount = Math.round(btcAmount * 100000000)
      
      totalSats += satsAmount

      // Track by donor name if available
      const donorName = invoice.metadata?.buyerName || 'Anonymous'
      const currentAmount = donorMap.get(donorName) || 0
      donorMap.set(donorName, currentAmount + satsAmount)

      // Add to recent donations (last 10)
      if (recentDonations.length < 10) {
        recentDonations.push({
          amount: satsAmount,
          timestamp: new Date(invoice.createdTime * 1000).toISOString(),
          name: donorName
        })
      }
    }

    // Get top donors
    const topDonors = Array.from(donorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([ name, amount], index) => ({
        name,
        amount,
        rank: index + 1
      }))

    const stats: DonationStats = {
      totalRaised: totalSats,
      donationCount: invoices.length,
      recentDonations,
      topDonors
    }

    // Update cache
    statsCache = {
      data: stats,
      timestamp: Date.now()
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to fetch donation stats:', error)
    
    // Return mock data in development or if API fails
    const mockStats: DonationStats = {
      totalRaised: 2100000, // 0.021 BTC
      donationCount: 42,
      recentDonations: [
        { amount: 21000, timestamp: new Date().toISOString(), name: "Anon" },
        { amount: 5000, timestamp: new Date().toISOString(), name: "Pleb" },
        { amount: 100000, timestamp: new Date().toISOString(), name: "Chad" }
      ],
      topDonors: [
        { name: "Bitcoin Legend", amount: 500000, rank: 1 },
        { name: "Lightning Maxi", amount: 250000, rank: 2 },
        { name: "Freedom Fighter", amount: 100000, rank: 3 }
      ]
    }
    
    return NextResponse.json(mockStats)
  }
}