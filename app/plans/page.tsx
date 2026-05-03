"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Check, Sparkles, ArrowRight, MessageCircle, Phone, HelpCircle, MapPin, X, User, AlertCircle } from "lucide-react"

const plans = [
  {
    id: "basic",
    name: "Basic Plan",
    emoji: "🥗",
    price: 120,
    period: "per meal",
    description: "Perfect for trying us out or occasional orders",
    features: [
      "One-time order flexibility",
      "Choose Lunch OR Dinner",
      "Fresh homely food",
      "Standard delivery",
      "Quality ingredients",
    ],
    popular: false,
    badge: null,
  },
  {
    id: "smart",
    name: "Smart Subscription",
    emoji: "🍱",
    price: 2400,
    pricePerMeal: 80,
    period: "per month",
    description: "Best for students & working professionals",
    features: [
      "Lunch OR Dinner daily",
      "30 days subscription",
      "Save ₹40 per meal",
      "Priority delivery slots",
      "Pause anytime feature",
      "Weekly menu variety",
    ],
    popular: true,
    badge: "Most Popular",
  },
  {
    id: "premium",
    name: "Premium Full Meal",
    emoji: "🔥",
    price: 4800,
    pricePerMeal: 80,
    period: "per month",
    description: "Maximum savings & complete daily coverage",
    features: [
      "Lunch + Dinner daily",
      "60 meals per month",
      "Maximum savings",
      "Priority support",
      "Free delivery",
      "Special occasion meals",
      "Dedicated relationship manager",
    ],
    popular: false,
    badge: "Best Value",
  },
]

const faqs = [
  {
    question: "What is included in each meal?",
    answer: "Each meal typically includes Dal/Curry, Rice, 2-3 Rotis, Seasonal Sabzi, and sometimes a sweet or salad. The menu varies daily to ensure variety.",
  },
  {
    question: "Can I pause my subscription?",
    answer: "Yes! You can pause your subscription anytime with 24 hours notice. Unused meals will be credited to your account.",
  },
  {
    question: "What are the delivery timings?",
    answer: "Lunch is delivered between 12:00 PM - 1:30 PM and Dinner between 7:30 PM - 9:00 PM. You can set your preferred time slot.",
  },
  {
    question: "Do you deliver to my area?",
    answer: "We currently deliver across all major areas in Nagpur. Contact us to confirm delivery to your specific location.",
  },
]

