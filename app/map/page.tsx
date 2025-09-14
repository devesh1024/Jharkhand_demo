"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { InteractiveMap } from "@/components/interactive-map"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function MapPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <InteractiveMap />
      </main>
      <Footer />
      <FloatingChatbot />
      <ScrollToTop />
    </div>
  )
}
