"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Instagram,
  Twitter,
  Mail,
  ChevronDown,
  MapPin,
  ArrowRight,
} from "lucide-react";

// --- Mock Data ---
const PORTFOLIO_IMAGES = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Neon",
    title: "Shinjuku Nights",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Nature",
    title: "Mount Fuji",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Architecture",
    title: "Tokyo Tower",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/2389171/pexels-photo-2389171.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Street",
    title: "Rainy Shibuya",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/581299/pexels-photo-581299.jpeg",
    category: "Tradition",
    title: "Kyoto Streets",
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/2758567/pexels-photo-2758567.jpeg",
    category: "Lifestyle",
    title: "Omotesando Cafe",
  },
];

const SERVICES = [
  {
    id: 1,
    title: "Portrait Photography",
    content:
      "Professional headshots, lifestyle portraits, and creative editorial shoots designed to capture your unique personality. Includes 2 hours of shooting and 15 edited high-res images.",
  },
  {
    id: 2,
    title: "Event Coverage",
    content:
      "From intimate weddings to corporate gatherings. We document the candid moments and the big atmosphere. Packages start at 4 hours of coverage.",
  },
  {
    id: 3,
    title: "Commercial & Branding",
    content:
      "Elevate your brand with high-quality product photography and visual storytelling. Perfect for e-commerce, social media content, and lookbooks.",
  },
  {
    id: 4,
    title: "Street Photography Workshops",
    content:
      "Join me for a guided photo walk through the neon-lit streets of Shinjuku or the quiet alleys of Kyoto. Learn composition, lighting, and how to capture the 'decisive moment' in an urban setting. 3-hour sessions available.",
  },
  {
    id: 5,
    title: "Analog & Film Sessions",
    content:
      "Experience the timeless quality of film. I shoot with medium format (120mm) and 35mm cameras to give your photos a nostalgic, grainy, and authentic aesthetic that digital simply cannot replicate.",
  },
  {
    id: 6,
    title: "Fine Art Prints",
    content:
      "Bring the beauty of Japan into your home. Museum-quality Giclée prints of my landscape and street work are available in various sizes, framed or unframed, with international shipping.",
  },
  {
    id: 7,
    title: "Drone & Aerial",
    content:
      "Capture the scale of your location from the sky. Fully licensed drone operation for real estate, travel videography, or unique perspectives on outdoor events.",
  },
];
// --- Components ---

