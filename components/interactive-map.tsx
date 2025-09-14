"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, IndianRupee, Navigation, Layers, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface MapDestination {
  id: number
  name: string
  location: string
  coordinates: { x: number; y: number }
  image: string
  rating: number
  duration: string
  cost: number
  category: string
  description: string
  highlights: string[]
}

export function InteractiveMap() {
  const [selectedDestination, setSelectedDestination] = useState<MapDestination | null>(null)
  const [hoveredDestination, setHoveredDestination] = useState<number | null>(null)
  const [mapView, setMapView] = useState<"satellite" | "terrain">("terrain")

  const destinations: MapDestination[] = [
    {
      id: 1,
      name: "Hundru Falls",
      location: "Ranchi",
      coordinates: { x: 45, y: 60 },
      image: "/hundru-falls-waterfall-cascading-down-rocky-cliffs.jpg",
      rating: 4.8,
      duration: "Half Day",
      cost: 1500,
      category: "Waterfalls",
      description: "A spectacular 98-meter waterfall formed by the Subarnarekha River.",
      highlights: ["98m waterfall", "Photography", "Nature walks"],
    },
    {
      id: 2,
      name: "Betla National Park",
      location: "Latehar",
      coordinates: { x: 25, y: 75 },
      image: "/betla-national-park-with-elephants-and-dense-fores.jpg",
      rating: 4.7,
      duration: "Full Day",
      cost: 4000,
      category: "National Parks",
      description: "Home to tigers, elephants, and diverse wildlife.",
      highlights: ["Tiger safari", "Elephant spotting", "Bird watching"],
    },
    {
      id: 3,
      name: "Baidyanath Temple",
      location: "Deoghar",
      coordinates: { x: 70, y: 30 },
      image: "/baidyanath-temple-ancient-hindu-temple-with-devote.jpg",
      rating: 4.9,
      duration: "Half Day",
      cost: 1000,
      category: "Heritage Sites",
      description: "One of the twelve Jyotirlingas, a sacred pilgrimage site.",
      highlights: ["Jyotirlinga", "Ancient architecture", "Spiritual experience"],
    },
    {
      id: 4,
      name: "Netarhat Hill Station",
      location: "Latehar",
      coordinates: { x: 20, y: 85 },
      image: "/netarhat-hill-station-sunrise-view-over-rolling-hi.jpg",
      rating: 4.6,
      duration: "2 Days",
      cost: 6000,
      category: "Hill Stations",
      description: "Known as the 'Queen of Chotanagpur'.",
      highlights: ["Sunrise views", "Sunset point", "Cool climate"],
    },
    {
      id: 5,
      name: "Jonha Falls",
      location: "Ranchi",
      coordinates: { x: 50, y: 55 },
      image: "/jonha-falls-waterfall-with-temple-and-pilgrims.jpg",
      rating: 4.5,
      duration: "Half Day",
      cost: 1200,
      category: "Waterfalls",
      description: "A sacred waterfall with a temple at the bottom.",
      highlights: ["Sacred temple", "Natural pool", "Spiritual significance"],
    },
    {
      id: 6,
      name: "Tribal Museum",
      location: "Ranchi",
      coordinates: { x: 48, y: 58 },
      image: "/tribal-museum-showcasing-jharkhand-tribal-artifact.jpg",
      rating: 4.4,
      duration: "2-3 Hours",
      cost: 800,
      category: "Heritage Sites",
      description: "Explore the rich tribal heritage and traditional art forms.",
      highlights: ["Tribal artifacts", "Cultural exhibits", "Traditional crafts"],
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Waterfalls":
        return "#3b82f6"
      case "National Parks":
        return "#10b981"
      case "Heritage Sites":
        return "#f59e0b"
      case "Hill Stations":
        return "#8b5cf6"
      default:
        return "#6b7280"
    }
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
            Interactive Map of Jharkhand
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore destinations across Jharkhand. Click on markers to discover detailed information about each
            location.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Jharkhand Tourism Map</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={mapView === "terrain" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMapView("terrain")}
                    >
                      <Layers className="w-4 h-4 mr-1" />
                      Terrain
                    </Button>
                    <Button
                      variant={mapView === "satellite" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setMapView("satellite")}
                    >
                      <Navigation className="w-4 h-4 mr-1" />
                      Satellite
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full h-96 lg:h-[600px] overflow-hidden">
                  {/* Map Background */}
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    style={{
                      background:
                        mapView === "terrain"
                          ? "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)"
                          : "linear-gradient(135deg, #374151 0%, #1f2937 50%, #111827 100%)",
                    }}
                  >
                    {/* Terrain Features */}
                    {mapView === "terrain" && (
                      <>
                        {/* Rivers */}
                        <path
                          d="M10,20 Q30,25 50,30 T90,40"
                          stroke="#3b82f6"
                          strokeWidth="0.5"
                          fill="none"
                          opacity="0.7"
                        />
                        <path
                          d="M5,60 Q25,65 45,70 T85,80"
                          stroke="#3b82f6"
                          strokeWidth="0.3"
                          fill="none"
                          opacity="0.7"
                        />

                        {/* Forest Areas */}
                        <circle cx="25" cy="75" r="8" fill="#065f46" opacity="0.6" />
                        <circle cx="20" cy="85" r="6" fill="#065f46" opacity="0.6" />
                        <circle cx="30" cy="80" r="7" fill="#065f46" opacity="0.6" />

                        {/* Hills */}
                        <ellipse cx="70" cy="30" rx="12" ry="8" fill="#047857" opacity="0.8" />
                        <ellipse cx="80" cy="25" rx="8" ry="6" fill="#047857" opacity="0.8" />
                      </>
                    )}

                    {/* Destination Markers */}
                    {destinations.map((destination) => (
                      <g key={destination.id}>
                        {/* Marker Pulse Animation */}
                        <motion.circle
                          cx={destination.coordinates.x}
                          cy={destination.coordinates.y}
                          r="3"
                          fill={getCategoryColor(destination.category)}
                          opacity="0.3"
                          animate={{
                            r: hoveredDestination === destination.id ? [3, 6, 3] : 3,
                            opacity: hoveredDestination === destination.id ? [0.3, 0.1, 0.3] : 0.3,
                          }}
                          transition={{
                            duration: 2,
                            repeat: hoveredDestination === destination.id ? Number.POSITIVE_INFINITY : 0,
                          }}
                        />

                        {/* Main Marker */}
                        <motion.circle
                          cx={destination.coordinates.x}
                          cy={destination.coordinates.y}
                          r="2"
                          fill={getCategoryColor(destination.category)}
                          stroke="white"
                          strokeWidth="0.5"
                          className="cursor-pointer"
                          whileHover={{ scale: 1.5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedDestination(destination)}
                          onMouseEnter={() => setHoveredDestination(destination.id)}
                          onMouseLeave={() => setHoveredDestination(null)}
                        />

                        {/* Marker Label */}
                        <AnimatePresence>
                          {hoveredDestination === destination.id && (
                            <motion.g
                              initial={{ opacity: 0, y: 2 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 2 }}
                            >
                              <rect
                                x={destination.coordinates.x - 6}
                                y={destination.coordinates.y - 8}
                                width="12"
                                height="3"
                                fill="rgba(0,0,0,0.8)"
                                rx="1"
                              />
                              <text
                                x={destination.coordinates.x}
                                y={destination.coordinates.y - 6}
                                textAnchor="middle"
                                fill="white"
                                fontSize="1.5"
                                fontWeight="bold"
                              >
                                {destination.name}
                              </text>
                            </motion.g>
                          )}
                        </AnimatePresence>
                      </g>
                    ))}
                  </svg>

                  {/* Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
                    <h4 className="font-semibold text-sm text-gray-800">Legend</h4>
                    <div className="space-y-1">
                      {["Waterfalls", "National Parks", "Heritage Sites", "Hill Stations"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getCategoryColor(category) }}
                          />
                          <span className="text-xs text-gray-700">{category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Destination Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Selected Destination */}
            <AnimatePresence mode="wait">
              {selectedDestination ? (
                <motion.div
                  key={selectedDestination.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <div className="relative overflow-hidden">
                      <img
                        src={selectedDestination.image || "/placeholder.svg"}
                        alt={selectedDestination.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge
                          style={{ backgroundColor: getCategoryColor(selectedDestination.category) }}
                          className="text-white"
                        >
                          {selectedDestination.category}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-black">{selectedDestination.rating}</span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{selectedDestination.location}</span>
                        <Clock className="w-4 h-4 ml-2" />
                        <span className="text-sm">{selectedDestination.duration}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{selectedDestination.name}</h3>
                      <p className="text-muted-foreground mb-4 text-pretty">{selectedDestination.description}</p>

                      {/* Highlights */}
                      <div className="mb-4">
                        <h4 className="font-medium text-foreground mb-2">Highlights</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedDestination.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1 text-primary font-semibold">
                          <IndianRupee className="w-4 h-4" />
                          <span>{selectedDestination.cost}</span>
                        </div>
                      </div>

                      <Button className="w-full">Get Directions</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Select a Destination</h3>
                      <p className="text-muted-foreground text-pretty">
                        Click on any marker on the map to view detailed information about that destination.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{destinations.length}</div>
                    <div className="text-sm text-muted-foreground">Destinations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">4</div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Waterfalls</span>
                    <span>{destinations.filter((d) => d.category === "Waterfalls").length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>National Parks</span>
                    <span>{destinations.filter((d) => d.category === "National Parks").length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Heritage Sites</span>
                    <span>{destinations.filter((d) => d.category === "Heritage Sites").length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Hill Stations</span>
                    <span>{destinations.filter((d) => d.category === "Hill Stations").length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
