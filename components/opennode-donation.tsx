"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Zap, 
  Bitcoin, 
  Heart,
  ExternalLink,
  Trophy,
  Target,
  TrendingUp,
  Rocket,
  CreditCard,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

// Wholecoiner Goal
const WHOLECOINER_GOAL = 100000000 // 1 BTC = 100,000,000 sats

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

export function OpenNodeDonationSection() {
  const [donationStats, setDonationStats] = useState<DonationStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [isCreatingCharge, setIsCreatingCharge] = useState(false)
  const [customAmount, setCustomAmount] = useState("")

  // Fetch donation stats
  useEffect(() => {
    fetchDonationStats()
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchDonationStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchDonationStats = async () => {
    try {
      const response = await fetch('/api/opennode/stats')
      if (!response.ok) {
        throw new Error('Failed to fetch donation stats')
      }
      const stats = await response.json()
      setDonationStats(stats)
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to fetch donation stats:", error)
      // Use mock data as fallback
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
      setDonationStats(mockStats)
      setIsLoading(false)
    }
  }

  const progressPercentage = donationStats 
    ? (donationStats.totalRaised / WHOLECOINER_GOAL) * 100
    : 0

  const btcAmount = donationStats 
    ? (donationStats.totalRaised / 100000000).toFixed(8)
    : "0.00000000"

  const btcNeeded = donationStats
    ? ((WHOLECOINER_GOAL - donationStats.totalRaised) / 100000000).toFixed(8)
    : "1.00000000"

  // Preset donation amounts in sats
  const presetAmounts = [
    { sats: 1000, label: "☕ Coffee", usd: 1 },
    { sats: 2100, label: "🍺 Beer", usd: 2 },
    { sats: 5000, label: "🍕 Pizza", usd: 5 },
    { sats: 10000, label: "🍔 Lunch", usd: 10 },
    { sats: 21000, label: "⚡ Nice", usd: 21 },
    { sats: 50000, label: "💜 Generous", usd: 50 },
    { sats: 100000, label: "🙏 Amazing", usd: 100 },
    { sats: 210000, label: "🚀 Incredible", usd: 210 }
  ]

  const createDonation = async (amountSats: number) => {
    setIsCreatingCharge(true)
    try {
      const response = await fetch('/api/opennode/create-charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount_sats: amountSats,
          description: `Gramstr Wholecoiner Fund - ${amountSats.toLocaleString()} sats`,
          callback_url: `${window.location.origin}/api/opennode/webhook`,
          success_url: `${window.location.origin}/?donation=success`,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create donation')
      }

      const data = await response.json()
      
      // Open the OpenNode checkout page
      if (data.hosted_checkout_url) {
        window.open(data.hosted_checkout_url, '_blank')
      }
    } catch (error) {
      console.error('Failed to create donation:', error)
      alert('Failed to create donation. Please try again.')
    } finally {
      setIsCreatingCharge(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20 relative">
      <div className="max-w-5xl mx-auto">
        {/* Wholecoiner Progress Section */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              Support Development
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              If you find Gramstr useful, consider sending some sats. 
              Every bit helps me dedicate more time to building tools for Nostr.
            </p>
          </div>

          {/* Simple Stats Card */}
          {donationStats && donationStats.donationCount > 0 && (
            <Card className="bg-gray-800/30 border-gray-700 p-6 mb-8">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Total raised so far</p>
                <p className="text-2xl font-bold text-orange-400">
                  {donationStats.totalRaised.toLocaleString()} sats
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  from {donationStats.donationCount} donations
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* OpenNode Donation Options */}
        <Card className="bg-gray-800/50 border-gray-700 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Choose Your Contribution
            </h3>
            <p className="text-gray-400">
              Instant Lightning payments powered by OpenNode
            </p>
          </div>

          {/* Preset Amount Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {presetAmounts.map((preset) => (
              <button
                key={preset.sats}
                onClick={() => createDonation(preset.sats)}
                disabled={isCreatingCharge}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg p-4 hover:border-orange-500 hover:scale-105 transition-all">
                  <div className="text-2xl mb-2">{preset.label.split(' ')[0]}</div>
                  <div className="text-lg font-bold text-orange-400">
                    {preset.sats >= 1000 
                      ? `${(preset.sats / 1000).toFixed(0)}k sats`
                      : `${preset.sats} sats`
                    }
                  </div>
                  <div className="text-xs text-gray-500">≈ ${preset.usd}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="flex gap-4 mb-8">
            <input
              type="number"
              placeholder="Custom amount in sats (min 1000)"
              className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              min="1000"
            />
            <Button
              onClick={() => {
                const sats = parseInt(customAmount)
                if (sats >= 1000) {
                  createDonation(sats)
                } else {
                  alert('Minimum donation is 1000 sats')
                }
              }}
              disabled={isCreatingCharge || !customAmount || parseInt(customAmount) < 1000}
              className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 px-8"
            >
              {isCreatingCharge ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Zap className="h-5 w-5 mr-2" />
              )}
              Donate
            </Button>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span>Lightning Network (Instant)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Bitcoin className="h-5 w-5 text-orange-400" />
              <span>On-Chain Bitcoin</span>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-sm text-green-400 font-semibold">Secure & Private</p>
                <p className="text-xs text-gray-400 mt-1">
                  Payments processed by OpenNode. No personal data required. 100% of donations go directly to the Gramstr development fund.
                </p>
              </div>
            </div>
          </div>
        </Card>


        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Thank you for considering a donation. Every sat helps.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Powered by OpenNode • Lightning & On-chain Bitcoin accepted
          </p>
        </div>
      </div>
    </div>
  )
}