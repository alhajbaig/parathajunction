import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import { HeroSection } from "@/components/home/hero-section"
import { TrustSection } from "@/components/home/trust-section"
import { FeaturesSection } from "@/components/home/features-section"
import { DeliverySection } from "@/components/home/delivery-section"
import { GallerySection } from "@/components/home/gallery-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FFFDF2]">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <DeliverySection />
      <GallerySection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <Chatbot />
    </main>
  )
}
