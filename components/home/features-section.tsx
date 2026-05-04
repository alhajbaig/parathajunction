"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Shield, Flame, Wallet, Clock, Heart, Truck } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "FSSAI Certified Kitchen",
    description: "Our kitchen follows strict FSSAI guidelines (LIC: 21525077800045) with regular sanitization and quality checks.",
    accent: "#C8A960",
  },
  {
    icon: Flame,
    title: "Freshly Cooked Daily",
    description: "Every meal is prepared fresh using premium ingredients — no preservatives, no shortcuts, just pure home taste.",
    accent: "#C8A960",
  },
  {
    icon: Wallet,
    title: "Affordable Plans",
    description: "Starting at just ₹80/meal with flexible subscription options for every budget — students & professionals.",
    accent: "#C8A960",
  },
  {
    icon: Clock,
    title: "Flexible Timing",
    description: "Choose lunch, dinner, or both — delivered exactly when you need them, hot and fresh.",
    accent: "#C8A960",
  },
  {
    icon: Heart,
    title: "Home-style Taste",
    description: "Recipes crafted with love — dal, sabzi, roti, rice, achar, papad & salad in every tiffin.",
    accent: "#C8A960",
  },
  {
    icon: Truck,
    title: "Wide Coverage",
    description: "Serving Sadar, Mankapur, Godhni, Jafar Nagar, Gittikhadan, Friends Colony, Borgaon & Palloti Area.",
    accent: "#C8A960",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const bannerX = useTransform(scrollYProgress, [0, 1], ["10%", "-40%"])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden grain">
      {/* Subtle background accents with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.05)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.04)_0%,transparent_70%)]" />
        
        {/* Parallax floating shapes */}
        <div className="absolute top-1/4 left-10 h-32 w-32 rounded-full border border-[#C8A960]/10" />
        <div className="absolute bottom-1/4 right-10 h-48 w-48 rounded-full border border-black/5" />
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
          <span className="inline-block rounded-full bg-black/5 px-5 py-2 text-sm font-medium text-black mb-5 font-[family-name:var(--font-poppins)] tracking-wider uppercase border border-black/8">
            Our Promise
          </span>
          <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl text-balance font-[family-name:var(--font-playfair)]">
            Why Paratha Junction{" "}
            <span className="gradient-text italic">Stands Out</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty font-[family-name:var(--font-poppins)]">
            We don&apos;t just deliver food — we deliver happiness, nutrition, and the comfort of home
          </p>
        </motion.div>

        {/* Image + Features Layout */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Center Image Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 lg:col-start-5 order-first lg:order-none lg:sticky lg:top-32"
          >
            <div className="perspective-container">
              <motion.div
                whileHover={{ rotateY: -5, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-[#C8A960]/15"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/images/kitchen-cooking.png"
                    alt="Our hygienic kitchen where fresh meals are prepared daily"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                
                {/* Bottom Label */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="glass-dark rounded-2xl p-4">
                    <p className="text-sm font-semibold text-[#FFFDF2] font-[family-name:var(--font-playfair)]">Our Hygienic Kitchen</p>
                    <p className="text-xs text-[#FFFDF2]/60 font-[family-name:var(--font-poppins)]">Where love meets cooking</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Left Features */}
          <div className="lg:col-span-4 space-y-4">
            {features.slice(0, 3).map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -4, x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group h-full rounded-2xl bg-white p-6 shadow-3d border border-black/5 hover:border-[#C8A960]/20 transition-all duration-300"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black text-[#C8A960]"
                  >
                    <feature.icon className="h-6 w-6" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-[#C8A960] transition-colors font-[family-name:var(--font-playfair)]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed font-[family-name:var(--font-poppins)]">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right Features */}
          <div className="lg:col-span-4 space-y-4 lg:mt-12">
            {features.slice(3, 6).map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -4, x: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group h-full rounded-2xl bg-white p-6 shadow-3d border border-black/5 hover:border-[#C8A960]/20 transition-all duration-300"
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black text-[#C8A960]"
                  >
                    <feature.icon className="h-6 w-6" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-black mb-2 group-hover:text-[#C8A960] transition-colors font-[family-name:var(--font-playfair)]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed font-[family-name:var(--font-poppins)]">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="elegant-divider max-w-xs mx-auto mb-8" />
          <p className="text-muted-foreground mb-2 font-[family-name:var(--font-poppins)]">
            Experience the difference yourself
          </p>
          <p className="text-lg font-medium text-black font-[family-name:var(--font-playfair)]">
            Over <span className="gradient-text font-bold text-xl">500+ families</span> trust us daily
          </p>
        </motion.div>
      </div>

      {/* Interactive Scroll Banner */}
      <div className="absolute top-1/2 left-0 right-0 w-full overflow-hidden flex whitespace-nowrap opacity-[0.05] pointer-events-none select-none -z-10 -translate-y-1/2">
        <motion.div
          style={{ x: bannerX }}
          className="flex gap-12 items-center"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="text-[15vw] font-black font-[family-name:var(--font-playfair)] tracking-tighter uppercase text-black">
                Quality
              </span>
              <span className="text-[15vw] font-black font-[family-name:var(--font-playfair)] tracking-tighter uppercase text-transparent" style={{ WebkitTextStroke: "2px black" }}>
                Hygiene
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Separator */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  )
}
