"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Heart, MessageCircle, ShoppingBag, Camera } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Itinerary Planner",
      description: "Create personalized travel plans based on your budget, interests, and duration.",
      color: "text-primary",
    },
    {
      icon: MapPin,
      title: "Interactive Map",
      description: "Explore destinations with our interactive map featuring detailed location information.",
      color: "text-secondary",
    },
    {
      icon: Heart,
      title: "Curated Recommendations",
      description: "Discover hidden gems and popular attractions with our expert recommendations.",
      color: "text-primary",
    },
    {
      icon: MessageCircle,
      title: "AI Travel Assistant",
      description: "Get instant answers to your travel questions with our intelligent chatbot.",
      color: "text-secondary",
    },
    {
      icon: ShoppingBag,
      title: "Local Marketplace",
      description: "Shop authentic tribal handicrafts and book eco-tourism packages.",
      color: "text-primary",
    },
    {
      icon: Camera,
      title: "Cultural Experiences",
      description: "Immerse yourself in rich tribal heritage and traditional festivals.",
      color: "text-secondary",
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-4 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Everything You Need for the Perfect Trip
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            From planning to exploring, we provide all the tools and information you need to discover the wonders of
            Jharkhand.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-pretty">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
