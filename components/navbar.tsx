"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone, ArrowRight, User, LogOut } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/plans", label: "Plans" },
  { href: "/menu", label: "Menu" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#FFFDF2]/85 backdrop-blur-2xl border-b border-[#C8A960]/10 shadow-lg shadow-black/3"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFFDF2] shadow-lg shadow-black/10 overflow-hidden">
                  <Image src="/images/logo.png" alt="Paratha Junction Logo" width={48} height={48} className="object-cover w-full h-full" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[#C8A960] border-2 border-[#FFFDF2]" />
              </motion.div>
              <div className="hidden sm:block">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-base font-bold text-black leading-tight font-[family-name:var(--font-playfair)]">
                    Paratha Junction
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase font-[family-name:var(--font-poppins)]">
                    Premium Tiffin Service
                  </p>
                </motion.div>
              </div>
            </Link>

            {/* Desktop Navigation - Pill Style */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center gap-1 rounded-full bg-black/[0.03] backdrop-blur-sm p-1.5 border border-black/5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link key={link.href} href={link.href}>
                      <motion.span
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 block font-[family-name:var(--font-poppins)] ${
                          isActive
                            ? "bg-black text-[#FFFDF2] shadow-md shadow-black/15"
                            : "text-black/60 hover:text-black hover:bg-black/5"
                        }`}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.a
                href="tel:8999246569"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-black/70 hover:text-black hover:bg-black/5 transition-all font-[family-name:var(--font-poppins)]"
              >
                <div className="relative">
                  <Phone className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#C8A960] animate-pulse" />
                </div>
                <span>Call Now</span>
              </motion.a>

              {user ? (
                /* Logged-in: Profile Button */
                <Button asChild className="rounded-full px-5 shadow-lg shadow-black/10 hover:shadow-black/20 transition-shadow group bg-black text-[#FFFDF2] hover:bg-black/90 font-[family-name:var(--font-poppins)] font-semibold">
                  <Link href="/profile">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C8A960] text-black text-xs font-bold mr-2">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {user.name.split(" ")[0]}
                  </Link>
                </Button>
              ) : (
                /* Not logged-in: Sign In + Start Today */
                <>
                  <Button variant="outline" asChild className="rounded-full px-5 border-black/10 hover:bg-black/5 font-[family-name:var(--font-poppins)] font-medium">
                    <Link href="/login">
                      <User className="h-4 w-4 mr-1.5" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="rounded-full px-6 shadow-lg shadow-black/10 hover:shadow-black/20 transition-shadow group bg-black text-[#FFFDF2] hover:bg-black/90 font-[family-name:var(--font-poppins)] font-semibold">
                    <Link href="/plans">
                      Start Today
                      <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/5 backdrop-blur-sm border border-black/5 lg:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-4 top-20 z-50 rounded-2xl bg-[#FFFDF2]/95 backdrop-blur-xl border border-[#C8A960]/15 shadow-2xl p-4 lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-all font-[family-name:var(--font-poppins)] ${
                          isActive
                            ? "bg-black text-[#FFFDF2]"
                            : "text-black hover:bg-black/5"
                        }`}
                      >
                        {link.label}
                        <ArrowRight className={`h-4 w-4 ${isActive ? "opacity-100" : "opacity-30"}`} />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-4 pt-4 border-t border-[#C8A960]/15 flex flex-col gap-2"
              >
                <Button variant="outline" asChild className="w-full rounded-xl h-12 border-black/10 font-[family-name:var(--font-poppins)]">
                  <a href="tel:8999246569" className="flex items-center justify-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>Call: 8999246569</span>
                  </a>
                </Button>

                {user ? (
                  /* Logged-in mobile */
                  <Button asChild className="w-full rounded-xl h-12 bg-black text-[#FFFDF2] hover:bg-black/90 font-[family-name:var(--font-poppins)] font-semibold">
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </Button>
                ) : (
                  /* Not logged-in mobile */
                  <>
                    <Button variant="outline" asChild className="w-full rounded-xl h-12 border-black/10 font-[family-name:var(--font-poppins)] font-semibold">
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Link>
                    </Button>
                    <Button asChild className="w-full rounded-xl h-12 bg-black text-[#FFFDF2] hover:bg-black/90 font-[family-name:var(--font-poppins)] font-semibold">
                      <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        Start Your Subscription
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
