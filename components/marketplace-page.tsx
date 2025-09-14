"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag, Star, Heart, Search, IndianRupee, Truck, Shield } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: "handicrafts" | "packages"
  description: string
  seller: string
  inStock: boolean
  featured: boolean
  tags: string[]
}

export function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState("featured")
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<number[]>([])

  const products: Product[] = [
    {
      id: 1,
      name: "Traditional Bamboo Basket Set",
      price: 1200,
      originalPrice: 1500,
      image: "/traditional-jharkhand-tribal-handicrafts-bamboo-an.jpg",
      rating: 4.8,
      reviews: 45,
      category: "handicrafts",
      description: "Handwoven bamboo baskets by tribal artisans. Perfect for home decor and storage.",
      seller: "Tribal Craft Collective",
      inStock: true,
      featured: true,
      tags: ["bamboo", "handwoven", "eco-friendly", "storage"],
    },
    {
      id: 2,
      name: "Betla Wildlife Safari Package",
      price: 8500,
      image: "/betla-national-park-with-elephants-and-dense-fores.jpg",
      rating: 4.9,
      reviews: 128,
      category: "packages",
      description: "2-day wildlife safari with accommodation, meals, and guided tours.",
      seller: "Jharkhand Eco Tours",
      inStock: true,
      featured: true,
      tags: ["wildlife", "safari", "accommodation", "guided"],
    },
    {
      id: 3,
      name: "Tribal Art Painting Collection",
      price: 2500,
      originalPrice: 3000,
      image: "/placeholder.svg?key=tribal-art",
      rating: 4.7,
      reviews: 32,
      category: "handicrafts",
      description: "Authentic Paitkar paintings depicting tribal life and mythology.",
      seller: "Santhal Art Studio",
      inStock: true,
      featured: false,
      tags: ["painting", "tribal", "authentic", "mythology"],
    },
    {
      id: 4,
      name: "Netarhat Hill Station Retreat",
      price: 12000,
      image: "/netarhat-hill-station-sunrise-view-over-rolling-hi.jpg",
      rating: 4.6,
      reviews: 89,
      category: "packages",
      description: "3-day hill station package with sunrise tours and nature walks.",
      seller: "Mountain View Resorts",
      inStock: true,
      featured: true,
      tags: ["hill station", "sunrise", "nature", "retreat"],
    },
    {
      id: 5,
      name: "Handwoven Tribal Textiles",
      price: 1800,
      image: "/placeholder.svg?key=textiles",
      rating: 4.5,
      reviews: 67,
      category: "handicrafts",
      description: "Traditional handwoven fabrics with authentic tribal patterns.",
      seller: "Weaver's Guild",
      inStock: false,
      featured: false,
      tags: ["textiles", "handwoven", "traditional", "patterns"],
    },
    {
      id: 6,
      name: "Waterfall Photography Tour",
      price: 5500,
      image: "/hundru-falls-waterfall-cascading-down-rocky-cliffs.jpg",
      rating: 4.8,
      reviews: 156,
      category: "packages",
      description: "Professional photography tour covering major waterfalls with expert guidance.",
      seller: "Jharkhand Photo Tours",
      inStock: true,
      featured: false,
      tags: ["photography", "waterfalls", "professional", "guided"],
    },
    {
      id: 7,
      name: "Tribal Jewelry Set",
      price: 3200,
      originalPrice: 4000,
      image: "/placeholder.svg?key=jewelry",
      rating: 4.9,
      reviews: 78,
      category: "handicrafts",
      description: "Authentic tribal jewelry made with traditional techniques and materials.",
      seller: "Heritage Jewelers",
      inStock: true,
      featured: true,
      tags: ["jewelry", "traditional", "authentic", "handmade"],
    },
    {
      id: 8,
      name: "Cultural Heritage Tour",
      price: 7500,
      image: "/tribal-festival-celebration-with-traditional-dance.jpg",
      rating: 4.7,
      reviews: 94,
      category: "packages",
      description: "Immersive cultural experience with tribal villages and festivals.",
      seller: "Cultural Connect Tours",
      inStock: true,
      featured: false,
      tags: ["culture", "heritage", "villages", "festivals"],
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return b.featured ? 1 : -1
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const addToCart = (id: number) => {
    setCart((prev) => [...prev, id])
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
            Local Marketplace
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover authentic tribal handicrafts and book eco-tourism packages directly from local artisans and tour
            operators.
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
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="handicrafts">Handicrafts</SelectItem>
                    <SelectItem value="packages">Tour Packages</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Authentic Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-primary" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-primary" />
              <span>Support Local Artisans</span>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
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
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product.featured && <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>}
                      <Badge variant="secondary" className="bg-white/90 text-black">
                        {product.category === "handicrafts" ? "Handicraft" : "Tour Package"}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className="bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favorites.includes(product.id) ? "text-red-500 fill-current" : "text-gray-600"
                          }`}
                        />
                      </button>
                    </div>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 flex-1 line-clamp-2">{product.description}</p>
                    <p className="text-xs text-muted-foreground mb-3">by {product.seller}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.tags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-primary font-bold">
                          <IndianRupee className="w-4 h-4" />
                          <span>{product.price.toLocaleString()}</span>
                        </div>
                        {product.originalPrice && (
                          <div className="flex items-center space-x-1 text-muted-foreground line-through text-sm">
                            <IndianRupee className="w-3 h-3" />
                            <span>{product.originalPrice.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className="w-full"
                      size="sm"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      {product.category === "handicrafts" ? "Add to Cart" : "Book Now"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-muted-foreground mb-4">No products found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <motion.div
            className="fixed bottom-4 right-4 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="font-medium">{cart.length} items in cart</span>
                  <Button variant="secondary" size="sm">
                    View Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
