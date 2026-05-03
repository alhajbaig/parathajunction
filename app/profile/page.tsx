"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import {
  User, Mail, Phone, MapPin, Calendar, Edit3, LogOut, ArrowRight,
  Sparkles, Crown, CheckCircle2, Save, X, ChefHat, Clock
} from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading, logout, updateProfile, updateAddress } = useAuth()
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [addressInput, setAddressInput] = useState("")
  const [editName, setEditName] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user) {
      setAddressInput(user.address || "")
      setEditName(user.name)
      setEditPhone(user.phone)
    }
  }, [user])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FFFDF2] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 border-2 border-black/20 border-t-[#C8A960] rounded-full"
        />
      </main>
    )
  }

  if (!user) return null

  const handleSaveAddress = async () => {
    if (addressInput.trim()) {
      setIsSaving(true)
      await updateAddress(addressInput.trim())
      setIsSaving(false)
      setIsEditingAddress(false)
    }
  }

  const handleSaveProfile = async () => {
    if (editName.trim() && editPhone.trim()) {
      setIsSaving(true)
      await updateProfile({ name: editName.trim(), phone: editPhone.trim() })
      setIsSaving(false)
      setIsEditingProfile(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const memberSince = new Date(user.created_at).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  })

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const isSubscriptionActive = user.subscription_status === "active"

  return (
    <main className="min-h-screen bg-[#FFFDF2]">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-24 pb-4 lg:pt-32 lg:pb-8 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute right-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.06)_0%,transparent_70%)]" />
          <div className="absolute bottom-0 left-[-10%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.04)_0%,transparent_70%)]" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-5 py-2 text-sm font-medium text-black border border-black/8 font-[family-name:var(--font-poppins)] mb-5">
              <Crown className="h-4 w-4 text-[#C8A960]" />
              Member Profile
            </span>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:gap-8">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white border border-black/8 shadow-3d overflow-hidden"
            >
              {/* Profile Header with gradient */}
              <div className="relative bg-black px-8 py-10 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.4)_0%,transparent_70%)]" />
                  <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.3)_0%,transparent_70%)]" />
                </div>

                <div className="relative flex flex-col sm:flex-row items-center gap-6">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="relative"
                  >
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#C8A960] to-[#E8D5A0] flex items-center justify-center text-3xl font-bold text-black font-[family-name:var(--font-playfair)] shadow-xl shadow-[#C8A960]/30">
                      {initials || "U"}
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-green-500 border-3 border-black flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </motion.div>

                  {/* User Info */}
                  <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-[#FFFDF2] font-[family-name:var(--font-playfair)]">
                      {user.name}
                    </h1>
                    <p className="text-[#FFFDF2]/60 text-sm mt-1 font-[family-name:var(--font-poppins)]">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-2 mt-3 justify-center sm:justify-start">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C8A960]/20 px-3 py-1 text-xs font-medium text-[#C8A960] font-[family-name:var(--font-poppins)]">
                        <Sparkles className="h-3 w-3" />
                        Member since {memberSince}
                      </span>
                    </div>
                  </div>

                  {/* Edit & Logout */}
                  <div className="sm:ml-auto flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="rounded-full bg-transparent border-[#FFFDF2]/20 text-[#FFFDF2] hover:bg-[#FFFDF2]/10 font-[family-name:var(--font-poppins)]"
                    >
                      <Edit3 className="h-3.5 w-3.5 mr-1.5" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowLogoutConfirm(true)}
                      className="rounded-full bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/10 font-[family-name:var(--font-poppins)]"
                    >
                      <LogOut className="h-3.5 w-3.5 mr-1.5" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>

              {/* Edit Profile Form */}
              <AnimatePresence>
                {isEditingProfile && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-b border-black/8"
                  >
                    <div className="p-6 bg-[#F5F0E1]/50 space-y-4">
                      <h3 className="text-sm font-semibold text-black font-[family-name:var(--font-poppins)]">Edit Profile</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-black/60 font-[family-name:var(--font-poppins)]">Full Name</label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none focus:border-[#C8A960] focus:ring-2 focus:ring-[#C8A960]/20 transition-all font-[family-name:var(--font-poppins)]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-black/60 font-[family-name:var(--font-poppins)]">Phone Number</label>
                          <input
                            type="tel"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            maxLength={10}
                            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none focus:border-[#C8A960] focus:ring-2 focus:ring-[#C8A960]/20 transition-all font-[family-name:var(--font-poppins)]"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditingProfile(false)}
                          className="rounded-full font-[family-name:var(--font-poppins)]"
                        >
                          <X className="h-3.5 w-3.5 mr-1" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="rounded-full bg-black text-[#FFFDF2] hover:bg-black/90 font-[family-name:var(--font-poppins)]"
                        >
                          {isSaving ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="h-4 w-4 border-2 border-[#FFFDF2]/30 border-t-[#FFFDF2] rounded-full mr-1"
                            />
                          ) : (
                            <Save className="h-3.5 w-3.5 mr-1" />
                          )}
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Details Grid */}
              <div className="p-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 rounded-2xl bg-[#FFFDF2] border border-black/5 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/5 shrink-0">
                      <Phone className="h-5 w-5 text-[#C8A960]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-poppins)]">Phone</p>
                      <p className="text-sm font-semibold text-black mt-0.5 font-[family-name:var(--font-poppins)]">{user.phone || "Not set"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl bg-[#FFFDF2] border border-black/5 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/5 shrink-0">
                      <Mail className="h-5 w-5 text-[#C8A960]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-poppins)]">Email</p>
                      <p className="text-sm font-semibold text-black mt-0.5 font-[family-name:var(--font-poppins)] break-all">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl bg-[#FFFDF2] border border-black/5 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/5 shrink-0">
                      <Calendar className="h-5 w-5 text-[#C8A960]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-poppins)]">Joined</p>
                      <p className="text-sm font-semibold text-black mt-0.5 font-[family-name:var(--font-poppins)]">{memberSince}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl bg-[#FFFDF2] border border-black/5 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/5 shrink-0">
                      <ChefHat className="h-5 w-5 text-[#C8A960]" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-[family-name:var(--font-poppins)]">Subscription</p>
                      <p className={`text-sm font-semibold mt-0.5 font-[family-name:var(--font-poppins)] ${isSubscriptionActive ? "text-green-600" : "text-amber-600"}`}>
                        {isSubscriptionActive ? "Active Subscriber" : "No Active Plan"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl bg-white border border-black/8 shadow-3d p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C8A960]/15">
                    <MapPin className="h-5 w-5 text-[#C8A960]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black font-[family-name:var(--font-playfair)]">Delivery Address</h3>
                    <p className="text-xs text-muted-foreground font-[family-name:var(--font-poppins)]">Where we deliver your meals</p>
                  </div>
                </div>
                {!isEditingAddress && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingAddress(true)}
                    className="rounded-full border-black/10 font-[family-name:var(--font-poppins)]"
                  >
                    <Edit3 className="h-3.5 w-3.5 mr-1.5" />
                    {user.address ? "Edit" : "Add Address"}
                  </Button>
                )}
              </div>

              {isEditingAddress ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <textarea
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="Enter your full delivery address (e.g., Flat 301, Sunshine Apt, Sadar, Nagpur - 440001)"
                    rows={3}
                    className="w-full rounded-xl border border-black/10 bg-[#FFFDF2] px-4 py-3 text-sm text-black placeholder:text-muted-foreground/60 outline-none focus:border-[#C8A960] focus:ring-2 focus:ring-[#C8A960]/20 transition-all font-[family-name:var(--font-poppins)] resize-none"
                    id="profile-address"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditingAddress(false)
                        setAddressInput(user.address || "")
                      }}
                      className="rounded-full font-[family-name:var(--font-poppins)]"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveAddress}
                      disabled={isSaving}
                      className="rounded-full bg-black text-[#FFFDF2] hover:bg-black/90 font-[family-name:var(--font-poppins)]"
                    >
                      {isSaving ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 border-2 border-[#FFFDF2]/30 border-t-[#FFFDF2] rounded-full mr-1"
                        />
                      ) : (
                        <Save className="h-3.5 w-3.5 mr-1" />
                      )}
                      Save Address
                    </Button>
                  </div>
                </motion.div>
              ) : user.address ? (
                <div className="rounded-2xl bg-[#FFFDF2] border border-black/5 p-5">
                  <p className="text-sm text-black font-[family-name:var(--font-poppins)] leading-relaxed">{user.address}</p>
                </div>
              ) : (
                <div className="rounded-2xl bg-[#F5F0E1]/50 border border-dashed border-[#C8A960]/30 p-8 text-center">
                  <MapPin className="h-8 w-8 text-[#C8A960]/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground font-[family-name:var(--font-poppins)]">
                    No delivery address added yet
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1 font-[family-name:var(--font-poppins)]">
                    Add your address to subscribe for meal plans
                  </p>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              <Link href="/plans">
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-2xl bg-black p-6 text-[#FFFDF2] shadow-xl shadow-black/15 gold-glow cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8A960]/20">
                      <ChefHat className="h-6 w-6 text-[#C8A960]" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#C8A960] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-semibold font-[family-name:var(--font-playfair)]">Subscribe for Meals</h3>
                  <p className="text-sm text-[#FFFDF2]/60 mt-1 font-[family-name:var(--font-poppins)]">
                    Browse plans starting at ₹80/meal
                  </p>
                </motion.div>
              </Link>

              <Link href="/menu">
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-2xl bg-white border border-black/8 p-6 shadow-3d cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8A960]/15">
                      <Clock className="h-6 w-6 text-[#C8A960]" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-black/30 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-semibold text-black font-[family-name:var(--font-playfair)]">View Today&apos;s Menu</h3>
                  <p className="text-sm text-muted-foreground mt-1 font-[family-name:var(--font-poppins)]">
                    Check what&apos;s cooking today
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6"
            >
              <h3 className="text-lg font-bold text-black font-[family-name:var(--font-playfair)] mb-2">Log Out?</h3>
              <p className="text-sm text-muted-foreground font-[family-name:var(--font-poppins)] mb-6">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 rounded-xl font-[family-name:var(--font-poppins)]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleLogout}
                  className="flex-1 rounded-xl bg-red-500 text-white hover:bg-red-600 font-[family-name:var(--font-poppins)]"
                >
                  Log Out
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
      <Chatbot />
    </main>
  )
}
