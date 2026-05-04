"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Star, Quote, ChevronLeft, ChevronRight, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Borgaon, Nagpur",
    rating: 5,
    text: "Best tiffin service in Nagpur! The food tastes exactly like home-cooked meals. Been using their service for 6 months now and never disappointed.",
    avatar: "RS",
    role: "Software Engineer",
  },
  {
    id: 2,
    name: "Priya Mehta",
    location: "Sadar, Nagpur",
    rating: 5,
    text: "Very hygienic and always on-time delivery. Highly recommended for working professionals! The packaging is great and food stays warm.",
    avatar: "PM",
    role: "Marketing Manager",
  },
  {
    id: 3,
    name: "Aman Verma",
    location: "Friends Colony, Nagpur",
    rating: 5,
    text: "Perfect balance of taste and price for working professionals. The portion size is adequate and the variety in menu keeps things interesting.",
    avatar: "AV",
    role: "Bank Employee",
  },
  {
    id: 4,
    name: "Sneha Patil",
    location: "Gorewada, Nagpur",
    rating: 5,
    text: "As a student living away from home, this service is a blessing! The food reminds me of my mom&apos;s cooking. Thank you Paratha Junction!",
    avatar: "SP",
    role: "Medical Student",
  },
  {
    id: 5,
    name: "Vikram Deshmukh",
    location: "Mankapur, Nagpur",
    rating: 5,
    text: "I&apos;ve tried many tiffin services but this is by far the best. The consistency in quality is remarkable. Delivery guys are very professional.",
    avatar: "VD",
    role: "Business Owner",
  },
  {
    id: 6,
    name: "Megha Agrawal",
    location: "Gittikhadan, Nagpur",
    rating: 5,
    text: "Finally found a tiffin service that understands home-style cooking. No excessive oil or spices, just pure wholesome food!",
    avatar: "MA",
    role: "Teacher",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const bannerX = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"])

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [autoPlay])

  const next = () => {
    setAutoPlay(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setAutoPlay(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden bg-black grain">
      {/* Background with Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.04)_0%,transparent_70%)]" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[#C8A960]/10 px-5 py-2 text-sm font-medium text-[#C8A960] mb-5 border border-[#C8A960]/20 font-[family-name:var(--font-poppins)] tracking-wider uppercase">
            <Star className="h-4 w-4 fill-[#C8A960]" />
            Customer Love
          </span>
          <h2 className="text-3xl font-bold text-[#FFFDF2] sm:text-4xl lg:text-5xl text-balance font-[family-name:var(--font-playfair)]">
            What Our{" "}
            <span className="gradient-text italic">Customers</span>{" "}Say
          </h2>
          <p className="mt-5 text-lg text-[#FFFDF2]/50 max-w-2xl mx-auto text-pretty font-[family-name:var(--font-poppins)]">
            Man bhi bhare, pet bhi bhare — aur swaad bhi aaye!
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center mb-12">
          {/* Featured Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative perspective-container"
          >
            <motion.div
              whileHover={{ rotateY: 3, rotateX: -2 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative rounded-3xl bg-gradient-to-br from-[#C8A960] via-[#D4C494] to-[#C8A960] p-8 lg:p-10 text-black shadow-2xl shadow-[#C8A960]/20"
            >
              <Quote className="absolute top-6 right-6 h-16 w-16 text-black/5" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-black text-black" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-lg lg:text-xl leading-relaxed mb-8 font-medium font-[family-name:var(--font-playfair)] italic">
                    &ldquo;{testimonials[activeIndex].text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-bold text-[#C8A960] font-[family-name:var(--font-playfair)]">
                      {testimonials[activeIndex].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-lg font-[family-name:var(--font-playfair)]">
                        {testimonials[activeIndex].name}
                      </p>
                      <p className="text-black/60 text-sm font-[family-name:var(--font-poppins)]">
                        {testimonials[activeIndex].role}
                      </p>
                      <p className="flex items-center gap-1 text-black/50 text-xs mt-0.5 font-[family-name:var(--font-poppins)]">
                        <MapPin className="h-3 w-3" />
                        {testimonials[activeIndex].location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-black/10">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prev}
                  className="rounded-full bg-black/10 hover:bg-black/20 text-black"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setAutoPlay(false)
                        setActiveIndex(i)
                      }}
                      className={`h-2 rounded-full transition-all ${
                        i === activeIndex
                          ? "w-8 bg-black"
                          : "w-2 bg-black/20 hover:bg-black/40"
                      }`}
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={next}
                  className="rounded-full bg-black/10 hover:bg-black/20 text-black"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Mini Testimonial Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  onClick={() => {
                    setAutoPlay(false)
                    setActiveIndex(index)
                  }}
                  className={`relative rounded-2xl p-5 cursor-pointer transition-all border ${
                    activeIndex === index
                      ? "bg-white/10 border-[#C8A960]/30 shadow-lg shadow-[#C8A960]/10"
                      : "bg-white/5 border-white/5 hover:border-[#C8A960]/15 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8A960]/15 text-xs font-semibold text-[#C8A960] shrink-0 font-[family-name:var(--font-playfair)]">
                      {testimonial.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-[#FFFDF2] truncate font-[family-name:var(--font-playfair)]">
                        {testimonial.name}
                      </p>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-[#C8A960] text-[#C8A960]" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#FFFDF2]/40 line-clamp-2 leading-relaxed font-[family-name:var(--font-poppins)]">
                    {testimonial.text}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-white/5 backdrop-blur-sm border border-[#C8A960]/10 p-6 lg:p-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#FFFDF2] font-[family-name:var(--font-playfair)]">4.8</p>
                <p className="text-sm text-[#FFFDF2]/40 font-[family-name:var(--font-poppins)]">Avg Rating</p>
              </div>
              <div className="h-10 w-px bg-[#C8A960]/20 hidden sm:block" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[#FFFDF2] font-[family-name:var(--font-playfair)]">500+</p>
                <p className="text-sm text-[#FFFDF2]/40 font-[family-name:var(--font-poppins)]">Happy Customers</p>
              </div>
              <div className="h-10 w-px bg-[#C8A960]/20 hidden sm:block" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[#FFFDF2] font-[family-name:var(--font-playfair)]">98%</p>
                <p className="text-sm text-[#FFFDF2]/40 font-[family-name:var(--font-poppins)]">Recommend Us</p>
              </div>
            </div>
            <Button asChild className="rounded-full px-6 bg-[#C8A960] text-black hover:bg-[#D4C494] font-[family-name:var(--font-poppins)] font-semibold">
              <Link href="/reviews">
                View All Reviews
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Interactive Scroll Banner */}
      <div className="absolute top-1/3 left-0 right-0 w-full overflow-hidden flex whitespace-nowrap opacity-[0.03] pointer-events-none select-none z-0">
        <motion.div
          style={{ x: bannerX }}
          className="flex gap-12 items-center"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="text-[15vw] font-black font-[family-name:var(--font-playfair)] tracking-tighter uppercase text-[#FFFDF2]">
                Happy Customers
              </span>
              <span className="text-[15vw] font-black font-[family-name:var(--font-playfair)] tracking-tighter uppercase text-transparent" style={{ WebkitTextStroke: "2px #FFFDF2" }}>
                500+
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Separator */}
      <div className="absolute bottom-0 left-0 right-0 section-separator z-10" />
    </section>
  )
}
