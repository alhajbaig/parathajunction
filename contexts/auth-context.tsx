"use client"

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react"
import { supabase } from "@/lib/supabase"

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  subscription_status: string
  created_at: string
}

interface AuthContextType {
  user: UserProfile | null
  isLoading: boolean
  signup: (data: {
    name: string
    email: string
    phone: string
    password: string
  }) => Promise<{ success: boolean; error?: string; emailConfirmation?: boolean }>
  login: (data: {
    email: string
    password: string
  }) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
  updateAddress: (address: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch profile data from Supabase profiles table
  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (data && !error) {
      setUser({
        id: data.id,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        subscription_status: data.subscription_status || "inactive",
        created_at: data.created_at,
      })
      return true
    }
    return false
  }, [])

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user && mounted) {
          await fetchProfile(session.user.id)
        }
      } catch (e) {
        console.error("Auth init error:", e)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    initAuth()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      if (event === "SIGNED_IN" && session?.user) {
        // Small delay to let the trigger create the profile
        await new Promise((r) => setTimeout(r, 300))
        await fetchProfile(session.user.id)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  // Sign up a new user
  const signup = async (data: {
    name: string
    email: string
    phone: string
    password: string
  }): Promise<{ success: boolean; error?: string; emailConfirmation?: boolean }> => {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            phone: data.phone,
          },
        },
      })

      if (error) {
        // Handle specific Supabase error messages
        if (error.message.includes("already registered")) {
          return { success: false, error: "An account with this email already exists. Please sign in." }
        }
        return { success: false, error: error.message }
      }

      // If user exists but no session → email confirmation required
      if (authData.user && !authData.session) {
        return { success: true, emailConfirmation: true }
      }

      // Session exists → user is fully authenticated
      if (authData.session?.user) {
        // Wait for the database trigger to create the profile
        await new Promise((r) => setTimeout(r, 800))
        await fetchProfile(authData.session.user.id)
      }

      return { success: true }
    } catch (e: any) {
      return { success: false, error: e?.message || "Something went wrong. Please try again." }
    }
  }

  // Sign in an existing user
  const login = async (data: {
    email: string
    password: string
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        if (error.message.includes("Invalid login")) {
          return { success: false, error: "Invalid email or password. Please try again." }
        }
        if (error.message.includes("Email not confirmed")) {
          return { success: false, error: "Please verify your email before signing in. Check your inbox." }
        }
        return { success: false, error: error.message }
      }

      if (authData.session?.user) {
        await fetchProfile(authData.session.user.id)
      }

      return { success: true }
    } catch (e: any) {
      return { success: false, error: e?.message || "Something went wrong. Please try again." }
    }
  }

  // Sign out
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  // Update profile fields
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return

    const { error } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", user.id)

    if (!error) {
      setUser((prev) => (prev ? { ...prev, ...data } : null))
    }
  }

  // Update delivery address
  const updateAddress = async (address: string) => {
    await updateProfile({ address })
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signup, login, logout, updateProfile, updateAddress }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
