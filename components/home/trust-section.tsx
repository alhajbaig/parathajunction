"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Users, UtensilsCrossed, Star, Clock } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Happy Customers",
    description: "Trusted families across Nagpur",
  },
  {
    icon: UtensilsCrossed,
    value: 10000,
    suffix: "+",
    label: "Meals Delivered",
    description: "Fresh meals every month",
  },
  {
    icon: Star,
    value: 4.8,
    suffix: "★",
    label: "Average Rating",
    description: "Based on customer reviews",
  },
  {
    icon: Clock,
    value: 99,
    suffix: "%",
    label: "On-Time Delivery",
    description: "Punctual, every single day",
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current * 10) / 10)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {value % 1 === 0 ? Math.floor(count).toLocaleString() : count.toFixed(1)}
      {suffix}
    </span>
  )
}

export function TrustSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden grain">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(200,169,96,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,96,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block rounded-full bg-[#C8A960]/15 px-5 py-2 text-sm font-medium text-[#C8A960] mb-5 font-[family-name:var(--font-poppins)] tracking-wider uppercase border border-[#C8A960]/20">
            Why Choose Us
          </span>
          <h2 className="text-3xl font-bold text-[#FFFDF2] sm:text-4xl lg:text-5xl text-balance font-[family-name:var(--font-playfair)]">
            Nagpur&apos;s Most Trusted{" "}
            <span className="gradient-text italic">Tiffin Service</span>
          </h2>
          <p className="mt-5 text-lg text-[#FFFDF2]/60 max-w-2xl mx-auto text-pretty font-[family-name:var(--font-poppins)]">
            Join thousands of satisfied customers who trust us for their daily meals
          </p>
        </motion.div>

        {/* Two Column: Image + Stats */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: Image with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative perspective-container"
          >
            <motion.div
              whileHover={{ rotateY: 5, rotateX: -3 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-[#C8A960]/20"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/tiffin-product.png"
                  alt="Premium 5-Box Insulated Tiffin Service"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-dark rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#C8A960] flex items-center justify-center">
                      <Star className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#FFFDF2] font-[family-name:var(--font-poppins)]">5-Box Insulated Tiffin</p>
                      <p className="text-xs text-[#FFFDF2]/60">First time in Nagpur!</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating accent */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", type: "tween" }}
              className="absolute -top-4 -right-4 h-24 w-24 rounded-2xl bg-[#C8A960] flex items-center justify-center shadow-xl shadow-[#C8A960]/30 z-10"
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-black font-[family-name:var(--font-playfair)]">100%</p>
                <p className="text-[10px] font-semibold text-black/70 uppercase tracking-wider">Veg</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative h-full rounded-2xl bg-white/5 backdrop-blur-sm p-6 border border-[#C8A960]/10 overflow-hidden gold-glow-hover"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C8A960]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative">
                    {/* Icon */}
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8A960]/10 text-[#C8A960] transition-colors group-hover:bg-[#C8A960] group-hover:text-black">
                      <stat.icon className="h-6 w-6" />
                    </div>

                    {/* Value */}
                    <div className="text-3xl font-bold text-[#FFFDF2] mb-1 font-[family-name:var(--font-playfair)]">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>

                    {/* Label */}
                    <h3 className="text-sm font-semibold text-[#FFFDF2] mb-1 font-[family-name:var(--font-poppins)]">
                      {stat.label}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[#FFFDF2]/40">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-[#C8A960]/15 px-6 py-3 backdrop-blur-sm">
            <div className="flex -space-x-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-5 w-5 fill-[#C8A960] text-[#C8A960]" />
              ))}
            </div>
            <span className="text-sm font-medium text-[#FFFDF2] font-[family-name:var(--font-poppins)]">
              4.8★ Rating from 500+ Happy Customers
            </span>
          </div>
        </motion.div>
      </div>

      {/* Elegant Bottom Separator */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  )
}
