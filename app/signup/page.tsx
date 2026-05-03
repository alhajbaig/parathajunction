"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight, Sparkles, Check, MailCheck } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const { signup, user } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailConfirmation, setEmailConfirmation] = useState(false)

  // Redirect if already logged in
  if (user) {
    router.push("/profile")
    return null
  }

  // Email confirmation screen
  if (emailConfirmation) {
    return (
      <main className="min-h-screen bg-[#FFFDF2]">
        <Navbar />
        <section className="pt-32 pb-24">
          <div className="mx-auto max-w-md px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-white border border-black/8 shadow-3d p-8 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8A960] to-transparent" />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C8A960]/15 mx-auto mb-6"
              >
                <MailCheck className="h-10 w-10 text-[#C8A960]" />
              </motion.div>

              <h2 className="text-2xl font-bold text-black font-[family-name:var(--font-playfair)] mb-3">
                Check Your Email
              </h2>
              <p className="text-sm text-muted-foreground font-[family-name:var(--font-poppins)] mb-2">
                We&apos;ve sent a verification link to
              </p>
              <p className="text-sm font-semibold text-black font-[family-name:var(--font-poppins)] mb-6">
                {formData.email}
              </p>
              <p className="text-xs text-muted-foreground font-[family-name:var(--font-poppins)] mb-8">
                Click the link in the email to verify your account, then come back and sign in.
              </p>
              <Link href="/login">
                <Button className="w-full rounded-xl h-12 bg-black text-[#FFFDF2] hover:bg-black/90 font-[family-name:var(--font-poppins)] font-semibold">
                  Go to Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.name.trim()) {
      setError("Please enter your full name")
      return
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)

    const result = await signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    })

    if (result.success) {
      if (result.emailConfirmation) {
        setEmailConfirmation(true)
      } else {
        router.push("/profile")
      }
    } else {
      setError(result.error || "Signup failed")
    }

    setIsSubmitting(false)
  }

  const benefits = [
    "Personalized meal subscriptions",
    "Track your orders easily",
    "Quick WhatsApp ordering",
    "Exclusive member offers",
  ]

  return (
    <main className="min-h-screen bg-[#FFFDF2]">
      <Navbar />

      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Benefits */}
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
                      Join Paratha Junction
                    </span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight font-[family-name:var(--font-playfair)]">
                    Your Journey to{" "}
                    <span className="gradient-text italic">Homely Meals</span>{" "}
                    Starts Here
                  </h1>

                  <p className="text-lg text-muted-foreground font-[family-name:var(--font-poppins)] leading-relaxed max-w-md">
                    Create your account and unlock a world of fresh, hygienic meals delivered to your doorstep every day.
                  </p>

                  <div className="space-y-4 pt-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C8A960]/15">
                          <Check className="h-4 w-4 text-[#C8A960]" />
                        </div>
                        <span className="text-sm font-medium text-black/70 font-[family-name:var(--font-poppins)]">
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="inline-flex items-center gap-4 rounded-2xl bg-black px-6 py-4 gold-glow"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8A960] text-black font-bold font-[family-name:var(--font-playfair)] text-lg">
                      ₹80
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#FFFDF2] font-[family-name:var(--font-poppins)]">Starting at just ₹80/meal</p>
                      <p className="text-xs text-[#FFFDF2]/60 font-[family-name:var(--font-poppins)]">500+ happy customers in Nagpur</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rounded-3xl bg-white border border-black/8 shadow-3d p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8A960] to-transparent" />

                <div className="lg:hidden mb-6 text-center">
                  <h1 className="text-2xl font-bold text-black font-[family-name:var(--font-playfair)]">
                    Create Your Account
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1 font-[family-name:var(--font-poppins)]">
                    Join the Paratha Junction family
                  </p>
                </div>

                <div className="hidden lg:block mb-8">
                  <h2 className="text-2xl font-bold text-black font-[family-name:var(--font-playfair)]">
                    Create Account
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 font-[family-name:var(--font-poppins)]">
                    Fill in your details to get started
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
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black/70 font-[family-name:var(--font-poppins)]">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-black/10 bg-[#FFFDF2] pl-11 pr-4 py-3.5 text-sm text-black placeholder:text-muted-foreground/60 outline-none focus:border-[#C8A960] focus:ring-2 focus:ring-[#C8A960]/20 transition-all font-[family-name:var(--font-poppins)]"
                        id="signup-name"
                      />
                    </div>
                  </div>

                  {/* Email */}
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
                        id="signup-email"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black/70 font-[family-name:var(--font-poppins)]">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        maxLength={10}
                        className="w-full rounded-xl border border-black/10 bg-[#FFFDF2] pl-11 pr-4 py-3.5 text-sm text-black placeholder:text-muted-foreground/60 outline-none focus:border-[#C8A960] focus:ring-2 focus:ring-[#C8A960]/20 transition-all font-[family-name:var(--font-poppins)]"
                        id="signup-phone"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black/70 font-[family-name:var(--font-poppins)]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password (min 6 characters)"
                        className="w-full rounded-xl border border-black/10 bg-[#FFFDF2] pl-11 pr-12 py-3.5 text-sm text-black placeholder:text-muted-foreground/60 outline-none focus:border-[#C8A960] focus:ring-2 focus:ring-[#C8A960]/20 transition-all font-[family-name:var(--font-poppins)]"
                        id="signup-password"
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

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-black/70 font-[family-name:var(--font-poppins)]">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="w-full rounded-xl border border-black/10 bg-[#FFFDF2] pl-11 pr-12 py-3.5 text-sm text-black placeholder:text-muted-foreground/60 outline-none focus:border-[#C8A960] focus:ring-2 focus:ring-[#C8A960]/20 transition-all font-[family-name:var(--font-poppins)]"
                        id="signup-confirm-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl h-13 text-base bg-black text-[#FFFDF2] hover:bg-black/90 shadow-lg shadow-black/10 transition-all group font-[family-name:var(--font-poppins)] font-semibold disabled:opacity-60"
                    id="signup-submit"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-5 w-5 border-2 border-[#FFFDF2]/30 border-t-[#FFFDF2] rounded-full"
                      />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="my-6 flex items-center gap-4">
                  <div className="flex-1 h-px bg-black/8" />
                  <span className="text-xs text-muted-foreground font-[family-name:var(--font-poppins)]">Already have an account?</span>
                  <div className="flex-1 h-px bg-black/8" />
                </div>

                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl h-12 border-black/10 text-black hover:bg-black hover:text-[#FFFDF2] transition-all font-[family-name:var(--font-poppins)] font-semibold"
                    id="goto-login"
                  >
                    Sign In Instead
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
