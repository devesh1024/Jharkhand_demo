"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ItineraryPlanner } from "@/components/itinerary-planner"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function ItineraryPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <ItineraryPlanner />
      </main>
      <Footer />
      <FloatingChatbot />
      <ScrollToTop />
    </div>
  )
}
