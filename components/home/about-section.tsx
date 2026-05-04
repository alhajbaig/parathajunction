"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const bannerX = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"])
  const imgY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden bg-black grain">
      {/* Background with Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.04)_0%,transparent_70%)]" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-32">
        
        {/* 1. Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full bg-white/5 px-5 py-2 text-sm font-medium text-[#C8A960] mb-5 font-[family-name:var(--font-poppins)] tracking-wider uppercase border border-[#C8A960]/20">
            Our Story
          </span>
          <h2 className="text-3xl font-bold text-[#FFFDF2] sm:text-4xl lg:text-5xl text-balance font-[family-name:var(--font-playfair)] mb-8">
            The Vision Behind <span className="gradient-text italic">Paratha Junction</span>
          </h2>
          <div className="space-y-6 text-[#FFFDF2]/70 font-[family-name:var(--font-poppins)] text-lg leading-relaxed">
            <p>
              At Paratha Junction, we believe that nobody should have to compromise on the taste and hygiene of home-cooked food. Our journey started with a simple mission: to deliver premium, nutritious, and absolutely delicious daily tiffins to the hardworking people of Nagpur.
            </p>
          </div>
        </motion.div>

        {/* 2. Founder Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-white/10"
          >
            <Image
              src="/images/director.jpg"
              alt="Vicky Baig - Founder"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {/* Minimal, Professional Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-2xl text-[#FFFDF2] font-[family-name:var(--font-playfair)]">Vicky Baig</p>
              <p className="text-sm text-[#C8A960] font-[family-name:var(--font-poppins)] tracking-widest uppercase mt-1">Founder & Director</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <Quote className="h-12 w-12 text-[#C8A960]/30" />
            <h3 className="text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] text-[#FFFDF2]">A Teenage Visionary</h3>
            <p className="text-[#FFFDF2]/70 text-lg leading-relaxed font-[family-name:var(--font-poppins)]">
              Starting his entrepreneurial journey at just <strong className="text-[#C8A960] font-semibold text-xl">18 years old</strong>, Vicky Baig envisioned a service that bridged the gap between hostel life and home comfort. His uncompromising dedication to quality and business acumen transformed a humble idea into Nagpur&apos;s No.1 Premium Tiffin Service.
            </p>
          </motion.div>
        </div>

        {/* 3. Co-Founder Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <Quote className="h-12 w-12 text-[#C8A960]/30" />
            <h3 className="text-3xl lg:text-4xl font-[family-name:var(--font-playfair)] text-[#FFFDF2]">The Heart of Our Kitchen</h3>
            <p className="text-[#FFFDF2]/70 text-lg leading-relaxed font-[family-name:var(--font-poppins)]">
              As Co-Founder, Kaniz Fatema brings the essential warmth of a mother&apos;s recipe to every tiffin box. Her strict adherence to FSSAI-certified hygiene standards ensures that over 500+ happy families receive safe, delicious, and perfectly balanced meals daily.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto rounded-2xl overflow-hidden border border-white/10 order-1 lg:order-2"
          >
            <Image
              src="/images/kaniz-fatema.jpg"
              alt="Kaniz Fatema - Co-Founder"
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {/* Minimal, Professional Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p className="text-2xl text-[#FFFDF2] font-[family-name:var(--font-playfair)]">Kaniz Fatema</p>
              <p className="text-sm text-[#C8A960] font-[family-name:var(--font-poppins)] tracking-widest uppercase mt-1">Co-Founder</p>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Interactive Scroll Banner */}
      <div className="absolute bottom-20 left-0 right-0 w-full overflow-hidden flex whitespace-nowrap opacity-[0.03] pointer-events-none select-none z-0">
        <motion.div
          style={{ x: bannerX }}
          className="flex gap-12 items-center"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span className="text-[12vw] font-black font-[family-name:var(--font-playfair)] tracking-tighter uppercase text-[#FFFDF2]">
                Our Story
              </span>
              <span className="text-[12vw] font-black font-[family-name:var(--font-playfair)] tracking-tighter uppercase text-transparent" style={{ WebkitTextStroke: "2px #FFFDF2" }}>
                Our Story
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-separator z-10" />
    </section>
  )
}
