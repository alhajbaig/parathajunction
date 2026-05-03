"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle, Star, Clock, Shield, Truck, Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

const floatingItems = [
  { icon: "🥗", label: "Fresh Sabzi", delay: 0 },
  { icon: "🫓", label: "Hot Roti", delay: 0.5 },
  { icon: "🍚", label: "Steamed Rice", delay: 1 },
  { icon: "🍛", label: "Dal Tadka", delay: 1.5 },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden pt-20 grain">
      {/* Animated Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        {/* Radial gradient orbs */}
        <div className="absolute right-[-10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.08)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.06)_0%,transparent_70%)]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(245,240,225,0.5)_0%,transparent_70%)]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Diagonal lines for depth */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 60px)' }} />
      </motion.div>

      <motion.div style={{ opacity }} className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <motion.div style={{ y: textY }} className="space-y-8">
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-5 py-2.5 text-sm font-medium text-black border border-black/10 shadow-sm">
                <Sparkles className="h-4 w-4 text-[#C8A960]" />
                <span className="font-[family-name:var(--font-poppins)]">Nagpur&apos;s No.1 Cloud Kitchen</span>
              </span>
            </motion.div>

            {/* Heading with Playfair Display */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              <h2 className="text-[#C8A960] font-[family-name:var(--font-poppins)] font-semibold tracking-wider uppercase text-sm sm:text-base">
                Welcome to Paratha Junction Cloud Kitchen Tiffin Junction
              </h2>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl text-balance">
                <span className="font-[family-name:var(--font-playfair)] italic text-black">Homely Meals,</span>{" "}
                <br className="hidden sm:block" />
                <span className="relative inline-block">
                  <span className="font-[family-name:var(--font-playfair)] gradient-text font-bold not-italic">Delivered</span>
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
                    className="absolute -bottom-3 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <motion.path
                      d="M2 10C50 2 150 2 198 10"
                      stroke="#C8A960"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                  </motion.svg>
                </span>{" "}
                <span className="font-[family-name:var(--font-playfair)] italic text-black">Fresh Daily</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty font-[family-name:var(--font-poppins)]">
                Experience the authentic taste of home with our premium cloud kitchen tiffin service. Fresh ingredients, hygienic preparation, on-time delivery — every single day.
              </p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Shield, label: "FSSAI Certified" },
                { icon: Clock, label: "On-Time Delivery" },
                { icon: Truck, label: "5-Box Insulated" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black border border-black/8 shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  <item.icon className="h-4 w-4 text-[#C8A960]" />
                  <span className="font-[family-name:var(--font-poppins)] text-xs font-semibold tracking-wide uppercase">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-8 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["RS", "PM", "AV", "SP"].map((initials, i) => (
                    <motion.div
                      key={initials}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="h-10 w-10 rounded-full border-2 border-[#FFFDF2] bg-black flex items-center justify-center text-xs font-bold text-[#FFFDF2]"
                    >
                      {initials}
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-black font-[family-name:var(--font-playfair)]">4.8</span>
                    <Star className="h-4 w-4 fill-[#C8A960] text-[#C8A960]" />
                  </div>
                  <span className="text-xs text-muted-foreground font-[family-name:var(--font-poppins)]">500+ reviews</span>
                </div>
              </div>
              
              <div className="h-12 w-px bg-[#C8A960]/30" />
              
              <div>
                <p className="text-2xl font-bold text-black font-[family-name:var(--font-playfair)]">10K+</p>
                <p className="text-xs text-muted-foreground font-[family-name:var(--font-poppins)]">Meals Monthly</p>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button asChild size="lg" className="rounded-full px-8 h-14 text-base bg-black text-[#FFFDF2] hover:bg-black/90 shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transition-all group border-0">
                <Link href="/plans">
                  <span className="font-[family-name:var(--font-poppins)] font-semibold">Start Subscription</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="rounded-full px-8 h-14 text-base border-black/15 hover:bg-black hover:text-[#FFFDF2] transition-all group"
              >
                <a
                  href={user 
                    ? `https://wa.me/918999246569?text=${encodeURIComponent(`Hi, I'm ${user.name}. I'm interested in your tiffin service. Please share more details.`)}`
                    : "https://wa.me/918999246569?text=Hi%2C%20I%27m%20interested%20in%20your%20tiffin%20service"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-[family-name:var(--font-poppins)] font-semibold">WhatsApp Order</span>
                </a>
              </Button>
            </motion.div>

            {/* Price Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-flex items-center gap-3 rounded-2xl bg-black px-6 py-3 gold-glow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8A960] text-black font-bold font-[family-name:var(--font-playfair)] text-lg">
                ₹80
              </div>
              <div>
                <p className="text-sm font-semibold text-[#FFFDF2] font-[family-name:var(--font-poppins)]">Starting at just ₹80/meal</p>
                <p className="text-xs text-[#FFFDF2]/60 font-[family-name:var(--font-poppins)]">With monthly subscription plan</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative perspective-container"
          >
            {/* Main Container */}
            <div className="relative aspect-square max-w-xl mx-auto">
              {/* Decorative Rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[#C8A960]/15"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-dashed border-black/5"
              />
              
              {/* Background Gradient */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-[#F5F0E1] via-[#FFFDF2] to-[#EDE8D8]" />
              
              {/* Main Food Image */}
              <motion.div
                style={{ scale: imageScale }}
                className="absolute inset-14"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", type: "tween" }}
                  className="w-full h-full"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl shadow-black/15 border-4 border-white">
                    <Image
                      src="/images/hero-food-premium.png"
                      alt="Delicious home-style tiffin meal with dal, sabzi, roti and rice"
                      width={600}
                      height={600}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Food Cards */}
              {floatingItems.map((item, index) => {
                const positions = [
                  "top-4 -left-2 sm:top-8 sm:-left-4",
                  "top-1/4 -right-4 sm:-right-8",
                  "bottom-1/4 -left-2 sm:-left-6",
                  "bottom-8 -right-2 sm:-right-4",
                ]
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + item.delay, type: "spring" }}
                    className={`absolute ${positions[index]}`}
                  >
                    <motion.div
                      animate={{ 
                        y: [0, index % 2 === 0 ? -10 : 10, 0],
                        rotate: [0, index % 2 === 0 ? 2 : -2, 0]
                      }}
                      transition={{ duration: 4 + index * 0.5, repeat: Infinity, ease: "easeInOut", type: "tween" }}
                      className="rounded-2xl bg-white/90 backdrop-blur-md p-3 shadow-xl shadow-black/8 border border-[#C8A960]/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5F0E1] text-xl">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-black font-[family-name:var(--font-poppins)]">{item.label}</p>
                          <p className="text-[10px] text-muted-foreground">Fresh Daily</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}

              {/* Price Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4, type: "spring" }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2"
              >
                <div className="rounded-2xl bg-black px-7 py-4 text-[#FFFDF2] shadow-2xl shadow-black/20 gold-glow">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-[10px] font-medium text-[#C8A960] uppercase tracking-widest font-[family-name:var(--font-poppins)]">Monthly Plan</p>
                      <p className="text-2xl font-bold font-[family-name:var(--font-playfair)]">₹2,400</p>
                    </div>
                    <div className="h-10 w-px bg-[#C8A960]/30" />
                    <div className="text-right">
                      <p className="text-[10px] font-medium text-[#C8A960] uppercase tracking-widest font-[family-name:var(--font-poppins)]">Per Meal</p>
                      <p className="text-lg font-bold font-[family-name:var(--font-playfair)]">₹80</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, type: "tween" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-medium font-[family-name:var(--font-poppins)] tracking-widest uppercase">Scroll to explore</span>
          <div className="h-10 w-6 rounded-full border-2 border-black/15 p-1.5 flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, type: "tween" }}
              className="h-2 w-2 rounded-full bg-[#C8A960]"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Elegant Bottom Separator */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  )
}
