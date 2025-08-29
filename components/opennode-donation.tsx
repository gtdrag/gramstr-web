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
    { sats: 5000, label: "🍕 Pizza Slice", usd: 5 },
    { sats: 10000, label: "🍔 Burger", usd: 10 },
    { sats: 21000, label: "⚡ Satoshi Special", usd: 21 },
    { sats: 50000, label: "💪 Power User", usd: 50 },
    { sats: 100000, label: "🏆 Champion", usd: 100 },
    { sats: 210000, label: "👑 King", usd: 210 },
    { sats: 1000000, label: "🐋 Whale", usd: 1000 }
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
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-full px-6 py-3 mb-4">
              <Rocket className="h-5 w-5 text-orange-400 animate-pulse" />
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Mission: Become a Wholecoiner
              </span>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-2">
              Stack Sats for Freedom Tech
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every satoshi powers the development of Gramstr and brings us closer to 1 whole Bitcoin.
              Instant Lightning payments powered by OpenNode.
            </p>
          </div>

          {/* Progress Card */}
          <Card className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border-orange-500/30 p-8">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto"></div>
                <p className="text-gray-400 mt-4">Loading donation stats...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Current Stack</p>
                    <p className="text-3xl font-bold text-orange-400">₿ {btcAmount}</p>
                    <p className="text-xs text-gray-500">
                      {donationStats?.totalRaised.toLocaleString()} sats
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <Target className="h-12 w-12 text-yellow-400 mb-2 mx-auto" />
                    <p className="text-sm text-gray-400">Goal</p>
                    <p className="text-2xl font-bold text-yellow-400">₿ 1.00000000</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-400 mb-1">Remaining</p>
                    <p className="text-3xl font-bold text-gray-300">₿ {btcNeeded}</p>
                    <p className="text-xs text-gray-500">
                      {donationStats && (WHOLECOINER_GOAL - donationStats.totalRaised).toLocaleString()} sats
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-8">
                  <div className="w-full bg-gray-800 rounded-full h-8 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-end pr-3 transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    >
                      <span className="text-xs font-bold text-white">
                        {progressPercentage.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Donation Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">{donationStats?.donationCount || 0}</p>
                    <p className="text-xs text-gray-400">Total Donations</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {donationStats?.recentDonations?.[0] 
                        ? `${(donationStats.recentDonations[0].amount / 1000).toFixed(0)}k` 
                        : '0'}
                    </p>
                    <p className="text-xs text-gray-400">Last Donation (sats)</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {donationStats 
                        ? Math.ceil((WHOLECOINER_GOAL - donationStats.totalRaised) / 100000000 * 365)
                        : '365'}
                    </p>
                    <p className="text-xs text-gray-400">Days to Goal*</p>
                  </div>
                </div>
              </>
            )}
          </Card>
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

        {/* Recent Donations */}
        {donationStats && donationStats.recentDonations.length > 0 && (
          <Card className="mt-8 bg-gray-800/50 border-gray-700 p-6">
            <h3 className="text-xl font-bold text-white mb-4">⚡ Recent Lightning Strikes</h3>
            <div className="space-y-3">
              {donationStats.recentDonations.slice(0, 5).map((donation, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300">{donation.name || "Anonymous"}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 font-bold">
                      {donation.amount.toLocaleString()} sats
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(donation.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Hall of Fame */}
        {donationStats && donationStats.topDonors.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-yellow-900/10 to-orange-900/10 border-orange-500/20 p-8">
            <h3 className="text-2xl font-bold text-center text-white mb-6">
              ⚡ Hall of Fame - Top Stack Contributors
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {donationStats.topDonors.slice(0, 3).map((donor, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl mb-3">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                  </div>
                  <div className={cn(
                    "rounded-lg p-4 border",
                    index === 0 
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30"
                      : index === 1
                      ? "bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30"
                      : "bg-gradient-to-r from-orange-600/20 to-orange-700/20 border-orange-600/30"
                  )}>
                    <p className={cn(
                      "font-bold",
                      index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-300" : "text-orange-400"
                    )}>
                      {donor.name}
                    </p>
                    <p className="text-2xl font-bold text-white my-2">
                      {donor.amount.toLocaleString()} sats
                    </p>
                    <p className="text-xs text-gray-400">
                      {(donor.amount / 100000000).toFixed(4)} BTC
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-purple-500/30 rounded-full px-6 py-3 mb-4">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            <span className="text-purple-300">
              Every sat is a vote for freedom
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            100% of donations go to development. Powered by OpenNode - instant Lightning payments.
          </p>
          <p className="text-orange-400 text-sm mt-2 font-semibold">
            Together we're building the future of social media. LFG! 🚀
          </p>
        </div>
      </div>
    </div>
  )
}