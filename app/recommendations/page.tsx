"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { RecommendationsPage } from "@/components/recommendations-page"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Recommendations() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <RecommendationsPage />
      </main>
      <Footer />
      <FloatingChatbot />
      <ScrollToTop />
    </div>
  )
}
