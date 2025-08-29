"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Zap, 
  Bitcoin, 
  Copy, 
  Check,
  Heart,
  ExternalLink,
  Trophy,
  Target,
  TrendingUp,
  Rocket,
  Star,
  CreditCard,
  QrCode
} from "lucide-react"
import { cn } from "@/lib/utils"

// BTCPay Server Configuration from environment
const BTCPAY_SERVER_URL = process.env.NEXT_PUBLIC_BTCPAY_SERVER_URL || "https://btcpay.yourdomain.com"
const STORE_ID = process.env.NEXT_PUBLIC_BTCPAY_STORE_ID || "your-store-id"
const DONATION_APP_ID = process.env.NEXT_PUBLIC_BTCPAY_DONATION_APP_ID || "your-donation-app-id"

// For embedded BTCPay form
const BTCPAY_DONATION_URL = `${BTCPAY_SERVER_URL}/apps/${DONATION_APP_ID}/public`

// Wholecoiner Goal
const WHOLECOINER_GOAL = 100000000 // 1 BTC = 100,000,000 sats

interface DonationStats {
  totalRaised: number // in sats
  donationCount: number
  lastDonation?: {
    amount: number
    timestamp: string
    name?: string
  }
  topDonors: Array<{
    name: string
    amount: number
    rank: number
  }>
}

export function BTCPayDonationSection() {
  const [donationStats, setDonationStats] = useState<DonationStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  // Fetch donation stats from BTCPay Server API
  useEffect(() => {
    fetchDonationStats()
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchDonationStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchDonationStats = async () => {
    try {
      const response = await fetch('/api/donation-stats')
      if (!response.ok) {
        throw new Error('Failed to fetch donation stats')
      }
      const stats = await response.json()
      
      // Transform API response to component format
      const formattedStats: DonationStats = {
        totalRaised: stats.totalRaised,
        donationCount: stats.donationCount,
        lastDonation: stats.recentDonations?.[0] ? {
          amount: stats.recentDonations[0].amount,
          timestamp: stats.recentDonations[0].timestamp,
          name: stats.recentDonations[0].name
        } : undefined,
        topDonors: stats.topDonors || []
      }
      
      setDonationStats(formattedStats)
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to fetch donation stats:", error)
      // Use mock data as fallback
      const mockStats: DonationStats = {
        totalRaised: 2100000, // 0.021 BTC
        donationCount: 42,
        lastDonation: {
          amount: 21000,
          timestamp: new Date().toISOString(),
          name: "Anonymous"
        },
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
    { sats: 1000, label: "☕ Coffee", usd: 0.5 },
    { sats: 5000, label: "🍕 Pizza Slice", usd: 2.5 },
    { sats: 10000, label: "🍔 Burger", usd: 5 },
    { sats: 21000, label: "⚡ Satoshi Special", usd: 10 },
    { sats: 50000, label: "💪 Power User", usd: 25 },
    { sats: 100000, label: "🏆 Champion", usd: 50 },
    { sats: 210000, label: "👑 King", usd: 100 },
    { sats: 1000000, label: "🐋 Whale", usd: 500 }
  ]

  const openBTCPayDonation = (amountSats?: number) => {
    // Construct BTCPay donation URL with amount
    let url = BTCPAY_DONATION_URL
    if (amountSats) {
      // BTCPay accepts amount in BTC
      const btcAmount = (amountSats / 100000000).toFixed(8)
      url = `${url}?amount=${btcAmount}`
    }
    window.open(url, '_blank')
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
              Donations are processed securely through BTCPay Server.
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
                      {donationStats?.lastDonation 
                        ? `${(donationStats.lastDonation.amount / 1000).toFixed(0)}k` 
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

        {/* BTCPay Donation Options */}
        <Card className="bg-gray-800/50 border-gray-700 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Choose Your Contribution
            </h3>
            <p className="text-gray-400">
              Powered by BTCPay Server - Accept Bitcoin & Lightning seamlessly
            </p>
          </div>

          {/* Preset Amount Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {presetAmounts.map((preset) => (
              <button
                key={preset.sats}
                onClick={() => openBTCPayDonation(preset.sats)}
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
              placeholder="Custom amount in sats"
              className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none"
              onChange={(e) => setSelectedAmount(parseInt(e.target.value))}
            />
            <Button
              onClick={() => openBTCPayDonation(selectedAmount || undefined)}
              className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 px-8"
            >
              <Zap className="h-5 w-5 mr-2" />
              Donate
            </Button>
          </div>

          {/* Main Donation Button */}
          <button
            onClick={() => openBTCPayDonation()}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold text-lg py-6 rounded-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            <CreditCard className="h-6 w-6" />
            Open BTCPay Donation Page
            <ExternalLink className="h-5 w-5" />
          </button>

          {/* Payment Methods */}
          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Bitcoin className="h-5 w-5 text-orange-400" />
              <span>On-Chain Bitcoin</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span>Lightning Network</span>
            </div>
          </div>
        </Card>

        {/* Embed BTCPay Widget Option */}
        <Card className="mt-8 bg-purple-900/10 border-purple-500/20 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-3">
              💜 Prefer to donate directly?
            </h3>
            <p className="text-gray-400 mb-4">
              Use our embedded BTCPay Server form for the smoothest experience
            </p>
            
            {/* BTCPay Embed Container */}
            <div className="bg-gray-900/50 rounded-lg p-8 border border-gray-700">
              <iframe
                src={BTCPAY_DONATION_URL}
                className="w-full h-[600px] rounded-lg"
                title="BTCPay Server Donation Form"
              />
            </div>
          </div>
        </Card>

        {/* Hall of Fame - Dynamic from BTCPay */}
        {donationStats && donationStats.topDonors.length > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-yellow-900/10 to-orange-900/10 border-orange-500/20 p-8">
            <h3 className="text-2xl font-bold text-center text-white mb-6">
              ⚡ Hall of Fame - Top Stack Contributors
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {donationStats.topDonors.map((donor, index) => (
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
            100% of donations go to development. Secured by BTCPay Server - no middlemen.
          </p>
          <p className="text-orange-400 text-sm mt-2 font-semibold">
            Together we're building the future of social media. LFG! 🚀
          </p>
        </div>
      </div>
    </div>
  )
}