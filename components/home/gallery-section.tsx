"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const galleryItems = [
  {
    src: "/images/food-spread.png",
    alt: "Complete daily tiffin meal spread with dal, sabzi, roti, rice, salad",
    title: "Daily Meal",
    subtitle: "Complete nutrition in every tiffin",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/hero-food-premium.png",
    alt: "Premium multigrain roti with homestyle sabzi and dal",
    title: "Premium Quality",
    subtitle: "Fresh & hygienic ingredients",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/tiffin-product.png",
    alt: "5-Box insulated tiffin carrier keeping food hot",
    title: "5-Box Tiffin",
    subtitle: "First time in Nagpur",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/kitchen-cooking.png",
    alt: "Our professional cloud kitchen preparing fresh meals",
    title: "Premium Kitchen",
    subtitle: "FSSAI certified hygiene",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/delivery-person.png",
    alt: "Fast and reliable delivery on your doorstep",
    title: "Fast Delivery",
    subtitle: "Hot food, on time",
    span: "col-span-1 row-span-1",
  },
]

export function GallerySection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden grain">
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
            Our Gallery
          </span>
          <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl text-balance font-[family-name:var(--font-playfair)]">
            A Glimpse Into{" "}
            <span className="gradient-text italic">Our World</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty font-[family-name:var(--font-poppins)]">
            From our kitchen to your plate — see the love and care in every meal we prepare
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${item.span} relative group perspective-container`}
            >
              <motion.div
                whileHover={{ scale: 1.03, rotateY: 3, rotateX: -2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative h-full w-full rounded-2xl overflow-hidden border border-black/5 shadow-3d"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                >
                  <h3 className="text-lg font-bold text-[#FFFDF2] font-[family-name:var(--font-playfair)]">{item.title}</h3>
                  <p className="text-xs text-[#FFFDF2]/70 font-[family-name:var(--font-poppins)]">{item.subtitle}</p>
                </motion.div>

                {/* Corner Gold Accent */}
                <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-[#C8A960]/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-75 group-hover:scale-100">
                  <svg className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-8 mx-4">
                {["Fresh Ingredients", "•", "Home-style Cooking", "•", "Daily Menu Variety", "•", "Premium Packaging", "•", "On-time Delivery", "•", "100% Vegetarian", "•"].map((text, j) => (
                  <span
                    key={j}
                    className={`text-sm font-medium ${text === "•" ? "text-[#C8A960]" : "text-muted-foreground"} font-[family-name:var(--font-poppins)]`}
                  >
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Separator */}
      <div className="absolute bottom-0 left-0 right-0 section-separator" />
    </section>
  )
}
