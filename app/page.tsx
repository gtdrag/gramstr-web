"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { OpenNodeDonationSection } from "@/components/opennode-donation"
import { 
  Download, 
  Zap, 
  Image, 
  Github, 
  Heart,
  ArrowRight,
  Sparkles,
  Users,
  Code,
  Coffee,
  Twitter,
  Instagram
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Simple animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      {/* Simple Hero */}
      <div className="container mx-auto px-4 py-20 relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-300">Free & Open Source</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            gramstr
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            A simple desktop app to download your Instagram content and share it on Nostr.
            Built by one developer trying to help people own their content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
              onClick={() => window.open('https://github.com/yourusername/gramstr/releases', '_blank')}
            >
              <Download className="mr-2 h-5 w-5" />
              Download for Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg"
              onClick={() => window.open('https://github.com/yourusername/gramstr', '_blank')}
            >
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Available for macOS, Windows, and Linux
          </p>
        </div>
      </div>

      {/* What it does - Simple */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Gramstr Does
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <Download className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Download</h3>
              <p className="text-gray-400 text-sm">
                Save your Instagram posts, stories, and reels to your computer
              </p>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <Image className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Organize</h3>
              <p className="text-gray-400 text-sm">
                Keep your content organized and accessible offline
              </p>
            </Card>
            
            <Card className="bg-gray-800/50 border-gray-700 p-6">
              <Zap className="h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Share on Nostr</h3>
              <p className="text-gray-400 text-sm">
                Post directly to Nostr, the decentralized social protocol
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Personal Message */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30 p-8">
            <div className="flex items-start gap-6">
              {/* Profile Photo */}
              <img 
                src="/profile-photo.jpeg" 
                alt="Developer" 
                className="w-24 h-24 rounded-full border-2 border-purple-400/50 flex-shrink-0 object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1">
                  Hi, I'm George
                </h3>
                <p className="text-purple-400 text-sm mb-2">
                  Class of '21 Bitcoiner
                </p>
                
                {/* Social Links */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gray-400 text-sm">Follow me:</span>
                  <a 
                    href="https://nostr.band/npub1kkr928xpntcl6jeg57jsqgjc4w86j5slkfa0q9qvkypzgdu8jp6q4f958l" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                    title="Nostr"
                  >
                    <Zap className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://x.com/georgetdrag" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                    title="X (Twitter)"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://instagram.com/jagbagdrag" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  I built Gramstr because I believe people should own their content. 
                  Instagram can delete accounts, change algorithms, or disappear tomorrow. 
                  Nostr gives us a chance at something better - a social network no one controls.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  This app is completely free and open source. No ads, no tracking, no BS. 
                  If you find it useful and want to support development, consider sending some sats. 
                  Every bit helps me dedicate more time to making tools for the Nostr ecosystem.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  My personal goal is to stack enough sats to become a wholecoiner. 
                  It's a long journey, but every donation gets me a little closer while 
                  funding more open source tools for everyone.
                </p>
                <p className="text-gray-400 text-sm italic">
                  Together, we're building a more open internet. Thank you for being part of it.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Donation Section */}
      <OpenNodeDonationSection />

      {/* Simple Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-800">
        <div className="text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <a 
              href="https://github.com/yourusername/gramstr" 
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://nostr.band/npub..." 
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Zap className="h-6 w-6" />
            </a>
          </div>
          <p className="text-gray-500 text-sm mb-2">
            Built with 💜 for the Nostr community
          </p>
          <p className="text-gray-600 text-xs">
            Not affiliated with Instagram or Meta
          </p>
        </div>
      </footer>

      {/* CSS for animations */}
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
      `}</style>
    </div>
  )
}