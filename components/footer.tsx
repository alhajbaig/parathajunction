"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, ArrowUpRight, Heart } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

const footerLinks = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/plans", label: "Plans" },
    { href: "/menu", label: "Menu" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/plans", label: "Daily Tiffin" },
    { href: "/plans", label: "Monthly Subscription" },
    { href: "/menu", label: "Weekly Menu" },
    { href: "/contact", label: "Corporate Orders" },
  ],
}

export function Footer() {
  const { user } = useAuth()

  const whatsappHref = user
    ? `https://wa.me/918999246569?text=${encodeURIComponent(`Hi, I'm ${user.name}. I want to receive daily menu updates.`)}`
    : "https://wa.me/918999246569?text=Hi%2C%20I%20want%20to%20receive%20daily%20menu%20updates"

  return (
    <footer className="relative overflow-hidden bg-black grain">
      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Top Gold Line */}
      <div className="section-separator" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFFDF2] shadow-lg overflow-hidden">
                <Image src="/images/logo.png" alt="Paratha Junction Logo" width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#FFFDF2] font-[family-name:var(--font-playfair)]">Paratha Junction</p>
                <p className="text-[10px] text-[#FFFDF2]/40 font-medium tracking-widest uppercase font-[family-name:var(--font-poppins)]">Premium Tiffin Service</p>
              </div>
            </div>
            <p className="text-sm text-[#FFFDF2]/50 leading-relaxed max-w-sm font-[family-name:var(--font-poppins)]">
              Fresh, Hygienic, Homely Meals delivered daily in Nagpur. Experience the taste of home with every meal, crafted with love and care.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2">
              {[
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Facebook, label: "Facebook", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[#FFFDF2]/50 transition-all hover:bg-[#C8A960] hover:text-black hover:shadow-lg hover:shadow-[#C8A960]/20 border border-white/5 hover:border-[#C8A960]"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold text-[#C8A960] font-[family-name:var(--font-poppins)] tracking-wider uppercase">
                Navigation
              </h3>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-[#FFFDF2]/50 transition-colors hover:text-[#C8A960] font-[family-name:var(--font-poppins)]"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold text-[#C8A960] font-[family-name:var(--font-poppins)] tracking-wider uppercase">
                Services
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-[#FFFDF2]/50 transition-colors hover:text-[#C8A960] font-[family-name:var(--font-poppins)]"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-sm font-semibold text-[#C8A960] font-[family-name:var(--font-poppins)] tracking-wider uppercase">
                Delivery Hours
              </h3>
              <ul className="space-y-2 text-sm text-[#FFFDF2]/50 font-[family-name:var(--font-poppins)]">
                <li className="flex justify-between gap-4">
                  <span>Lunch</span>
                  <span className="font-medium text-[#FFFDF2]/70">12:00 - 2:00 PM</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Dinner</span>
                  <span className="font-medium text-[#FFFDF2]/70">7:00 - 9:00 PM</span>
                </li>
              </ul>
              <div className="pt-2">
                <p className="text-xs text-[#FFFDF2]/30">Order before 10 AM for lunch & 5 PM for dinner</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3 space-y-4"
          >
            <h3 className="text-sm font-semibold text-[#C8A960] font-[family-name:var(--font-poppins)] tracking-wider uppercase">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:8999246569"
                  className="flex items-center gap-3 text-sm text-[#FFFDF2]/50 transition-colors hover:text-[#C8A960] group"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 group-hover:bg-[#C8A960]/15 transition-colors border border-white/5">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-[#FFFDF2]/70 font-[family-name:var(--font-poppins)]">8999246569</p>
                    <p className="text-xs text-[#FFFDF2]/30">Primary</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="tel:7498390485"
                  className="flex items-center gap-3 text-sm text-[#FFFDF2]/50 transition-colors hover:text-[#C8A960] group"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 group-hover:bg-[#C8A960]/15 transition-colors border border-white/5">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-[#FFFDF2]/70 font-[family-name:var(--font-poppins)]">7498390485</p>
                    <p className="text-xs text-[#FFFDF2]/30">Alternative</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@parathajunction.com"
                  className="flex items-center gap-3 text-sm text-[#FFFDF2]/50 transition-colors hover:text-[#C8A960] group"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 group-hover:bg-[#C8A960]/15 transition-colors border border-white/5">
                    <Mail className="h-4 w-4" />
                  </div>
                  <p className="font-medium text-[#FFFDF2]/70 truncate font-[family-name:var(--font-poppins)]">contact@parathajunction.com</p>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#FFFDF2]/50 pt-1">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 shrink-0 border border-white/5">
                  <MapPin className="h-4 w-4" />
                </div>
                <p className="pt-2 font-[family-name:var(--font-poppins)]">Anant Nagar, Nagpur, Maharashtra 440013</p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 rounded-2xl bg-white/5 border border-[#C8A960]/10 p-6 lg:p-8 backdrop-blur-sm"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-[#FFFDF2] font-[family-name:var(--font-playfair)]">Get Daily Menu Updates</h3>
              <p className="text-sm text-[#FFFDF2]/40 mt-1 font-[family-name:var(--font-poppins)]">Subscribe to receive our daily menu and special offers on WhatsApp</p>
            </div>
            <div className="flex gap-3">
              <Button asChild className="rounded-full bg-[#C8A960] text-black hover:bg-[#D4C494] font-[family-name:var(--font-poppins)] font-semibold">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Subscribe on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-8"
        >
          <div className="elegant-divider mb-8" />
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-[#FFFDF2]/30 flex items-center gap-1 font-[family-name:var(--font-poppins)]">
              Made with <Heart className="h-3.5 w-3.5 fill-[#C8A960] text-[#C8A960]" /> in Nagpur
            </p>
            <p className="text-sm text-[#FFFDF2]/30 font-[family-name:var(--font-poppins)]">
              Paratha Junction Tiffin Service &copy; 2026
            </p>
            <div className="flex items-center gap-4 text-sm text-[#FFFDF2]/30 font-[family-name:var(--font-poppins)]">
              <Link href="#" className="transition-colors hover:text-[#C8A960]">
                Privacy
              </Link>
              <Link href="#" className="transition-colors hover:text-[#C8A960]">
                Terms
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
