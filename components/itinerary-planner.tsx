"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, IndianRupee, MapPin, Clock, Star, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ItineraryFormData {
  budget: string
  duration: string
  people: string
  interests: string[]
}

interface ItineraryItem {
  id: number
  day: number
  title: string
  location: string
  description: string
  image: string
  duration: string
  cost: number
  rating: number
  category: string
}

export function ItineraryPlanner() {
  const [formData, setFormData] = useState<ItineraryFormData>({
    budget: "",
    duration: "",
    people: "",
    interests: [],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([])

  const interestOptions = [
    { id: "nature", label: "Nature & Waterfalls" },
    { id: "culture", label: "Culture & Heritage" },
    { id: "adventure", label: "Adventure Sports" },
    { id: "wildlife", label: "Wildlife & Safari" },
    { id: "spiritual", label: "Spiritual Sites" },
    { id: "photography", label: "Photography" },
  ]

  const mockItineraries: Record<string, ItineraryItem[]> = {
    nature: [
      {
        id: 1,
        day: 1,
        title: "Hundru Falls Adventure",
        location: "Ranchi",
        description: "Visit the spectacular 98-meter waterfall and enjoy nature photography.",
        image: "/hundru-falls-waterfall-cascading-down-rocky-cliffs.jpg",
        duration: "4-5 hours",
        cost: 1500,
        rating: 4.8,
        category: "Nature",
      },
      {
        id: 2,
        day: 2,
        title: "Jonha Falls & Temple Visit",
        location: "Ranchi",
        description: "Sacred waterfall with temple at the bottom, perfect for spiritual experience.",
        image: "/jonha-falls-waterfall-with-temple-and-pilgrims.jpg",
        duration: "3-4 hours",
        cost: 1200,
        rating: 4.6,
        category: "Nature",
      },
    ],
    culture: [
      {
        id: 3,
        day: 1,
        title: "Tribal Museum Experience",
        location: "Ranchi",
        description: "Explore rich tribal heritage and traditional art forms.",
        image: "/tribal-museum-showcasing-jharkhand-tribal-artifact.jpg",
        duration: "2-3 hours",
        cost: 800,
        rating: 4.4,
        category: "Culture",
      },
      {
        id: 4,
        day: 2,
        title: "Traditional Festival Experience",
        location: "Local Village",
        description: "Participate in authentic tribal festivals and cultural programs.",
        image: "/tribal-festival-celebration-with-traditional-dance.jpg",
        duration: "Full Day",
        cost: 2500,
        rating: 4.9,
        category: "Culture",
      },
    ],
    adventure: [
      {
        id: 5,
        day: 1,
        title: "Netarhat Hill Station Trek",
        location: "Latehar",
        description: "Sunrise trek to the Queen of Chotanagpur with breathtaking views.",
        image: "/netarhat-hill-station-sunrise-view-over-rolling-hi.jpg",
        duration: "Full Day",
        cost: 3000,
        rating: 4.7,
        category: "Adventure",
      },
    ],
    wildlife: [
      {
        id: 6,
        day: 1,
        title: "Betla National Park Safari",
        location: "Latehar",
        description: "Wildlife safari to spot tigers, elephants, and diverse fauna.",
        image: "/betla-national-park-with-elephants-and-dense-fores.jpg",
        duration: "Full Day",
        cost: 4000,
        rating: 4.8,
        category: "Wildlife",
      },
    ],
    spiritual: [
      {
        id: 7,
        day: 1,
        title: "Baidyanath Temple Pilgrimage",
        location: "Deoghar",
        description: "Visit one of the twelve Jyotirlingas, a sacred pilgrimage site.",
        image: "/baidyanath-temple-ancient-hindu-temple-with-devote.jpg",
        duration: "Half Day",
        cost: 1000,
        rating: 4.9,
        category: "Spiritual",
      },
    ],
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.budget) {
      newErrors.budget = "Budget is required"
    } else if (Number.parseInt(formData.budget) < 1000) {
      newErrors.budget = "Minimum budget should be ₹1,000"
    }

    if (!formData.duration) {
      newErrors.duration = "Duration is required"
    }

    if (!formData.people) {
      newErrors.people = "Number of people is required"
    } else if (Number.parseInt(formData.people) < 1) {
      newErrors.people = "At least 1 person required"
    }

    if (formData.interests.length === 0) {
      newErrors.interests = "Please select at least one interest"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: checked ? [...prev.interests, interestId] : prev.interests.filter((id) => id !== interestId),
    }))
  }

  const generateItinerary = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock itinerary based on interests
    const selectedItinerary: ItineraryItem[] = []
    const days = Number.parseInt(formData.duration)

    formData.interests.forEach((interest) => {
      if (mockItineraries[interest]) {
        selectedItinerary.push(...mockItineraries[interest].slice(0, Math.ceil(days / 2)))
      }
    })

    // Adjust days based on duration
    const finalItinerary = selectedItinerary.slice(0, days).map((item, index) => ({
      ...item,
      day: index + 1,
    }))

    setItinerary(finalItinerary)
    setIsLoading(false)
    setShowResults(true)
  }

  const totalCost = itinerary.reduce((sum, item) => sum + item.cost, 0)

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl font-bold text-foreground mb-4 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Plan Your Perfect Jharkhand Trip
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tell us your preferences and we'll create a personalized itinerary just for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Trip Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Budget */}
                <div className="space-y-2">
                  <Label htmlFor="budget" className="flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4" />
                    <span>Budget (per person)</span>
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 5000"
                    value={formData.budget}
                    onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                    className={errors.budget ? "border-destructive" : ""}
                  />
                  <AnimatePresence>
                    {errors.budget && (
                      <motion.p
                        className="text-sm text-destructive"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.budget}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration" className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration (days)</span>
                  </Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, duration: value }))}
                  >
                    <SelectTrigger className={errors.duration ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Day</SelectItem>
                      <SelectItem value="2">2 Days</SelectItem>
                      <SelectItem value="3">3 Days</SelectItem>
                      <SelectItem value="4">4 Days</SelectItem>
                      <SelectItem value="5">5 Days</SelectItem>
                      <SelectItem value="7">1 Week</SelectItem>
                    </SelectContent>
                  </Select>
                  <AnimatePresence>
                    {errors.duration && (
                      <motion.p
                        className="text-sm text-destructive"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.duration}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Number of People */}
                <div className="space-y-2">
                  <Label htmlFor="people" className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Number of People</span>
                  </Label>
                  <Input
                    id="people"
                    type="number"
                    placeholder="e.g., 2"
                    value={formData.people}
                    onChange={(e) => setFormData((prev) => ({ ...prev, people: e.target.value }))}
                    className={errors.people ? "border-destructive" : ""}
                  />
                  <AnimatePresence>
                    {errors.people && (
                      <motion.p
                        className="text-sm text-destructive"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.people}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Interests */}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Interests</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {interestOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.interests.includes(option.id)}
                          onCheckedChange={(checked) => handleInterestChange(option.id, checked as boolean)}
                        />
                        <Label htmlFor={option.id} className="text-sm cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <AnimatePresence>
                    {errors.interests && (
                      <motion.p
                        className="text-sm text-destructive"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {errors.interests}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <Button onClick={generateItinerary} disabled={isLoading} className="w-full" size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Itinerary...
                    </>
                  ) : (
                    "Generate My Itinerary"
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Your Personalized Itinerary</span>
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                          ₹{totalCost.toLocaleString()}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {itinerary.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden">
                            <div className="flex">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-24 h-24 object-cover"
                              />
                              <div className="flex-1 p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <Badge variant="outline">Day {item.day}</Badge>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm">{item.rating}</span>
                                  </div>
                                </div>
                                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{item.location}</p>
                                <p className="text-sm text-muted-foreground mb-2 text-pretty">{item.description}</p>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">{item.duration}</span>
                                  <span className="font-medium text-primary">₹{item.cost}</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center text-lg font-semibold">
                          <span>Total Estimated Cost:</span>
                          <span className="text-primary">₹{totalCost.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          *Prices are approximate and may vary based on season and availability.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
