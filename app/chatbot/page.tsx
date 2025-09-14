"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChatbotInterface } from "@/components/chatbot-interface"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function ChatbotPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <ChatbotInterface />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
