"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()
  const { login, user } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already logged in
  if (user) {
    router.push("/profile")
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.email.trim()) {
      setError("Please enter your email address")
      return
    }
    if (!formData.password) {
      setError("Please enter your password")
      return
    }

    setIsSubmitting(true)

    const result = await login({
      email: formData.email,
      password: formData.password,
    })

    if (result.success) {
      router.push("/profile")
    } else {
      setError(result.error || "Login failed")
    }

    setIsSubmitting(false)
  }

  return (
    <main className="min-h-screen bg-[#FFFDF2]">
      <Navbar />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Welcome Back */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.08)_0%,transparent_70%)]" />

                <div className="relative space-y-8">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-5 py-2 text-sm font-medium text-black border border-black/8 font-[family-name:var(--font-poppins)]">
                      <Sparkles className="h-4 w-4 text-[#C8A960]" />
                      Welcome Back
                    </span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight font-[family-name:var(--font-playfair)]">
                    Sign In to Your{" "}
                    <span className="gradient-text italic">Account</span>
                  </h1>

                  <p className="text-lg text-muted-foreground font-[family-name:var(--font-poppins)] leading-relaxed max-w-md">
                    Welcome back! Sign in to manage your subscriptions, view your profile, and order your favorite meals.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { emoji: "🍱", title: "Daily Tiffin", desc: "Fresh meals daily" },
                      { emoji: "📦", title: "Easy Tracking", desc: "Manage orders" },
                      { emoji: "💰", title: "Best Prices", desc: "Starting ₹80/meal" },
                      { emoji: "🛵", title: "Fast Delivery", desc: "On-time, always" },
                    ].map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        className="rounded-2xl bg-white border border-black/8 p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <span className="text-2xl mb-2 block">{item.emoji}</span>
                        <p className="text-sm font-semibold text-black font-[family-name:var(--font-poppins)]">{item.title}</p>
                        <p className="text-xs text-muted-foreground font-[family-name:var(--font-poppins)]">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-3xl bg-white border border-black/8 shadow-3d p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8A960] to-transparent" />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex justify-center mb-6"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFFDF2] shadow-lg shadow-black/10 overflow-hidden border border-black/5">
                    <Image src="/images/logo.png" alt="Paratha Junction" width={64} height={64} className="object-cover w-full h-full" />
                  </div>
                </motion.div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-black font-[family-name:var(--font-playfair)]">
                    Welcome Back
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 font-[family-name:var(--font-poppins)]">
                    Sign in to continue to Paratha Junction
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 font-[family-name:var(--font-poppins)]"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black/70 font-[family-name:var(--font-poppins)]">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-black/10 bg-[#FFFDF2] pl-11 pr-4 py-3.5 text-sm text-black placeholder:text-muted-foreground/60 outline-none focus:border-[#C8A960] focus:ring-2 focus:ring-[#C8A960]/20 transition-all font-[family-name:var(--font-poppins)]"
                        id="login-email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black/70 font-[family-name:var(--font-poppins)]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-black/10 bg-[#FFFDF2] pl-11 pr-12 py-3.5 text-sm text-black placeholder:text-muted-foreground/60 outline-none focus:border-[#C8A960] focus:ring-2 focus:ring-[#C8A960]/20 transition-all font-[family-name:var(--font-poppins)]"
                        id="login-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl h-13 text-base bg-black text-[#FFFDF2] hover:bg-black/90 shadow-lg shadow-black/10 transition-all group font-[family-name:var(--font-poppins)] font-semibold disabled:opacity-60"
                    id="login-submit"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 border-2 border-[#FFFDF2]/30 border-t-[#FFFDF2] rounded-full"
                      />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="my-6 flex items-center gap-4">
                  <div className="flex-1 h-px bg-black/8" />
                  <span className="text-xs text-muted-foreground font-[family-name:var(--font-poppins)]">New to Paratha Junction?</span>
                  <div className="flex-1 h-px bg-black/8" />
                </div>

                <Link href="/signup">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl h-12 border-black/10 text-black hover:bg-black hover:text-[#FFFDF2] transition-all font-[family-name:var(--font-poppins)] font-semibold"
                    id="goto-signup"
                  >
                    Create an Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
