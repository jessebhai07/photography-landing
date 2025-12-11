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
  Menu,
  X,
} from "lucide-react";

// --- Mock Data (unchanged) ---
const PORTFOLIO_IMAGES = [/* ... your images ... */];
const SERVICES = [/* ... your services ... */];

// --- Fixed & Improved Lightbox ---
const Lightbox = ({
  images,
  selectedIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: typeof PORTFOLIO_IMAGES;
  selectedIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "unset";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-neutral-800/80 backdrop-blur rounded-full hover:bg-neutral-700 text-white z-50 transition"
      >
        <X className="w-7 h-7" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-6 p-4 bg-neutral-800/60 backdrop-blur hover:bg-neutral-700 rounded-full text-white z-50 transition"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-6 p-4 bg-neutral-800/60 backdrop-blur hover:bg-neutral-700 rounded-full text-white z-50 transition"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="relative w-full h-full max-w-7xl max-h-[94vh] p-8 flex items-center justify-center">
        <motion.div
          key={selectedIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[selectedIndex].src}
            alt={images[selectedIndex].title}
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-lg px-4 py-3 px-6 rounded-full text-white">
          <p className="text-lg font-medium">
            {images[selectedIndex].title}
            <span className="text-neutral-400 ml-2">— {images[selectedIndex].category}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Pro Navbar Component ---


// --- Main Component ---
export default function Portfolio() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("gallery");
  const [isScrolled, setIsScrolled] = useState(false);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => setLightboxIndex((i) => (i !== null ? (i + 1) % PORTFOLIO_IMAGES.length : null));
  const prevImage = () => setLightboxIndex((i) => (i !== null ? (i - 1 + PORTFOLIO_IMAGES.length) % PORTFOLIO_IMAGES.length : null));

  // Scroll spy + navbar blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["gallery", "about", "services", "contact"];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent!", { description: "I'll reply soon." });
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      <Toaster position="bottom-right" theme="dark" />

      {/* Fixed Pro Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Lightbox */}


      {/* Rest of your sections (Hero, Gallery, About, etc.) */}
      {/* ... keep all your existing sections unchanged ... */}

      {/* Just make sure in Gallery you have: */}
      {/* onClick={() => openLightbox(index)} */}
      {/* and cursor-pointer */}

      {/* Footer etc. */}
    </div>
  );
}