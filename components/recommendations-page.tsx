"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, MapPin, Clock, IndianRupee, Search, Filter, Heart, Share2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Destination {
  id: number
  name: string
  location: string
  image: string
  rating: number
  duration: string
  cost: number
  category: string
  description: string
  highlights: string[]
  bestTime: string
}

export function RecommendationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [budgetRange, setBudgetRange] = useState([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Hundru Falls",
      location: "Ranchi",
      image: "/hundru-falls-waterfall-cascading-down-rocky-cliffs.jpg",
      rating: 4.8,
      duration: "Half Day",
      cost: 1500,
      category: "Waterfalls",
      description:
        "A spectacular 98-meter waterfall formed by the Subarnarekha River, perfect for nature lovers and photographers.",
      highlights: ["98m waterfall", "Photography", "Nature walks", "Picnic spots"],
      bestTime: "Oct-Mar",
    },
    {
      id: 2,
      name: "Betla National Park",
      location: "Latehar",
      image: "/betla-national-park-with-elephants-and-dense-fores.jpg",
      rating: 4.7,
      duration: "Full Day",
      cost: 4000,
      category: "National Parks",
      description: "Home to tigers, elephants, and diverse wildlife in the heart of Jharkhand's forests.",
      highlights: ["Tiger safari", "Elephant spotting", "Bird watching", "Forest trails"],
      bestTime: "Nov-Apr",
    },
    {
      id: 3,
      name: "Baidyanath Temple",
      location: "Deoghar",
      image: "/baidyanath-temple-ancient-hindu-temple-with-devote.jpg",
      rating: 4.9,
      duration: "Half Day",
      cost: 1000,
      category: "Heritage Sites",
      description: "One of the twelve Jyotirlingas, a sacred pilgrimage site for millions of devotees.",
      highlights: ["Jyotirlinga", "Ancient architecture", "Spiritual experience", "Religious festivals"],
      bestTime: "Year-round",
    },
    {
      id: 4,
      name: "Netarhat Hill Station",
      location: "Latehar",
      image: "/netarhat-hill-station-sunrise-view-over-rolling-hi.jpg",
      rating: 4.6,
      duration: "2 Days",
      cost: 6000,
      category: "Hill Stations",
      description: "Known as the 'Queen of Chotanagpur', famous for its mesmerizing sunrise and sunset views.",
      highlights: ["Sunrise views", "Sunset point", "Cool climate", "Trekking trails"],
      bestTime: "Oct-Mar",
    },
    {
      id: 5,
      name: "Jonha Falls",
      location: "Ranchi",
      image: "/jonha-falls-waterfall-with-temple-and-pilgrims.jpg",
      rating: 4.5,
      duration: "Half Day",
      cost: 1200,
      category: "Waterfalls",
      description: "A sacred waterfall with a temple at the bottom, combining natural beauty with spirituality.",
      highlights: ["Sacred temple", "Natural pool", "Spiritual significance", "Rock formations"],
      bestTime: "Oct-Mar",
    },
    {
      id: 6,
      name: "Tribal Museum",
      location: "Ranchi",
      image: "/tribal-museum-showcasing-jharkhand-tribal-artifact.jpg",
      rating: 4.4,
      duration: "2-3 Hours",
      cost: 800,
      category: "Heritage Sites",
      description: "Explore the rich tribal heritage and traditional art forms of Jharkhand's indigenous communities.",
      highlights: ["Tribal artifacts", "Cultural exhibits", "Traditional crafts", "Educational tours"],
      bestTime: "Year-round",
    },
    {
      id: 7,
      name: "Dassam Falls",
      location: "Ranchi",
      image: "/placeholder.svg?key=dassam",
      rating: 4.3,
      duration: "Half Day",
      cost: 1300,
      category: "Waterfalls",
      description: "A beautiful waterfall cascading from a height of 44 meters, surrounded by dense forests.",
      highlights: ["44m cascade", "Forest setting", "Swimming", "Adventure activities"],
      bestTime: "Jul-Feb",
    },
    {
      id: 8,
      name: "Palamau Tiger Reserve",
      location: "Latehar",
      image: "/placeholder.svg?key=palamau",
      rating: 4.5,
      duration: "Full Day",
      cost: 3500,
      category: "National Parks",
      description: "One of India's oldest tiger reserves with rich biodiversity and scenic landscapes.",
      highlights: ["Tiger reserve", "Wildlife safari", "Biodiversity", "Scenic beauty"],
      bestTime: "Nov-Apr",
    },
  ]

  const categories = ["Waterfalls", "National Parks", "Heritage Sites", "Hill Stations"]

  const filteredDestinations = useMemo(() => {
    const filtered = destinations.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesBudget = dest.cost >= budgetRange[0] && dest.cost <= budgetRange[1]

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(dest.category)

      return matchesSearch && matchesBudget && matchesCategory
    })

    // Sort destinations
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "cost-low":
          return a.cost - b.cost
        case "cost-high":
          return b.cost - a.cost
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, budgetRange, selectedCategories, sortBy])

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((c) => c !== category)))
  }

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl font-bold text-foreground mb-4 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover Amazing Destinations
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore the best attractions Jharkhand has to offer, from majestic waterfalls to rich cultural heritage
            sites.
          </motion.p>
        </div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="cost-low">Price: Low to High</SelectItem>
                    <SelectItem value="cost-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* Filter Toggle */}
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full lg:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Filters Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-border"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Budget Range */}
                      <div className="space-y-4">
                        <Label className="flex items-center space-x-2">
                          <IndianRupee className="w-4 h-4" />
                          <span>
                            Budget Range: ₹{budgetRange[0]} - ₹{budgetRange[1]}
                          </span>
                        </Label>
                        <Slider
                          value={budgetRange}
                          onValueChange={setBudgetRange}
                          max={10000}
                          min={0}
                          step={500}
                          className="w-full"
                        />
                      </div>

                      {/* Categories */}
                      <div className="space-y-4">
                        <Label>Categories</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {categories.map((category) => (
                            <div key={category} className="flex items-center space-x-2">
                              <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                              />
                              <Label htmlFor={category} className="text-sm cursor-pointer">
                                {category}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground">
            Showing {filteredDestinations.length} of {destinations.length} destinations
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full">
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
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => toggleFavorite(destination.id)}
                        className="bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favorites.includes(destination.id) ? "text-red-500 fill-current" : "text-gray-600"
                          }`}
                        />
                      </button>
                      <button className="bg-white/90 rounded-full p-2 hover:bg-white transition-colors">
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-black">{destination.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{destination.location}</span>
                      <Clock className="w-4 h-4 ml-2" />
                      <span className="text-sm">{destination.duration}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{destination.name}</h3>
                    <p className="text-muted-foreground mb-4 text-pretty flex-1">{destination.description}</p>

                    {/* Highlights */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 3).map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1 text-primary font-semibold">
                        <IndianRupee className="w-4 h-4" />
                        <span>{destination.cost}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Best: {destination.bestTime}</span>
                    </div>

                    <Button className="w-full">View Details</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-muted-foreground mb-4">No destinations found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setBudgetRange([0, 10000])
                setSelectedCategories([])
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
