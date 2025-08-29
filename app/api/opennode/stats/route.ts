import { NextRequest, NextResponse } from 'next/server'

const OPENNODE_API_KEY = process.env.OPENNODE_API_KEY || ''
const OPENNODE_API_URL = 'https://api.opennode.com/v1'

interface OpenNodeCharge {
  id: string
  amount: number
  status: string
  created_at: number
  description?: string
  metadata?: {
    name?: string
  }
}

interface DonationStats {
  totalRaised: number
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

// Cache stats for 1 minute
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

    // If no API key, return mock data
    if (!OPENNODE_API_KEY || OPENNODE_API_KEY === '') {
      const mockStats: DonationStats = {
        totalRaised: 2100000, // 0.021 BTC
        donationCount: 42,
        recentDonations: [
          { amount: 21000, timestamp: new Date().toISOString(), name: "Satoshi" },
          { amount: 5000, timestamp: new Date(Date.now() - 3600000).toISOString(), name: "Lightning Fan" },
          { amount: 100000, timestamp: new Date(Date.now() - 7200000).toISOString(), name: "Bitcoin Maxi" }
        ],
        topDonors: [
          { name: "Bitcoin Legend", amount: 500000, rank: 1 },
          { name: "Lightning Maxi", amount: 250000, rank: 2 },
          { name: "Freedom Fighter", amount: 100000, rank: 3 }
        ]
      }
      return NextResponse.json(mockStats)
    }

    // Fetch charges from OpenNode
    const response = await fetch(`${OPENNODE_API_URL}/charges`, {
      headers: {
        'Authorization': OPENNODE_API_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`OpenNode API error: ${response.status}`)
    }

    const data = await response.json()
    const charges: OpenNodeCharge[] = data.data || []

    // Filter only paid charges
    const paidCharges = charges.filter(charge => 
      charge.status === 'paid' || charge.status === 'settled'
    )

    // Calculate stats
    let totalSats = 0
    const donorMap = new Map<string, number>()
    const recentDonations: DonationStats['recentDonations'] = []

    for (const charge of paidCharges) {
      totalSats += charge.amount

      // Track by donor name if available
      const donorName = charge.metadata?.name || charge.description?.split(' - ')[0] || 'Anonymous'
      const currentAmount = donorMap.get(donorName) || 0
      donorMap.set(donorName, currentAmount + charge.amount)

      // Add to recent donations
      recentDonations.push({
        amount: charge.amount,
        timestamp: new Date(charge.created_at * 1000).toISOString(),
        name: donorName
      })
    }

    // Sort recent donations by date
    recentDonations.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    // Get top donors
    const topDonors = Array.from(donorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, amount], index) => ({
        name,
        amount,
        rank: index + 1
      }))

    const stats: DonationStats = {
      totalRaised: totalSats,
      donationCount: paidCharges.length,
      recentDonations: recentDonations.slice(0, 10),
      topDonors
    }

    // Update cache
    statsCache = {
      data: stats,
      timestamp: Date.now()
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Failed to fetch OpenNode stats:', error)
    
    // Return mock data on error
    const mockStats: DonationStats = {
      totalRaised: 2100000,
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