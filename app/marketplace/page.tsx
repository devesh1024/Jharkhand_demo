"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MarketplacePage } from "@/components/marketplace-page"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Marketplace() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <MarketplacePage />
      </main>
      <Footer />
      <FloatingChatbot />
      <ScrollToTop />
    </div>
  )
}
