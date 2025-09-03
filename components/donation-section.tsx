"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Zap, 
  Bitcoin, 
  Copy, 
  Check,
  Heart,
  QrCode,
  ExternalLink,
  Trophy,
  Target,
  TrendingUp,
  Rocket,
  Star,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

// YOU NEED TO UPDATE THESE WITH YOUR ACTUAL ADDRESSES
const LIGHTNING_ADDRESS = "drag@primal.net" 
const BITCOIN_ADDRESS = "bc1qp3fdxyy92du6p760ucp5m6u783luhdr48ajxgu"
const NOSTR_NPUB = "drag@primal.net" // Lightning address for Nostr zaps
const LNURL = "drag@primal.net" // Using Lightning address as LNURL

// Wholecoiner Progress (in sats)
const SATS_RAISED = 2100000 // Current amount raised (0.021 BTC)
const WHOLECOINER_GOAL = 100000000 // 1 BTC = 100,000,000 sats

export function DonationSection() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'lightning' | 'onchain' | 'nostr'>('lightning')
  const [showConfetti, setShowConfetti] = useState(false)
  const qrCanvasRef = useRef<HTMLCanvasElement>(null)
  const qrCanvasRefBtc = useRef<HTMLCanvasElement>(null)

  // Generate QR codes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('qrcode').then((QRCode) => {
        // Lightning QR
        if (qrCanvasRef.current) {
          QRCode.default.toCanvas(qrCanvasRef.current, `lightning:${LIGHTNING_ADDRESS}`, {
            width: 200,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          })
        }
        
        // Bitcoin QR
        if (qrCanvasRefBtc.current) {
          QRCode.default.toCanvas(qrCanvasRefBtc.current, `bitcoin:${BITCOIN_ADDRESS}`, {
            width: 200,
            margin: 1,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          })
        }
      })
    }
  }, [activeTab])

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAddress(type)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const progressPercentage = (SATS_RAISED / WHOLECOINER_GOAL) * 100
  const btcAmount = (SATS_RAISED / 100000000).toFixed(8)
  const btcNeeded = ((WHOLECOINER_GOAL - SATS_RAISED) / 100000000).toFixed(8)

  // Donation tiers
  const donationTiers = [
    { amount: 1000, label: "Coffee ☕", description: "Buy me a coffee" },
    { amount: 5000, label: "Lunch 🍕", description: "Buy me lunch" },
    { amount: 10000, label: "Supporter 💪", description: "Serious support" },
    { amount: 50000, label: "Champion 🏆", description: "Champion tier" },
    { amount: 100000, label: "Legend 👑", description: "Legendary support" },
    { amount: 1000000, label: "Whale 🐋", description: "Whale-coiner!" },
  ]

  return (
    <div className="container mx-auto px-4 py-20 relative">
      <div className="max-w-5xl mx-auto">
        {/* Wholecoiner Progress Bar */}
        <div className="mb-12 relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-full px-6 py-3 mb-4">
              <Rocket className="h-5 w-5 text-orange-400 animate-pulse" />
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Mission: Become a Wholecoiner
              </span>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-2">
              Help Stack Sats for Freedom Tech
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Every satoshi donated goes directly to development and the dream of reaching 1 whole Bitcoin. 
              Join the journey to financial sovereignty!
            </p>
          </div>

          {/* Progress Card */}
          <Card className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border-orange-500/30 p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Current Stack</p>
                <p className="text-3xl font-bold text-orange-400">₿ {btcAmount}</p>
                <p className="text-xs text-gray-500">{SATS_RAISED.toLocaleString()} sats</p>
              </div>
              
              <div className="text-center">
                <Target className="h-12 w-12 text-yellow-400 mb-2 mx-auto" />
                <p className="text-sm text-gray-400">Goal</p>
                <p className="text-2xl font-bold text-yellow-400">₿ 1.00000000</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">Remaining</p>
                <p className="text-3xl font-bold text-gray-300">₿ {btcNeeded}</p>
                <p className="text-xs text-gray-500">{(WHOLECOINER_GOAL - SATS_RAISED).toLocaleString()} sats</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
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
              
              {/* Milestone Markers */}
              <div className="absolute -top-2 left-0 w-full flex justify-between">
                {[0, 25, 50, 75, 100].map((milestone) => (
                  <div 
                    key={milestone}
                    className="relative"
                    style={{ left: `${milestone}%` }}
                  >
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2",
                      progressPercentage >= milestone 
                        ? "bg-orange-500 border-orange-400" 
                        : "bg-gray-700 border-gray-600"
                    )} />
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                      {milestone === 0 ? '0' : milestone === 100 ? '1 BTC' : `${milestone/100} BTC`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivational Message */}
            <div className="mt-8 text-center">
              {progressPercentage < 25 && (
                <p className="text-lg text-gray-300">
                  🚀 The journey begins! Every sat counts!
                </p>
              )}
              {progressPercentage >= 25 && progressPercentage < 50 && (
                <p className="text-lg text-orange-300">
                  ⚡ Quarter of the way there! Keep stacking!
                </p>
              )}
              {progressPercentage >= 50 && progressPercentage < 75 && (
                <p className="text-lg text-yellow-300">
                  🎯 Halfway to wholecoiner status! LFG!
                </p>
              )}
              {progressPercentage >= 75 && progressPercentage < 100 && (
                <p className="text-lg text-green-300">
                  🏆 So close! The final push to 1 BTC!
                </p>
              )}
              {progressPercentage >= 100 && (
                <p className="text-lg text-green-400 font-bold">
                  👑 WHOLECOINER ACHIEVED! Thank you legends!
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Donation Options */}
        <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('lightning')}
              className={cn(
                "flex-1 px-6 py-4 font-medium transition-colors relative",
                activeTab === 'lightning' 
                  ? "text-orange-400 bg-orange-500/10" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-5 w-5" />
                <span>Lightning</span>
              </div>
              {activeTab === 'lightning' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400" />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('onchain')}
              className={cn(
                "flex-1 px-6 py-4 font-medium transition-colors relative",
                activeTab === 'onchain' 
                  ? "text-orange-400 bg-orange-500/10" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <Bitcoin className="h-5 w-5" />
                <span>On-Chain</span>
              </div>
              {activeTab === 'onchain' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('nostr')}
              className={cn(
                "flex-1 px-6 py-4 font-medium transition-colors relative",
                activeTab === 'nostr' 
                  ? "text-purple-400 bg-purple-500/10" 
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-5 w-5" />
                <span>Nostr Zaps</span>
              </div>
              {activeTab === 'nostr' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab === 'lightning' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    ⚡ Lightning Network - Instant Sats
                  </h3>
                  
                  {/* QR Code */}
                  <div className="inline-block bg-white p-4 rounded-lg mb-6">
                    <canvas ref={qrCanvasRef} />
                  </div>
                </div>

                {/* Lightning Address */}
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                    Lightning Address
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-orange-400 font-mono text-sm break-all">
                      {LIGHTNING_ADDRESS}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(LIGHTNING_ADDRESS, 'lightning')}
                      className="border-gray-600 hover:border-orange-500"
                    >
                      {copiedAddress === 'lightning' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>


                <a 
                  href={`lightning:${LIGHTNING_ADDRESS}`}
                  className="block"
                >
                  <Button className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-lg py-6">
                    <Zap className="h-5 w-5 mr-2" />
                    Open Lightning Wallet
                  </Button>
                </a>
              </div>
            )}

            {activeTab === 'onchain' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    ₿ On-Chain Bitcoin - Big Stacks
                  </h3>
                  
                  {/* QR Code */}
                  <div className="inline-block bg-white p-4 rounded-lg mb-6">
                    <canvas ref={qrCanvasRefBtc} />
                  </div>
                </div>

                {/* Bitcoin Address */}
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                    Bitcoin Address (Native SegWit)
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-orange-400 font-mono text-xs break-all">
                      {BITCOIN_ADDRESS}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(BITCOIN_ADDRESS, 'bitcoin')}
                      className="border-gray-600 hover:border-orange-500"
                    >
                      {copiedAddress === 'bitcoin' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-lg py-6"
                  onClick={() => copyToClipboard(BITCOIN_ADDRESS, 'bitcoin-button')}
                >
                  {copiedAddress === 'bitcoin-button' ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Address Copied! Send those sats!
                    </>
                  ) : (
                    <>
                      <Copy className="h-5 w-5 mr-2" />
                      Copy Bitcoin Address
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-500">
                  Minimum recommended: 0.001 BTC (100,000 sats)
                </div>
              </div>
            )}

            {activeTab === 'nostr' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    ⚡💜 Nostr Zaps - Social Sats
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Send zaps directly through Nostr - the most cypherpunk way to support!
                  </p>
                </div>

                {/* Nostr Profile */}
                <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-500/30">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">@drag</h4>
                      <p className="text-sm text-purple-400">Building freedom tech</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
                    <label className="text-xs text-gray-500 uppercase tracking-wider mb-1 block">
                      Lightning Address for Zaps
                    </label>
                    <code className="text-xs text-purple-400 font-mono break-all">
                      {NOSTR_NPUB}
                    </code>
                  </div>

                </div>

                <div className="flex gap-3">
                  <a href="https://snort.social/" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Zap on Snort
                    </Button>
                  </a>
                  <a href="https://primal.net/" target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Zap on Primal
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Hall of Fame */}
        <Card className="mt-8 bg-gradient-to-r from-yellow-900/10 to-orange-900/10 border-orange-500/20 p-8">
          <h3 className="text-2xl font-bold text-center text-white mb-6">
            ⚡ Hall of Fame - Top Stack Contributors
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Gold */}
            <div className="text-center">
              <div className="text-5xl mb-3">🥇</div>
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
                <p className="font-bold text-yellow-400">Anonymous Legend</p>
                <p className="text-2xl font-bold text-white my-2">500,000 sats</p>
                <p className="text-xs text-gray-400">0.005 BTC contributed</p>
                <div className="mt-2 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Silver */}
            <div className="text-center">
              <div className="text-5xl mb-3">🥈</div>
              <div className="bg-gradient-to-r from-gray-500/20 to-gray-600/20 rounded-lg p-4 border border-gray-500/30">
                <p className="font-bold text-gray-300">Bitcoin Maxi</p>
                <p className="text-2xl font-bold text-white my-2">250,000 sats</p>
                <p className="text-xs text-gray-400">0.0025 BTC contributed</p>
                <div className="mt-2 flex justify-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gray-400 fill-gray-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Bronze */}
            <div className="text-center">
              <div className="text-5xl mb-3">🥉</div>
              <div className="bg-gradient-to-r from-orange-600/20 to-orange-700/20 rounded-lg p-4 border border-orange-600/30">
                <p className="font-bold text-orange-400">Freedom Fighter</p>
                <p className="text-2xl font-bold text-white my-2">100,000 sats</p>
                <p className="text-xs text-gray-400">0.001 BTC contributed</p>
                <div className="mt-2 flex justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-orange-400 fill-orange-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Donations Ticker */}
          <div className="mt-8 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-400 mb-3 text-center">Recent Stack Activity</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Anon just zapped</span>
                <span className="text-orange-400 font-bold">⚡ 21,000 sats</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Satoshi Lite sent</span>
                <span className="text-orange-400 font-bold">₿ 0.001 BTC</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Pleb stacked</span>
                <span className="text-orange-400 font-bold">⚡ 5,000 sats</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Motivational Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-orange-500/10 border border-purple-500/30 rounded-full px-6 py-3 mb-4">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            <span className="text-purple-300">
              Every sat stacked is a vote for freedom
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            100% of donations go to development and the wholecoiner dream. No VCs, no corporate BS.
          </p>
          <p className="text-orange-400 text-sm mt-2 font-semibold">
            Together we're building the future of social media. LFG! 🚀
          </p>
        </div>
      </div>

      {/* Confetti Effect (optional) */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Add confetti animation here */}
        </div>
      )}
    </div>
  )
}