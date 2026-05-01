"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Check, Sparkles, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Basic Plan",
    price: "₹120",
    period: "per meal",
    description: "Perfect for trying us out",
    features: ["One-time order", "Lunch OR Dinner", "Fresh homely food", "Standard packaging"],
    popular: false,
  },
  {
    name: "Smart Subscription",
    price: "₹2,400",
    period: "per month",
    pricePerMeal: "₹80/meal",
    description: "Most popular choice",
    features: ["Lunch OR Dinner daily", "30 days subscription", "Save ₹40 per meal", "Priority delivery", "5-Box insulated tiffin"],
    popular: true,
  },
  {
    name: "Premium Plan",
    price: "₹4,800",
    period: "per month",
    pricePerMeal: "₹80/meal",
    description: "Maximum value & convenience",
    features: ["Lunch + Dinner daily", "60 meals per month", "Maximum savings", "Priority support", "5-Box insulated tiffin", "Sunday special tiffin"],
    popular: false,
    badge: "Best Value",
  },
]

export function CTASection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden grain">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(200,169,96,0.04)_0%,transparent_70%)]" />
      </div>

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
            Choose Your Plan
          </span>
          <h2 className="text-3xl font-bold text-black sm:text-4xl lg:text-5xl text-balance font-[family-name:var(--font-playfair)]">
            Start Your{" "}
            <span className="gradient-text italic">Tiffin Journey</span>{" "}Today
          </h2>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty font-[family-name:var(--font-poppins)]">
            Bas ₹80 mein — Students aur bachelors ke liye best tiffin!
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid gap-6 lg:grid-cols-3 perspective-container">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.03, rotateY: plan.popular ? 0 : (index === 0 ? 5 : -5) }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`relative h-full rounded-3xl p-7 lg:p-8 transition-all duration-300 ${
                  plan.popular
                    ? "bg-black text-[#FFFDF2] shadow-2xl shadow-black/20 border border-[#C8A960]/30 gold-glow"
                    : "bg-white border border-black/8 shadow-3d hover:border-[#C8A960]/20"
                }`}
              >
                {/* Badges */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C8A960] px-5 py-1.5 text-xs font-bold text-black shadow-lg shadow-[#C8A960]/30 font-[family-name:var(--font-poppins)] uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5" />
                      Most Popular
                    </span>
                  </div>
                )}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C8A960] px-5 py-1.5 text-xs font-bold text-black shadow-lg font-[family-name:var(--font-poppins)] uppercase tracking-wider">
                      <Crown className="h-3.5 w-3.5" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className={`text-xl font-semibold mb-2 font-[family-name:var(--font-playfair)] ${plan.popular ? "text-[#FFFDF2]" : "text-black"}`}>
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-5">
                  <span className={`text-4xl font-bold font-[family-name:var(--font-playfair)] ${plan.popular ? "text-[#C8A960]" : "text-black"}`}>{plan.price}</span>
                  <span className={`text-sm ml-2 font-[family-name:var(--font-poppins)] ${plan.popular ? "text-[#FFFDF2]/60" : "text-muted-foreground"}`}>
                    {plan.period}
                  </span>
                  {plan.pricePerMeal && (
                    <p className={`text-sm mt-1 font-[family-name:var(--font-poppins)] ${plan.popular ? "text-[#C8A960]/80" : "text-[#C8A960]"}`}>
                      ({plan.pricePerMeal})
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className={`text-sm mb-6 font-[family-name:var(--font-poppins)] ${plan.popular ? "text-[#FFFDF2]/60" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>

                {/* Divider */}
                <div className={`mb-6 ${plan.popular ? "elegant-divider" : "h-px bg-black/8"}`} />

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-[family-name:var(--font-poppins)]">
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full shrink-0 ${plan.popular ? "bg-[#C8A960]/20 text-[#C8A960]" : "bg-black/5 text-[#C8A960]"}`}>
                        <Check className="h-3 w-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  className={`w-full rounded-full h-12 font-[family-name:var(--font-poppins)] font-semibold ${
                    plan.popular
                      ? "bg-[#C8A960] text-black hover:bg-[#D4C494]"
                      : "bg-black text-[#FFFDF2] hover:bg-black/90"
                  }`}
                  size="lg"
                >
                  <Link href="/plans">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="elegant-divider max-w-xs mx-auto mb-6" />
          <p className="text-sm text-muted-foreground font-[family-name:var(--font-poppins)]">
            No hidden charges • Cancel anytime • 100% satisfaction guaranteed
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2 font-[family-name:var(--font-poppins)]">
            Available on Swiggy & Zomato • FSSAI LIC: 21525077800455
          </p>
        </motion.div>
      </div>
    </section>
  )
}
