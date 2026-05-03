"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden"
    
    const timer = setTimeout(() => {
      setLoading(false)
      document.body.style.overflow = ""
    }, 3000)
    
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFFDF2] grain"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center px-4 max-w-2xl"
          >
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="relative w-24 h-24 rounded-full border-4 border-dashed border-[#C8A960]/30 flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#C8A960]/10 flex items-center justify-center text-3xl">
                  🥗
                </div>
              </motion.div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-black font-[family-name:var(--font-playfair)] mb-6 leading-tight">
              Entering into <br className="md:hidden" />
              <span className="text-[#C8A960] italic">Best Tiffin Service</span> <br className="md:hidden" />
              in Nagpur
            </h1>
            
            <div className="flex justify-center gap-3 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-3 h-3 rounded-full bg-[#C8A960]"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
