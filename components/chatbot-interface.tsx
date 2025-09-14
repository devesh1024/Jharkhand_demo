"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Minimize2, Maximize2, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  typing?: boolean
}

export function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Jharkhand Tourism Assistant. I can help you with information about destinations, travel planning, local culture, and more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickQuestions = [
    "What are the best waterfalls to visit?",
    "Tell me about tribal culture",
    "Best time to visit Jharkhand?",
    "Adventure activities available?",
    "How to reach Betla National Park?",
    "Local food recommendations",
  ]

  const botResponses: Record<string, string> = {
    waterfall:
      "Jharkhand is famous for its stunning waterfalls! The top ones include:\n\n🌊 Hundru Falls (98m) - Most popular, great for photography\n🌊 Jonha Falls - Sacred waterfall with temple\n🌊 Dassam Falls (44m) - Perfect for swimming\n🌊 Hirni Falls - Hidden gem in dense forests\n\nBest time to visit: October to March for full flow!",
    culture:
      "Jharkhand has a rich tribal heritage! 🎭\n\n• Major tribes: Santhal, Munda, Ho, Oraon\n• Festivals: Sarhul (spring), Karma (monsoon), Sohrai (harvest)\n• Art forms: Paitkar paintings, tribal dances\n• Handicrafts: Bamboo work, handwoven textiles\n• Music: Traditional drums and folk songs\n\nVisit our Tribal Museum in Ranchi to learn more!",
    time: "Best time to visit Jharkhand:\n\n🌤️ Winter (Oct-Mar): Perfect weather, clear skies\n🌧️ Monsoon (Jul-Sep): Waterfalls at full glory\n☀️ Summer (Apr-Jun): Hot but good for hill stations\n\nWinter is ideal for most activities and sightseeing!",
    adventure:
      "Adventure activities in Jharkhand:\n\n🏔️ Trekking: Netarhat, Parasnath Hill\n🚣 River rafting: Subarnarekha River\n🧗 Rock climbing: Ranchi hills\n🦌 Wildlife safari: Betla, Palamau\n📸 Photography tours\n🏕️ Camping: Various hill stations\n\nPerfect for adventure enthusiasts!",
    betla:
      "Reaching Betla National Park:\n\n✈️ Nearest Airport: Ranchi (160km)\n🚂 Nearest Railway: Daltonganj (25km)\n🚌 Road: Well connected by NH-75\n\n🎫 Entry: ₹50 Indians, ₹500 foreigners\n⏰ Timings: 6 AM - 6 PM\n🦁 Best for: Tiger safari, elephant spotting\n\nBook safari in advance during peak season!",
    food: "Must-try Jharkhand cuisine:\n\n🍽️ Dhuska - Fried rice pancake\n🍽️ Pittha - Steamed rice cake\n🍽️ Rugra - Mushroom curry\n🍽️ Bamboo shoot curry\n🍽️ Handia - Traditional rice beer\n🍽️ Tribal honey and forest vegetables\n\nTry local dhabas for authentic flavors!",
    default:
      "I'd be happy to help you with that! I can provide information about:\n\n• Tourist destinations and attractions\n• Travel planning and itineraries\n• Local culture and festivals\n• Adventure activities\n• Food and accommodation\n• Transportation options\n\nWhat specific information would you like to know?",
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    if (message.includes("waterfall") || message.includes("falls")) return botResponses.waterfall
    if (message.includes("culture") || message.includes("tribal") || message.includes("festival"))
      return botResponses.culture
    if (message.includes("time") || message.includes("when") || message.includes("season")) return botResponses.time
    if (message.includes("adventure") || message.includes("activity") || message.includes("trekking"))
      return botResponses.adventure
    if (message.includes("betla") || message.includes("national park")) return botResponses.betla
    if (message.includes("food") || message.includes("cuisine") || message.includes("eat")) return botResponses.food
    return botResponses.default
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  const resetChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your Jharkhand Tourism Assistant. I can help you with information about destinations, travel planning, local culture, and more. How can I assist you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl font-bold text-foreground mb-4 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            AI Tourism Assistant
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get instant answers to your travel questions about Jharkhand. Our AI assistant is here to help you plan the
            perfect trip.
          </motion.p>
        </div>

        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className={`transition-all duration-300 ${isMinimized ? "h-16" : "h-[600px]"} flex flex-col`}>
            <CardHeader className="pb-4 border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span>Jharkhand Tourism Bot</span>
                  <Badge variant="secondary" className="ml-2">
                    Online
                  </Badge>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={resetChat}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsMinimized(!isMinimized)}>
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex-1 flex flex-col"
                >
                  {/* Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              {message.sender === "bot" && (
                                <Bot className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                              )}
                              {message.sender === "user" && (
                                <User className="w-4 h-4 mt-0.5 text-primary-foreground flex-shrink-0" />
                              )}
                              <div className="flex-1">
                                <p className="text-sm whitespace-pre-line">{message.text}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    <AnimatePresence>
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex justify-start"
                        >
                          <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Bot className="w-4 h-4 text-primary" />
                              <div className="flex space-x-1">
                                <motion.div
                                  className="w-2 h-2 bg-primary rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-primary rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-primary rounded-full"
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </CardContent>

                  {/* Quick Questions */}
                  <div className="px-4 py-2 border-t border-border">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {quickQuestions.slice(0, 3).map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickQuestion(question)}
                          className="text-xs"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask me anything about Jharkhand tourism..."
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        disabled={isTyping}
                      />
                      <Button onClick={handleSendMessage} disabled={isTyping || !inputValue.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
