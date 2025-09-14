"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, MessageCircle, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroImages = [
    {
      url: "/hundru-falls-waterfall-in-jharkhand-with-lush-gree.jpg",
      title: "Discover Majestic Waterfalls",
      subtitle: "Experience the thundering beauty of Hundru Falls",
    },
    {
      url: "/tribal-dancers-in-traditional-jharkhand-costume-pe.jpg",
      title: "Rich Tribal Heritage",
      subtitle: "Immerse yourself in authentic cultural experiences",
    },
    {
      url: "/betla-national-park-wildlife-sanctuary-with-elepha.jpg",
      title: "Wildlife Adventures",
      subtitle: "Explore pristine national parks and wildlife sanctuaries",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${image.url})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover the Heart of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
            Jharkhand
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-200 text-pretty"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroImages[currentSlide].subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/itinerary" className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Plan Your Trip</span>
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black bg-transparent"
          >
            <Link href="/recommendations" className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Explore Attractions</span>
            </Link>
          </Button>

          <Button asChild size="lg" variant="secondary">
            <Link href="/chatbot" className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Chat with Us</span>
            </Link>
          </Button>
        </motion.div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  )
}