const AccordionItem = ({
  item,
  isOpen,
  onClick,
}: {
  item: (typeof SERVICES)[0];
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-neutral-800">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={onClick}
      >
        <span
          className={`text-xl font-medium transition-colors ${
            isOpen
              ? "text-white"
              : "text-neutral-400 group-hover:text-neutral-200"
          }`}
        >
          {item.title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-neutral-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-neutral-400 leading-relaxed">
              {item.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
import { X, ChevronLeft, ChevronRight } from "lucide-react"; // Make sure to update your imports
import BeforeAfterComparison from "./BeforeAfterComparison";

const Lightbox = ({
  images,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: typeof PORTFOLIO_IMAGES;
  selectedIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  // Handle Keyboard Navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (selectedIndex === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center"
    >
      {/* Controls */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-neutral-800 rounded-full hover:bg-neutral-700 text-white z-50"
      >
        <X className="w-6 h-6" />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-4 md:left-8 p-3 bg-neutral-800/50 hover:bg-neutral-800 rounded-full text-white z-50 transition-colors"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 md:right-8 p-3 bg-neutral-800/50 hover:bg-neutral-800 rounded-full text-white z-50 transition-colors"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Main Image */}
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] p-4 flex items-center justify-center">
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[selectedIndex].src}
            alt={images[selectedIndex].title}
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Caption */}
        <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
          <p className="inline-block bg-black/60 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
            {images[selectedIndex].title} —{" "}
            <span className="text-neutral-400">
              {images[selectedIndex].category}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- NEW STATE FOR LIGHTBOX ---
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // --- NEW HANDLERS FOR LIGHTBOX ---
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % PORTFOLIO_IMAGES.length : null
    );
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + PORTFOLIO_IMAGES.length) % PORTFOLIO_IMAGES.length
        : null
    );
  //   const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  //   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  //   const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully!", {
      description: "I'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  // --- SCROLL EFFECTS LOGIC ---
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle Navbar Background transparency
      setIsScrolled(window.scrollY > 50);

      // 2. Handle Active Link Highlighting (Spy)
      const sections = ["gallery", "about", "services", "contact"];
      
      // Find which section is currently most visible in the viewport
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Active if top of section is within upper 1/3 of viewport
          return rect.top >= 0 && rect.top <= 300; 
        }
        return false;
      });

      // Fallback: If no section matches (e.g., we are deep inside a section),
      // find the one that covers the middle of the screen
      if (!current) {
         for (const section of sections) {
           const element = document.getElementById(section);
           if (element) {
             const rect = element.getBoundingClientRect();
             if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
               setActiveSection(section);
               return;
             }
           }
         }
      } else {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Scroll Helper
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-neutral-700 selection:text-white">
      <Toaster position="bottom-right" theme="dark" />
      {/* --- ADD LIGHTBOX HERE --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={PORTFOLIO_IMAGES}
            selectedIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-neutral-950/80 backdrop-blur-md border-white/5 py-0" 
            : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Camera className="w-6 h-6" />
            <span>LUMOS</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
            {["gallery", "about", "services", "contact"].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                onClick={(e) => scrollToSection(e, item)}
                className={`transition-colors capitalize relative hover:text-white ${
                  activeSection === item ? "text-white" : ""
                }`}
              >
                {item === "gallery" ? "Work" : item}
                {/* Active Indicator Dot */}
                {activeSection === item && (
                  <motion.div 
                    layoutId="active-dot"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white rounded-full" 
                  />
                )}
              </a>
            ))}
          </div>
          
          <a 
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors"
          >
            Book Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Hero Background"
            fill
            className="object-cover opacity-40 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter mb-6"
          >
            Capturing the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 to-neutral-500">
              Unspoken Moments
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10"
          >
            Professional photography focusing on raw emotions, architectural
            symmetry, and the beautiful chaos of daily life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 border-b border-white pb-1 hover:text-neutral-300 transition-colors"
            >
              View Selected Works <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Selected Works</h2>
            <p className="text-neutral-500">
              A curation of my recent projects. Click to view.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openLightbox(index)} // <--- Add Click Handler
              className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-900 cursor-pointer" // <--- Add cursor-pointer
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  {img.category}
                </span>
                <h3 className="text-xl font-bold">{img.title}</h3>
                <p className="text-xs text-neutral-400 mt-2 flex items-center gap-1">
                  View Full <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-[3/4] rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
            <Image
              src="https://images.pexels.com/photos/29816418/pexels-photo-29816418.jpeg"
              alt="Photographer Portrait"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-neutral-500 font-medium tracking-widest text-sm uppercase mb-4 block">
              The Photographer
            </span>
            <h2 className="text-4xl font-bold mb-8 leading-tight">
              Hi, I'm Alex. <br />I see the world in{" "}
              <span className="text-neutral-400">light and shadow.</span>
            </h2>
            <div className="space-y-6 text-neutral-400 text-lg leading-relaxed">
              <p>
                My journey began ten years ago when I picked up my grandfather's
                old film camera. What started as a hobby quickly turned into an
                obsession with capturing the fleeting moments that define our
                lives.
              </p>
              <p>
                Based in Tokyo but available worldwide, I specialize in finding
                beauty in the mundane. Whether it's the chaotic energy of a
                street market or the quiet intimacy of a bridal suite, I
                approach every shoot with a documentary mindset.
              </p>
              <p>
                I believe a great photograph shouldn't just be seen; it should
                be felt.
              </p>
            </div>

            <div className="mt-10 flex gap-6">
              <a
                href="#"
                className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-900/30 border-y border-white/5">
        <BeforeAfterComparison />
      </section>

      {/* Services Accordion */}
      <section id="services" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Services & Pricing</h2>
          <p className="text-neutral-400">
            Transparent packages for your needs.
          </p>
        </div>

        <div className="border-t border-neutral-800">
          {SERVICES.map((service, index) => (
            <AccordionItem
              key={service.id}
              item={service}
              isOpen={activeAccordion === index}
              onClick={() =>
                setActiveAccordion(index === activeAccordion ? null : index)
              }
            />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 bg-neutral-900 rounded-2xl p-8 md:p-12 border border-white/5 overflow-hidden">
          {/* Left Side: Contact Info & Map */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Let's Create Something Together
              </h2>
              <p className="text-neutral-400 mb-8">
                Have a project in mind? Fill out the form, and I'll get back to
                you as soon as possible.
              </p>

              <div className="space-y-6 text-neutral-300 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center border border-white/5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <p className="font-medium hover:text-white transition-colors">
                      <a href="mailto:alex@lumos-studio.com">
                        alex@lumos-studio.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center border border-white/5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Studio</p>
                    <p className="font-medium">
                      Daikanyama, Shibuya City, Tokyo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* The Map Component */}
            <LocationMap />
          </div>

          {/* Right Side: Form */}
          <div className="bg-neutral-950/50 p-6 rounded-xl border border-white/5 h-fit">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-400 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-700 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-400 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-700 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-400 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-neutral-700 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold py-3.5 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-neutral-600 text-sm border-t border-white/5">
        <p>
          © {new Date().getFullYear()} Lumos Photography. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

const LocationMap = () => {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden relative border border-white/10 z-0">
      {/* Overlay to ensure the map isn't too bright and fits the theme */}
      <div className="absolute inset-0 bg-neutral-950/20 pointer-events-none z-10" />

      <iframe
        width="100%"
        height="100%"
        title="Studio Location"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        // We use CSS filters to invert the map colors, creating a "Dark Mode" effect
        style={{ filter: "grayscale(100%) invert(92%) contrast(83%)" }}
        src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Daikanyama%20T-Site%20Tokyo+(Lumos%20Studio)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
      ></iframe>

      {/* Custom Marker Overlay (Optional - for visual flair) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] z-20 pointer-events-none">
        <div className="relative">
          <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse" />
          <div className="absolute -inset-2 bg-white/20 rounded-full animate-ping" />
        </div>
      </div>
    </div>
  );
};
