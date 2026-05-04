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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block rounded-full bg-white/5 px-5 py-2 text-sm font-medium text-[#C8A960] mb-5 font-[family-name:var(--font-poppins)] tracking-wider uppercase border border-[#C8A960]/20">
                Our Story
              </span>
              <h2 className="text-3xl font-bold text-[#FFFDF2] sm:text-4xl lg:text-5xl text-balance font-[family-name:var(--font-playfair)]">
                The Vision Behind{" "}
                <span className="gradient-text italic">Paratha Junction</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-[#FFFDF2]/70 font-[family-name:var(--font-poppins)] text-lg leading-relaxed">
              <p>
                At Paratha Junction, we believe that nobody should have to compromise on the taste and hygiene of home-cooked food. Our journey started with a simple mission: to deliver premium, nutritious, and absolutely delicious daily tiffins to the hardworking people of Nagpur.
              </p>
              <p>
                Under the visionary leadership of our Director, <strong className="text-[#C8A960] font-semibold">Vicky Baig (Azaan Baig)</strong>, we have transformed from a humble kitchen into Nagpur&apos;s No.1 Premium Tiffin Service. 
              </p>
              <p>
                His uncompromising dedication to quality, FSSAI-certified hygiene standards, and the warmth of a mother&apos;s recipe has allowed us to serve over 500+ happy families daily, redefining the standard for meal subscriptions in the city.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-6">
              <div>
                <p className="text-xl font-bold text-[#FFFDF2] font-[family-name:var(--font-playfair)]">Vicky Baig (Azaan Baig)</p>
                <p className="text-sm text-[#C8A960] font-[family-name:var(--font-poppins)] uppercase tracking-widest mt-1">Director & Founder</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Photo */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative perspective-container z-10"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-[#C8A960]/20 shadow-2xl shadow-[#C8A960]/10 bg-black/40">
              <Image
                src="/images/director.jpg"
                alt="Vicky Baig (Azaan Baig) - Director of Paratha Junction"
                fill
                className="object-cover"
                onError={(e) => {
                  // Hide image if placeholder doesn't exist yet so it doesn't look broken
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-[#FFFDF2]/20 font-[family-name:var(--font-poppins)] -z-10">
                Photo Placeholder
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <Quote className="h-10 w-10 text-[#C8A960] mb-4 opacity-50" />
                <p className="text-lg text-[#FFFDF2] font-[family-name:var(--font-playfair)] italic leading-relaxed">
                  &ldquo;Food is not just fuel; it is the feeling of home. We cook every meal as if we are feeding our own family.&rdquo;
                </p>
              </div>
            </div>
            
            {/* Decorative background block */}
            <div className="absolute -inset-4 border border-[#C8A960]/10 rounded-[2.5rem] -z-10 translate-x-4 translate-y-4" />
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
