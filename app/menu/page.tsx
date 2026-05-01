"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Calendar, Utensils, Leaf, Flame, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const weeklyMenu = [
  {
    day: "Monday",
    lunch: {
      main: "Dal Tadka",
      sides: ["Jeera Rice", "Roti (3)", "Aloo Gobi", "Salad"],
      type: "veg",
    },
    dinner: {
      main: "Rajma Masala",
      sides: ["Steamed Rice", "Roti (3)", "Mixed Veg", "Pickle"],
      type: "veg",
    },
  },
  {
    day: "Tuesday",
    lunch: {
      main: "Paneer Butter Masala",
      sides: ["Jeera Rice", "Butter Roti (3)", "Green Salad", "Raita"],
      type: "veg",
    },
    dinner: {
      main: "Chole",
      sides: ["Puri (4)", "Onion Salad", "Pickle", "Papad"],
      type: "veg",
    },
  },
  {
    day: "Wednesday",
    lunch: {
      main: "Dal Fry",
      sides: ["Steamed Rice", "Roti (3)", "Bhindi Fry", "Salad"],
      type: "veg",
    },
    dinner: {
      main: "Mix Veg Curry",
      sides: ["Jeera Rice", "Roti (3)", "Dal", "Raita"],
      type: "veg",
    },
  },
  {
    day: "Thursday",
    lunch: {
      main: "Kadhi Pakora",
      sides: ["Steamed Rice", "Roti (3)", "Aloo Sabzi", "Papad"],
      type: "veg",
    },
    dinner: {
      main: "Palak Paneer",
      sides: ["Jeera Rice", "Butter Roti (3)", "Salad", "Sweet"],
      type: "veg",
    },
  },
  {
    day: "Friday",
    lunch: {
      main: "Sambar",
      sides: ["Steamed Rice", "Roti (3)", "Dry Sabzi", "Coconut Chutney"],
      type: "veg",
    },
    dinner: {
      main: "Malai Kofta",
      sides: ["Jeera Rice", "Naan (2)", "Green Salad", "Raita"],
      type: "veg",
    },
  },
  {
    day: "Saturday",
    lunch: {
      main: "Shahi Paneer",
      sides: ["Biryani Rice", "Roti (3)", "Raita", "Papad"],
      type: "veg",
    },
    dinner: {
      main: "Dal Makhani",
      sides: ["Jeera Rice", "Butter Roti (3)", "Salad", "Pickle"],
      type: "veg",
    },
  },
  {
    day: "Sunday",
    lunch: {
      main: "Veg Biryani",
      sides: ["Raita", "Mirchi Ka Salan", "Papad", "Gulab Jamun"],
      type: "special",
    },
    dinner: {
      main: "Paneer Tikka Masala",
      sides: ["Butter Naan (3)", "Green Salad", "Sweet Lassi", "Ice Cream"],
      type: "special",
    },
  },
]

const menuHighlights = [
  {
    icon: Leaf,
    title: "100% Vegetarian",
    description: "Pure veg kitchen with no cross-contamination",
  },
  {
    icon: Flame,
    title: "Freshly Cooked",
    description: "Prepared fresh every day, never reheated",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Lunch: 12-1:30 PM, Dinner: 7:30-9 PM",
  },
  {
    icon: Utensils,
    title: "Variety Menu",
    description: "Different dishes every day of the week",
  },
]

export default function MenuPage() {
  const [selectedDay, setSelectedDay] = useState(0)
  const todayIndex = new Date().getDay()
  const adjustedTodayIndex = todayIndex === 0 ? 6 : todayIndex - 1

  const nextDay = () => {
    setSelectedDay((prev) => (prev + 1) % 7)
  }

  const prevDay = () => {
    setSelectedDay((prev) => (prev - 1 + 7) % 7)
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
              <Calendar className="h-4 w-4" />
              Weekly Menu
            </span>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl text-balance">
              Delicious <span className="gradient-text">Home-Style</span> Meals
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              A new culinary experience every day. Fresh, nutritious, and packed with flavor!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {menuHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-4 rounded-xl bg-card border border-border p-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Day Selector */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevDay}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-2 overflow-x-auto px-4 py-2 no-scrollbar">
              {weeklyMenu.map((menu, index) => (
                <motion.button
                  key={menu.day}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(index)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedDay === index
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : index === adjustedTodayIndex
                      ? "bg-accent text-accent-foreground border border-primary/30"
                      : "bg-secondary text-secondary-foreground hover:bg-accent"
                  }`}
                >
                  {menu.day}
                  {index === adjustedTodayIndex && selectedDay !== index && (
                    <span className="ml-1.5 text-xs">(Today)</span>
                  )}
                </motion.button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextDay}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Menu Cards */}
          <motion.div
            key={selectedDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {/* Lunch Card */}
            <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80">Lunch</p>
                    <h3 className="text-2xl font-bold">{weeklyMenu[selectedDay].day}</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">
                    ☀️
                  </div>
                </div>
                <p className="mt-2 text-sm text-white/80">Delivery: 12:00 PM - 1:30 PM</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    <Leaf className="h-3 w-3" />
                    {weeklyMenu[selectedDay].lunch.type === "special" ? "Sunday Special" : "Pure Veg"}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-4">
                  {weeklyMenu[selectedDay].lunch.main}
                </h4>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Includes:</p>
                  <div className="flex flex-wrap gap-2">
                    {weeklyMenu[selectedDay].lunch.sides.map((side) => (
                      <span
                        key={side}
                        className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
                      >
                        {side}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dinner Card */}
            <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80">Dinner</p>
                    <h3 className="text-2xl font-bold">{weeklyMenu[selectedDay].day}</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl">
                    🌙
                  </div>
                </div>
                <p className="mt-2 text-sm text-white/80">Delivery: 7:30 PM - 9:00 PM</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    <Leaf className="h-3 w-3" />
                    {weeklyMenu[selectedDay].dinner.type === "special" ? "Sunday Special" : "Pure Veg"}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-4">
                  {weeklyMenu[selectedDay].dinner.main}
                </h4>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Includes:</p>
                  <div className="flex flex-wrap gap-2">
                    {weeklyMenu[selectedDay].dinner.sides.map((side) => (
                      <span
                        key={side}
                        className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
                      >
                        {side}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Week View */}
      <section className="py-16 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Full Week Overview
            </h2>
            <p className="mt-2 text-muted-foreground">
              Plan your meals for the entire week
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] rounded-xl bg-card border border-border overflow-hidden">
              <thead>
                <tr className="bg-secondary">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Day</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Lunch Main</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Dinner Main</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {weeklyMenu.map((menu, index) => (
                  <motion.tr
                    key={menu.day}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`hover:bg-secondary/50 transition-colors ${
                      index === adjustedTodayIndex ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-foreground">
                        {menu.day}
                        {index === adjustedTodayIndex && (
                          <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            Today
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{menu.lunch.main}</td>
                    <td className="px-4 py-3 text-muted-foreground">{menu.dinner.main}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-primary p-8 lg:p-12 text-center text-primary-foreground"
          >
            <span className="text-5xl mb-4 block">🍛</span>
            <h2 className="text-2xl font-bold sm:text-3xl mb-4">
              Ready to taste the difference?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Start your subscription today and enjoy home-style meals delivered to your doorstep!
            </p>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="rounded-full"
            >
              <a href="/plans">
                View Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </main>
  )
}
