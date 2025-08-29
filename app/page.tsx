"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AccordionItem } from "@/components/ui/accordion"
import { BTCPayDonationSection } from "@/components/btcpay-donation"
import { 
  Download, 
  Zap, 
  Key, 
  Image, 
  Shield, 
  Github, 
  Heart,
  ArrowRight,
  Check,
  X,
  Sparkles,
  Globe,
  Lock,
  Smartphone,
  Cloud,
  Users,
  ChevronRight,
  Play
} from "lucide-react"
import { useState } from "react"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'posts' | 'stories' | 'reels'>('posts')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section with Animation */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-300">Free & Open Source</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6 animate-gradient">
            gramstr
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-8">
            Bridge Your Instagram to Nostr
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Download your entire Instagram history and share it with the decentralized world. 
            Own your content, own your audience, own your future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="https://github.com/gtdrag/gramstr/releases/latest" className="group">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
                <Download className="mr-2 h-5 w-5" />
                Download for Mac
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="https://github.com/gtdrag/gramstr/releases/latest">
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-6 text-lg">
                <Download className="mr-2 h-5 w-5" />
                Download for Windows
              </Button>
            </a>
          </div>
          
          <p className="text-sm text-gray-500">
            Coming soon to Linux • View on{" "}
            <a href="https://github.com/gtdrag/gramstr" className="text-purple-400 hover:text-purple-300">
              GitHub
            </a>
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          How It Works
        </h2>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-8 border border-purple-500/30 hover:border-purple-500/50 transition-colors">
                <div className="text-4xl font-bold text-purple-400 mb-4">1</div>
                <h3 className="text-xl font-semibold text-white mb-3">Connect Instagram</h3>
                <p className="text-gray-400">
                  Paste any Instagram URL - posts, stories, reels, or entire profiles
                </p>
              </div>
              <ArrowRight className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-8 w-8" />
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-8 border border-purple-500/30 hover:border-purple-500/50 transition-colors">
                <div className="text-4xl font-bold text-purple-400 mb-4">2</div>
                <h3 className="text-xl font-semibold text-white mb-3">Download Content</h3>
                <p className="text-gray-400">
                  Gramstr fetches all media, captions, and metadata to your local storage
                </p>
              </div>
              <ArrowRight className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-8 w-8" />
            </div>
            
            <div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-8 border border-purple-500/30 hover:border-purple-500/50 transition-colors">
                <div className="text-4xl font-bold text-purple-400 mb-4">3</div>
                <h3 className="text-xl font-semibold text-white mb-3">Post to Nostr</h3>
                <p className="text-gray-400">
                  One-click publish to the decentralized web with your Nostr key
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo/Screenshot Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          See It In Action
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl p-2 border border-gray-700">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-500 ml-4">gramstr.app</span>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex gap-4 p-4 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('posts')}
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  activeTab === 'posts' 
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                Posts
              </button>
              <button
                onClick={() => setActiveTab('stories')}
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  activeTab === 'stories' 
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                Stories
              </button>
              <button
                onClick={() => setActiveTab('reels')}
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  activeTab === 'reels' 
                    ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                Reels
              </button>
            </div>
            
            {/* Demo Content */}
            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg overflow-hidden">
                      <div className="w-full h-full flex items-center justify-center">
                        {activeTab === 'reels' && (
                          <Play className="h-12 w-12 text-white/50" />
                        )}
                        {activeTab === 'stories' && (
                          <div className="text-white/30 text-sm">24h</div>
                        )}
                        {activeTab === 'posts' && (
                          <Image className="h-12 w-12 text-white/30" />
                        )}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        <Zap className="h-4 w-4 mr-1" />
                        Post to Nostr
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Why Gramstr?
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-6 text-gray-400 font-medium">Feature</th>
                  <th className="text-center p-6 text-purple-400 font-semibold">Gramstr</th>
                  <th className="text-center p-6 text-gray-400 font-medium">Manual Export</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="p-6 text-gray-300">Bulk Download</td>
                  <td className="text-center p-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="p-6 text-gray-300">Stories Support</td>
                  <td className="text-center p-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="p-6 text-gray-300">Metadata Preserved</td>
                  <td className="text-center p-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="p-6 text-gray-300">Direct to Nostr</td>
                  <td className="text-center p-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="p-6 text-gray-300">Gallery Management</td>
                  <td className="text-center p-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <X className="h-5 w-5 text-red-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-6 text-gray-300">Time to Export 1000 Posts</td>
                  <td className="text-center p-6 text-purple-400 font-semibold">~5 minutes</td>
                  <td className="text-center p-6 text-gray-400">Hours/Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Features Section Enhanced */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Everything You Need to Own Your Content
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="bg-gray-800/50 border-gray-700 p-6 hover:border-purple-500/50 transition-all hover:transform hover:-translate-y-1">
            <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Download className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Bulk Import</h3>
            <p className="text-gray-400 text-sm">
              Download your entire Instagram history. Multiple URLs at once. Stories, Posts, Reels.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6 hover:border-purple-500/50 transition-all hover:transform hover:-translate-y-1">
            <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">One-Click to Nostr</h3>
            <p className="text-gray-400 text-sm">
              Post directly from your library. Keep your captions and metadata. Reach the decentralized web.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6 hover:border-purple-500/50 transition-all hover:transform hover:-translate-y-1">
            <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Key className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Your Keys, Your Content</h3>
            <p className="text-gray-400 text-sm">
              Encrypted local storage. Never shared with servers. Full ownership.
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 p-6 hover:border-purple-500/50 transition-all hover:transform hover:-translate-y-1">
            <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Image className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Beautiful Gallery</h3>
            <p className="text-gray-400 text-sm">
              Manage all your content. Search and filter. Dark mode default.
            </p>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <AccordionItem title="What is Nostr?">
            <p>
              Nostr is a decentralized social protocol that gives you true ownership of your content and audience. 
              Unlike traditional platforms, no single company controls Nostr - your content lives across multiple 
              servers and can never be censored or deleted.
            </p>
          </AccordionItem>
          
          <AccordionItem title="Is my Instagram password required?">
            <p>
              No! Gramstr never asks for your Instagram password. For public content, just paste the URL. 
              For private content and stories, you can optionally export your browser cookies - but your 
              password stays safe.
            </p>
          </AccordionItem>
          
          <AccordionItem title="Where is my content stored?">
            <p>
              All content is stored locally on your device. When you post to Nostr, content is uploaded 
              to decentralized storage that you control. Gramstr never stores your content on our servers 
              because we don't have servers!
            </p>
          </AccordionItem>
          
          <AccordionItem title="Can I download someone else's Instagram?">
            <p>
              Yes, you can download any public Instagram content. This is perfect for archiving favorite 
              creators, saving inspiration, or backing up content you care about.
            </p>
          </AccordionItem>
          
          <AccordionItem title="What platforms are supported?">
            <p>
              Currently available for macOS and Windows, with Linux support coming soon. The app runs 
              completely offline once installed - no internet required except for downloading and posting.
            </p>
          </AccordionItem>
          
          <AccordionItem title="Is this legal?">
            <p>
              Yes! You have the right to download publicly available content and your own content. 
              Gramstr simply automates what you could do manually. Always respect copyright and 
              creator rights when sharing content.
            </p>
          </AccordionItem>
        </div>
      </div>

      {/* Donation Section */}
      <BTCPayDonationSection />

      {/* Trust Section Enhanced */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Built on Trust & Transparency
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group">
              <div className="bg-purple-500/10 rounded-lg p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all">
                <Shield className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Zero Data Collection</h3>
                <p className="text-gray-400 text-sm">
                  No analytics, no tracking, no servers. Your data never leaves your device.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-purple-500/10 rounded-lg p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all">
                <Github className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">100% Open Source</h3>
                <p className="text-gray-400 text-sm">
                  Every line of code is public. Audit, modify, or fork as you wish.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-purple-500/10 rounded-lg p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all">
                <Heart className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h3 className="font-semibold text-white mb-2">Community First</h3>
                <p className="text-gray-400 text-sm">
                  Built by the community, for the community. Forever free.
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 p-8">
            <h3 className="text-xl font-semibold text-white mb-3">
              Our Mission
            </h3>
            <p className="text-gray-300 mb-6">
              We believe in a future where you own your digital identity, your content, and your audience. 
              Gramstr is our contribution to making that future a reality - one post at a time.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span>Support development:</span>
              <a href="#" className="text-purple-400 hover:text-purple-300">
                ⚡ Lightning Tips
              </a>
            </div>
          </Card>
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Take Back Control of Your Content
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands who've already bridged to the decentralized web
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="https://github.com/gtdrag/gramstr/releases/latest">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 text-lg shadow-xl">
                <Download className="mr-2 h-5 w-5" />
                Download Gramstr Free
              </Button>
            </a>
            <a href="https://github.com/gtdrag/gramstr">
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-6 text-lg">
                <Github className="mr-2 h-5 w-5" />
                Star on GitHub
              </Button>
            </a>
          </div>
          <p className="text-gray-400">
            Built with 💜 for the Nostr community
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}