"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export function CulturalHighlights() {
  const highlights = [
    {
      title: "Tribal Festivals",
      description: "Experience vibrant celebrations like Sarhul, Karma, and Sohrai festivals.",
      image: "/tribal-festival-celebration-with-traditional-dance.jpg",
      link: "/recommendations?category=culture",
    },
    {
      title: "Traditional Handicrafts",
      description: "Discover authentic tribal art, bamboo crafts, and handwoven textiles.",
      image: "/traditional-jharkhand-tribal-handicrafts-bamboo-an.jpg",
      link: "/marketplace",
    },
    {
      title: "Local Cuisine",
      description: "Savor traditional dishes like Dhuska, Pittha, and tribal delicacies.",
      image: "/traditional-jharkhand-cuisine-dhuska-and-tribal-fo.jpg",
      link: "/recommendations?category=food",
    },
  ]

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-card-foreground mb-4 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Rich Cultural Heritage
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Immerse yourself in the authentic tribal culture and traditions that make Jharkhand truly unique.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-background">
                <div className="relative overflow-hidden">
                  <img
                    src={highlight.image || "/placeholder.svg"}
                    alt={highlight.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground mb-4 text-pretty">{highlight.description}</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href={highlight.link}>Explore More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
