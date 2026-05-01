"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    primary: "8999246569",
    secondary: "7498390485",
    action: "tel:8999246569",
    actionLabel: "Call Now",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick replies, 24/7 available",
    primary: "+91 8999246569",
    secondary: "Usually replies instantly",
    action: "https://wa.me/918999246569?text=Hi%2C%20I%27m%20interested%20in%20your%20tiffin%20service",
    actionLabel: "Chat Now",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Mail,
    title: "Email",
    description: "For detailed inquiries",
    primary: "contact@parathajunction.com",
    secondary: "We respond within 24 hours",
    action: "mailto:contact@parathajunction.com",
    actionLabel: "Send Email",
    color: "bg-blue-500/10 text-blue-600",
  },
]

const businessHours = [
  { day: "Monday - Friday", hours: "8:00 AM - 9:00 PM" },
  { day: "Saturday", hours: "8:00 AM - 9:00 PM" },
  { day: "Sunday", hours: "9:00 AM - 8:00 PM" },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", phone: "", email: "", message: "" })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-secondary/30 to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <Phone className="h-4 w-4" />
              Contact Us
            </span>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl text-balance">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Have questions? We&apos;d love to hear from you. Reach out and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="h-full rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all"
                >
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${method.color} mb-4`}>
                    <method.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {method.description}
                  </p>
                  <div className="space-y-1 mb-4">
                    <p className="font-medium text-foreground">{method.primary}</p>
                    {method.secondary && (
                      <p className="text-sm text-muted-foreground">{method.secondary}</p>
                    )}
                  </div>
                  <Button asChild className="w-full rounded-full">
                    <a
                      href={method.action}
                      target={method.action.startsWith("http") ? "_blank" : undefined}
                      rel={method.action.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {method.actionLabel}
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mb-2">
                Send us a Message
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form and we&apos;ll get back to you within 24 hours
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center"
                >
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-green-600">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full h-12"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2 h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Location */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Our Location</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Paratha Junction Tiffin Services<br />
                      Nagpur, Maharashtra<br />
                      India - 440001
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-3">Business Hours</h3>
                    <div className="space-y-2">
                      {businessHours.map((item) => (
                        <div
                          key={item.day}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-muted-foreground">{item.day}</span>
                          <span className="font-medium text-foreground">{item.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="rounded-2xl bg-primary/5 border border-primary/10 p-6">
                <h3 className="font-semibold text-foreground mb-3">Delivery Timings</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">☀️</span>
                    <div>
                      <p className="font-medium text-foreground">Lunch Delivery</p>
                      <p className="text-sm text-muted-foreground">12:00 PM - 1:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🌙</span>
                    <div>
                      <p className="font-medium text-foreground">Dinner Delivery</p>
                      <p className="text-sm text-muted-foreground">7:30 PM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                <div className="flex items-center gap-3">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-12 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-card border border-border overflow-hidden h-80 flex items-center justify-center"
          >
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Delivering Across Nagpur
              </h3>
              <p className="text-muted-foreground">
                We cover all major areas in Nagpur city
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}
