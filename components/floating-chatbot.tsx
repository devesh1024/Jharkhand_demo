"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm here to help you explore Jharkhand. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickResponses = ["Popular destinations", "Best time to visit", "How to reach", "Local food"]

  const getQuickResponse = (query: string): string => {
    const responses: Record<string, string> = {
      "popular destinations":
        "Top destinations: Hundru Falls, Betla National Park, Baidyanath Temple, and Netarhat Hill Station!",
      "best time to visit": "October to March is perfect - pleasant weather and clear skies for sightseeing!",
      "how to reach": "Ranchi airport is the main gateway. Well connected by rail and road from major cities.",
      "local food": "Try Dhuska, Pittha, Rugra curry, and traditional Handia rice beer!",
    }
    return (
      responses[query.toLowerCase()] ||
      "I'd be happy to help! You can ask me about destinations, travel tips, culture, or food."
    )
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

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getQuickResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickResponse = (response: string) => {
    setInputValue(response)
    setTimeout(() => handleSendMessage(), 100)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 h-96"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="h-full flex flex-col shadow-2xl">
              <CardHeader className="pb-2 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2 text-sm">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span>Tourism Assistant</span>
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === "bot" && <Bot className="w-3 h-3 mt-0.5 text-primary flex-shrink-0" />}
                        {message.sender === "user" && (
                          <User className="w-3 h-3 mt-0.5 text-primary-foreground flex-shrink-0" />
                        )}
                        <p className="text-xs">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg">
                      <div className="flex items-center space-x-1">
                        <Bot className="w-3 h-3 text-primary" />
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-1 h-1 bg-primary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                          />
                          <motion.div
                            className="w-1 h-1 bg-primary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-1 h-1 bg-primary rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Quick Responses */}
              <div className="p-2 border-t border-border">
                <div className="flex flex-wrap gap-1 mb-2">
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickResponse(response)}
                      className="text-xs h-6"
                    >
                      {response}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-2 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isTyping}
                    className="text-sm"
                  />
                  <Button onClick={handleSendMessage} disabled={isTyping || !inputValue.trim()} size="sm">
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
