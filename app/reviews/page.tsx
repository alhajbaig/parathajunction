"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, ArrowRight, ThumbsUp } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Borgaon, Nagpur",
    rating: 5,
    review: "Best tiffin service in Nagpur! The food tastes exactly like home-cooked meals. Been using their service for 6 months now and never disappointed. The dal and sabzi are always fresh and flavorful.",
    date: "2 weeks ago",
    avatar: "R",
    helpful: 42,
  },
  {
    id: 2,
    name: "Priya Mehta",
    location: "Sadar, Nagpur",
    rating: 5,
    review: "Very hygienic and always on-time delivery. Highly recommended for working professionals! The packaging is great and food stays warm. Customer service is excellent too.",
    date: "1 month ago",
    avatar: "P",
    helpful: 38,
  },
  {
    id: 3,
    name: "Aman Verma",
    location: "Friends Colony, Nagpur",
    rating: 4,
    review: "Perfect balance of taste and price for working professionals. The portion size is adequate and the variety in menu keeps things interesting. Would love more options for low-carb meals.",
    date: "3 weeks ago",
    avatar: "A",
    helpful: 25,
  },
  {
    id: 4,
    name: "Sneha Patil",
    location: "Gorewada, Nagpur",
    rating: 5,
    review: "As a student living away from home, this service is a blessing! The food reminds me of my mom's cooking. The Sunday special biryani is absolutely delicious. Thank you Paratha Junction!",
    date: "1 week ago",
    avatar: "S",
    helpful: 56,
  },
  {
    id: 5,
    name: "Vikram Deshmukh",
    location: "Wardha Road, Nagpur",
    rating: 5,
    review: "I've tried many tiffin services but this is by far the best. The consistency in quality is remarkable. The paneer dishes are restaurant-quality. Delivery guys are also very professional.",
    date: "2 months ago",
    avatar: "V",
    helpful: 31,
  },
  {
    id: 6,
    name: "Anita Joshi",
    location: "Manewada, Nagpur",
    rating: 4,
    review: "Good food at reasonable prices. The smart subscription plan saves a lot of money compared to ordering from restaurants daily. Only suggestion would be to add more South Indian options.",
    date: "1 month ago",
    avatar: "A",
    helpful: 18,
  },
  {
    id: 7,
    name: "Rohan Kulkarni",
    location: "Hingna, Nagpur",
    rating: 5,
    review: "Outstanding service! The food quality has been consistently excellent for the past year. The kadhi pakora on Thursdays is something I look forward to every week. Highly recommend!",
    date: "3 days ago",
    avatar: "R",
    helpful: 64,
  },
  {
    id: 8,
    name: "Megha Agrawal",
    location: "Lakadganj, Nagpur",
    rating: 5,
    review: "Finally found a tiffin service that understands the importance of home-style cooking. No excessive oil or spices, just pure wholesome food. My entire family orders from them now!",
    date: "2 weeks ago",
    avatar: "M",
    helpful: 47,
  },
]

const stats = [
  { value: "4.8", label: "Average Rating" },
  { value: "5000+", label: "Happy Customers" },
  { value: "98%", label: "Would Recommend" },
  { value: "10K+", label: "Reviews" },
]

export default function ReviewsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  // Featured reviews for carousel (top rated ones)
  const featuredReviews = reviews.filter(r => r.rating === 5).slice(0, 4)

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredReviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [autoPlay, featuredReviews.length])

  const nextSlide = () => {
    setAutoPlay(false)
    setCurrentSlide((prev) => (prev + 1) % featuredReviews.length)
  }

  const prevSlide = () => {
    setAutoPlay(false)
    setCurrentSlide((prev) => (prev - 1 + featuredReviews.length) % featuredReviews.length)
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
              <Star className="h-4 w-4 fill-primary" />
              Customer Reviews
            </span>
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl text-balance">
              What Our <span className="gradient-text">Customers</span> Say
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Don&apos;t just take our word for it — hear from thousands of satisfied customers across Nagpur
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-xl bg-card border border-border p-4 text-center"
              >
                <p className="text-2xl font-bold text-primary sm:text-3xl">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Review Carousel */}
      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-card border border-border p-8 lg:p-12 shadow-lg"
              >
                <Quote className="h-12 w-12 text-primary/20 mb-6" />
                <p className="text-xl lg:text-2xl text-foreground leading-relaxed mb-8">
                  &ldquo;{featuredReviews[currentSlide].review}&rdquo;
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                      {featuredReviews[currentSlide].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {featuredReviews[currentSlide].name}
                      </p>
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {featuredReviews[currentSlide].location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < featuredReviews[currentSlide].rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                {featuredReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAutoPlay(false)
                      setCurrentSlide(index)
                    }}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === index
                        ? "w-8 bg-primary"
                        : "w-2 bg-border hover:bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* All Reviews Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              All Customer Reviews
            </h2>
            <p className="mt-2 text-muted-foreground">
              Real feedback from real customers
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className="h-full rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{review.name}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {review.location}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {review.review}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{review.helpful} found this helpful</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xl font-bold text-foreground">4.8</span>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <p className="text-center text-muted-foreground">
              <span className="font-semibold text-foreground">5000+</span> Happy Customers across Nagpur
            </p>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <p className="text-center text-muted-foreground">
              <span className="font-semibold text-foreground">98%</span> Would Recommend Us
            </p>
          </motion.div>
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
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-8 w-8 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl mb-4">
              Join Our Happy Customer Family
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
              Experience the taste that thousands trust. Start your subscription today!
            </p>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="rounded-full"
            >
              <a href="/plans">
                Start Subscription
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