export default function PlansPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [addressInput, setAddressInput] = useState("")
  const [addressError, setAddressError] = useState("")
  const { user, updateAddress } = useAuth()
  const router = useRouter()

  const handleSubscribeClick = (planName: string) => {
    if (!user) {
      // Not logged in — redirect to signup
      router.push("/signup")
      return
    }

    // If user already has an address, proceed directly
    if (user.address) {
      setAddressInput(user.address)
      openWhatsApp(planName, user.name, user.address)
      return
    }

    // Show address modal
    setSelectedPlan(planName)
    setAddressInput("")
    setAddressError("")
    setShowAddressModal(true)
  }

  const handleConfirmAddress = () => {
    if (!addressInput.trim()) {
      setAddressError("Please enter your delivery address")
      return
    }
    if (addressInput.trim().length < 10) {
      setAddressError("Please enter a more detailed address")
      return
    }

    // Save address to profile
    updateAddress(addressInput.trim())

    // Open WhatsApp
    if (selectedPlan && user) {
      openWhatsApp(selectedPlan, user.name, addressInput.trim())
    }

    setShowAddressModal(false)
  }

  const openWhatsApp = (planName: string, userName: string, address: string) => {
    const message = `Hi, I'm ${userName}. I'm interested in the ${planName} plan.\n\nDelivery Address: ${address}\n\nPlease help me subscribe. Thank you!`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/918999246569?text=${encodedMessage}`, "_blank")
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              Pricing Plans
            </span>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl text-balance">
              Choose Your Perfect <span className="gradient-text">Meal Plan</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Affordable, flexible, and designed to fit your lifestyle. Start saving today!
            </p>
            {user && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-sm text-[#C8A960] font-medium font-[family-name:var(--font-poppins)]"
              >
                Welcome back, {user.name.split(" ")[0]}! 👋
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative h-full rounded-3xl p-8 transition-all duration-300 ${
                    plan.popular
                      ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/25 border-2 border-primary ring-4 ring-primary/10"
                      : "bg-card border border-border shadow-lg hover:shadow-xl hover:border-primary/30"
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold shadow-md ${
                          plan.popular
                            ? "bg-card text-primary"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        <Sparkles className="h-3 w-3" />
                        {plan.badge}
                      </motion.span>
                    </div>
                  )}

                  {/* Emoji & Plan Name */}
                  <div className="text-center mb-6 pt-2">
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-5xl block mb-3"
                    >
                      {plan.emoji}
                    </motion.span>
                    <h3 className={`text-2xl font-bold ${plan.popular ? "" : "text-foreground"}`}>
                      {plan.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-bold">₹{plan.price.toLocaleString()}</span>
                      <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        /{plan.period.split(" ")[1]}
                      </span>
                    </div>
                    {plan.pricePerMeal && (
                      <p className={`text-sm mt-2 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        Only ₹{plan.pricePerMeal} per meal
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className={`text-center text-sm mb-8 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <motion.li
                        key={feature}
                        whileHover={{ x: 4 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          plan.popular ? "bg-primary-foreground/20" : "bg-primary/10"
                        }`}>
                          <Check className={`h-3 w-3 ${plan.popular ? "" : "text-primary"}`} />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => handleSubscribeClick(plan.name)}
                    className={`w-full rounded-full h-12 text-base font-semibold ${
                      plan.popular
                        ? "bg-card text-primary hover:bg-card/90 shadow-lg"
                        : ""
                    }`}
                    variant={plan.popular ? "secondary" : "default"}
                    size="lg"
                    id={`subscribe-${plan.id}`}
                  >
                    Subscribe Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Trust Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground text-sm">
              ✓ No hidden charges &nbsp;•&nbsp; ✓ Cancel anytime &nbsp;•&nbsp; ✓ 100% satisfaction guaranteed
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <HelpCircle className="h-4 w-4" />
              FAQs
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full rounded-xl bg-card border border-border p-5 text-left transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-foreground">{faq.question}</h3>
                    <motion.span
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      className="shrink-0 text-muted-foreground"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.span>
                  </div>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-primary p-8 lg:p-12 text-center text-primary-foreground"
          >
            <h2 className="text-2xl font-bold sm:text-3xl mb-4">
              Still have questions?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Our team is here to help you choose the perfect plan for your needs. Get in touch!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="rounded-full"
              >
                <a href="tel:8999246569">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a
                  href="https://wa.me/918999246569"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Address Modal */}
      <AnimatePresence>
        {showAddressModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddressModal(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4"
            >
              <div className="rounded-3xl bg-white shadow-2xl border border-black/8 overflow-hidden">
                {/* Modal header */}
                <div className="relative bg-black px-6 py-6 text-[#FFFDF2]">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.4)_0%,transparent_70%)]" />
                  </div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C8A960]/20">
                        <MapPin className="h-5 w-5 text-[#C8A960]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold font-[family-name:var(--font-playfair)]">Delivery Address</h3>
                        <p className="text-xs text-[#FFFDF2]/60 font-[family-name:var(--font-poppins)]">Where should we deliver?</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowAddressModal(false)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Modal body */}
                <div className="p-6 space-y-5">
                  {/* User greeting */}
                  {user && (
                    <div className="flex items-center gap-3 rounded-xl bg-[#F5F0E1]/50 border border-[#C8A960]/10 px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C8A960] text-black text-sm font-bold font-[family-name:var(--font-playfair)]">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-black font-[family-name:var(--font-poppins)]">{user.name}</p>
                        <p className="text-xs text-muted-foreground font-[family-name:var(--font-poppins)]">Subscribing for: {selectedPlan}</p>
                      </div>
                    </div>
                  )}

                  {/* Address input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black/70 font-[family-name:var(--font-poppins)]">
                      Full Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={addressInput}
                      onChange={(e) => {
                        setAddressInput(e.target.value)
                        setAddressError("")
                      }}
                      placeholder="e.g., Flat 301, Sunshine Apartments, Near ABC Chowk, Sadar, Nagpur - 440001"
                      rows={3}
                      className="w-full rounded-xl border border-black/10 bg-[#FFFDF2] px-4 py-3 text-sm text-black placeholder:text-muted-foreground/60 outline-none focus:border-[#C8A960] focus:ring-2 focus:ring-[#C8A960]/20 transition-all font-[family-name:var(--font-poppins)] resize-none"
                      id="modal-address-input"
                      autoFocus
                    />
                    {addressError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 flex items-center gap-1 font-[family-name:var(--font-poppins)]"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {addressError}
                      </motion.p>
                    )}
                  </div>

                  {/* Info note */}
                  <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-3">
                    <p className="text-xs text-blue-700 font-[family-name:var(--font-poppins)]">
                      📍 Your address will be saved to your profile and included in the WhatsApp message for seamless ordering.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddressModal(false)}
                      className="flex-1 rounded-xl border-black/10 font-[family-name:var(--font-poppins)]"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleConfirmAddress}
                      className="flex-1 rounded-xl bg-black text-[#FFFDF2] hover:bg-black/90 font-[family-name:var(--font-poppins)] font-semibold group"
                      id="confirm-subscribe"
                    >
                      Subscribe via WhatsApp
                      <MessageCircle className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
      <Chatbot />
    </main>
  )
}
