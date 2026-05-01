"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const suggestedPrompts = [
  "How many calories in your tiffin?",
  "What is included in monthly plan?",
  "Is this good for weight loss?",
  "Suggest low-carb meal option",
]

const responses: Record<string, string> = {
  calories: "Our standard tiffin meal contains approximately 450-550 calories. This includes dal, rice, 2 rotis, and seasonal sabzi. It's a balanced meal perfect for lunch or dinner!",
  plan: "Our monthly plans include: Smart Subscription (₹2400/month for Lunch OR Dinner daily, ₹80/meal) and Premium Full Meal Plan (₹4800/month for Lunch + Dinner, ₹80/meal). Both plans include freshly cooked homely meals delivered to your doorstep!",
  weight: "Yes! Our meals are great for weight management. We use minimal oil, fresh vegetables, and balanced portions. For weight loss, we recommend our lunch-only subscription which provides around 500 calories per meal. Combine it with regular exercise for best results!",
  "low-carb": "For low-carb options, we can customize your tiffin to include extra vegetables and protein-rich dal instead of rice. Just let us know your preferences when subscribing, and we'll adjust your meals accordingly!",
  default: "Thank you for your question! Our tiffin service offers fresh, hygienic, home-style meals delivered daily in Nagpur. For specific inquiries, please call us at 8999246569 or 7498390485. We're happy to help!",
}

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  if (lowerMessage.includes("calorie") || lowerMessage.includes("calories")) {
    return responses.calories
  }
  if (lowerMessage.includes("plan") || lowerMessage.includes("subscription") || lowerMessage.includes("include")) {
    return responses.plan
  }
  if (lowerMessage.includes("weight") || lowerMessage.includes("diet") || lowerMessage.includes("loss")) {
    return responses.weight
  }
  if (lowerMessage.includes("carb") || lowerMessage.includes("keto") || lowerMessage.includes("low")) {
    return responses["low-carb"]
  }
  return responses.default
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! 👋 I'm your Paratha Junction assistant. I can help you with meal information, subscription plans, nutrition queries, and more. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500))

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getResponse(text),
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, assistantMessage])
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-opacity ${
          isOpen ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-chart-1 text-[10px] font-bold text-primary-foreground">
          1
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex h-[500px] w-[380px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/20">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-foreground">PJ Assistant</h3>
                  <p className="text-xs text-primary-foreground/70">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20 text-primary-foreground transition-colors hover:bg-primary-foreground/30"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Bot className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl bg-secondary px-4 py-3">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-muted-foreground"
                    />
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="h-2 w-2 rounded-full bg-muted-foreground"
                    />
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="h-2 w-2 rounded-full bg-muted-foreground"
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length === 1 && (
              <div className="border-t border-border px-4 py-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Suggested questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10 shrink-0 rounded-full"
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
