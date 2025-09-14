"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { PopularDestinations } from "@/components/popular-destinations"
import { CulturalHighlights } from "@/components/cultural-highlights"
import { FloatingChatbot } from "@/components/floating-chatbot"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PopularDestinations />
        <CulturalHighlights />
      </main>
      <Footer />
      <FloatingChatbot />
      <ScrollToTop />
    </div>
  )
}
