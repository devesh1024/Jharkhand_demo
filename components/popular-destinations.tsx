"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export function PopularDestinations() {
  const destinations = [
    {
      id: 1,
      name: "Hundru Falls",
      location: "Ranchi",
      image: "/hundru-falls-waterfall-cascading-down-rocky-cliffs.jpg",
      rating: 4.8,
      duration: "Half Day",
      category: "Waterfalls",
      description: "A spectacular 98-meter waterfall formed by the Subarnarekha River, perfect for nature lovers.",
    },
    {
      id: 2,
      name: "Betla National Park",
      location: "Latehar",
      image: "/betla-national-park-with-elephants-and-dense-fores.jpg",
      rating: 4.7,
      duration: "Full Day",
      category: "Wildlife",
      description: "Home to tigers, elephants, and diverse wildlife in the heart of Jharkhand's forests.",
    },
    {
      id: 3,
      name: "Baidyanath Temple",
      location: "Deoghar",
      image: "/baidyanath-temple-ancient-hindu-temple-with-devote.jpg",
      rating: 4.9,
      duration: "Half Day",
      category: "Heritage",
      description: "One of the twelve Jyotirlingas, a sacred pilgrimage site for millions of devotees.",
    },
    {
      id: 4,
      name: "Netarhat Hill Station",
      location: "Latehar",
      image: "/netarhat-hill-station-sunrise-view-over-rolling-hi.jpg",
      rating: 4.6,
      duration: "2 Days",
      category: "Hill Station",
      description: "Known as the 'Queen of Chotanagpur', famous for its mesmerizing sunrise and sunset views.",
    },
    {
      id: 5,
      name: "Jonha Falls",
      location: "Ranchi",
      image: "/jonha-falls-waterfall-with-temple-and-pilgrims.jpg",
      rating: 4.5,
      duration: "Half Day",
      category: "Waterfalls",
      description: "A sacred waterfall with a temple at the bottom, combining natural beauty with spirituality.",
    },
    {
      id: 6,
      name: "Tribal Museum",
      location: "Ranchi",
      image: "/tribal-museum-showcasing-jharkhand-tribal-artifact.jpg",
      rating: 4.4,
      duration: "2-3 Hours",
      category: "Culture",
      description: "Explore the rich tribal heritage and traditional art forms of Jharkhand's indigenous communities.",
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-4 text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Popular Destinations
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover the most loved attractions that showcase the natural beauty and cultural richness of Jharkhand.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      {destination.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-black">{destination.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{destination.location}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span className="text-sm">{destination.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{destination.name}</h3>
                  <p className="text-muted-foreground mb-4 text-pretty">{destination.description}</p>
                  <Button asChild className="w-full">
                    <Link href="/recommendations">View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline">
            <Link href="/recommendations">View All Destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
