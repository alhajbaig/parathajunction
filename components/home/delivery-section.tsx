"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { MapPin, Clock, Truck, Phone, CheckCircle } from "lucide-react"

const coverageAreas = [
  "Sadar", "Mankapur", "Godhni", "Jafar Nagar",
  "Gittikhadan", "Friends Colony", "Borgaon", "Palloti Area",
  "Anant Nagar", "Gorewada", "Om Nagar", "Civil Lines",
]

const deliveryFeatures = [
  { icon: Clock, label: "On-time every day", description: "Lunch: 12-2 PM • Dinner: 7-9 PM" },
  { icon: Truck, label: "Insulated delivery", description: "Food stays hot & fresh till your doorstep" },
  { icon: Phone, label: "24/7 Support", description: "Call us anytime: 8999246569" },
]

export function DeliverySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const bannerX = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden bg-[#F5F0E1] grain">
      {/* Decorative elements */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.1)_0%,transparent_70%)]" />
        <div className="absolute bottom-1/3 left-10 h-32 w-32 rounded-full border-2 border-black/5 border-dashed" />
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
            Delivery Network
          </span>
          <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl text-balance font-[family-name:var(--font-playfair)]">
            Fast & Reliable{" "}
            <span className="gradient-text italic">Delivery</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty font-[family-name:var(--font-poppins)]">
            Hot & fresh meals delivered to your doorstep — covering all major areas in Nagpur
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: Delivery Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative perspective-container"
          >
            <motion.div
              whileHover={{ rotateY: 4, rotateX: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-[#C8A960]/15"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/delivery-person.png"
                  alt="Paratha Junction delivery — fast and reliable tiffin delivery in Nagpur"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              
            </motion.div>

            {/* Floating delivery stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-4 sm:-right-6"
            >
              <div className="rounded-2xl bg-black px-5 py-4 shadow-xl gold-glow">
                <p className="text-[10px] text-[#C8A960] font-semibold uppercase tracking-widest font-[family-name:var(--font-poppins)]">Delivery Rate</p>
                <p className="text-3xl font-bold text-[#FFFDF2] font-[family-name:var(--font-playfair)]">99%</p>
                <p className="text-xs text-[#FFFDF2]/50">On-time delivery</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Delivery Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Delivery Features */}
            <div className="space-y-4">
              {deliveryFeatures.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm border border-black/5 hover:border-[#C8A960]/20 hover:shadow-md transition-all"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-[#C8A960] shrink-0 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black font-[family-name:var(--font-playfair)] text-lg">{feature.label}</h3>
                    <p className="text-sm text-muted-foreground font-[family-name:var(--font-poppins)]">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Coverage Areas */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-[#C8A960]" />
                <h3 className="text-lg font-semibold text-black font-[family-name:var(--font-playfair)]">Coverage Areas</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {coverageAreas.map((area, index) => (
                  <motion.span
                    key={area}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black border border-black/8 shadow-sm hover:border-[#C8A960]/30 hover:shadow-md transition-all cursor-default"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-[#C8A960]" />
                    <span className="font-[family-name:var(--font-poppins)]">{area}</span>
                  </motion.span>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground font-[family-name:var(--font-poppins)]">
                Nagpur - 440013 • Expanding to more areas soon!
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Scroll Banner */}
      <div className="absolute bottom-1/4 left-0 right-0 w-full overflow-hidden flex whitespace-nowrap opacity-[0.05] pointer-events-none select-none z-0">
        <motion.div
          style={{ x: bannerX }}
          className="flex gap-12 items-center"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="text-[12vw] font-black font-[family-name:var(--font-playfair)] tracking-tighter uppercase text-black">
                Fast Delivery
              </span>
              <span className="text-[12vw] font-black font-[family-name:var(--font-playfair)] tracking-tighter uppercase text-transparent" style={{ WebkitTextStroke: "2px black" }}>
                Hot Food
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
