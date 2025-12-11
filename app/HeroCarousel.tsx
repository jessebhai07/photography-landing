import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ArrowRight,
} from "lucide-react";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Curated Pexels images with beautiful gradients and photographer-themed text
  const slides = [
    {
      id: 1,
      imageUrl:
        "https://images.pexels.com/photos/35125655/pexels-photo-35125655.jpeg",
      title: "Portraits That Speak",
      description:
        "Capturing the soul behind the eyes, where vulnerability meets strength.",
      gradient: "from-purple-900/70 via-violet-800/40 to-transparent",
      textColor: "text-white",
    },
    {
      id: 2,
      imageUrl:
        "https://images.pexels.com/photos/1510595/pexels-photo-1510595.jpeg",
      title: "Urban Geometry",
      description:
        "Finding perfect symmetry in the architectural chaos of cityscapes.",
      gradient: "from-amber-900/60 via-orange-800/30 to-transparent",
      textColor: "text-amber-50",
    },
    {
      id: 3,
      imageUrl:
        "https://images.pexels.com/photos/35100543/pexels-photo-35100543.jpeg",
      title: "Golden Hour Magic",
      description:
        "When sunlight paints the world in warmth and everything feels possible.",
      gradient: "from-rose-900/70 via-pink-800/40 to-transparent",
      textColor: "text-rose-50",
    },
    {
      id: 4,
      imageUrl:
        "https://images.pexels.com/photos/2187673/pexels-photo-2187673.jpeg",
      title: "Silent Landscapes",
      description: "Where nature's quiet moments speak louder than words.",
      gradient: "from-emerald-900/60 via-teal-800/30 to-transparent",
      textColor: "text-emerald-50",
    },
    {
      id: 5,
      imageUrl:
        "https://images.pexels.com/photos/1633791/pexels-photo-1633791.jpeg",
      title: "Intimate Moments",
      description: "The unspoken connections that define our human experience.",
      gradient: "from-indigo-900/70 via-blue-800/40 to-transparent",
      textColor: "text-blue-50",
    },
    {
      id: 6,
      imageUrl:
        "https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg",
      title: "The Art of Seeing",
      description:
        "Every camera is a portal to a unique perspective waiting to be discovered.",
      gradient: "from-slate-900/60 via-gray-800/30 to-transparent",
      textColor: "text-neutral-50",
    },
  ];

  // Preload images for smooth transitions
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = slides.map((slide) => {
        return new Promise((resolve, reject) => {
            const img = document.createElement('img'); // Create an img element instead
          img.src = slide.imageUrl;
          img.onload = () => resolve(slide.id);
          img.onerror = () =>
            reject(new Error(`Failed to load image: ${slide.imageUrl}`));
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.warn(
          "Some images failed to preload, continuing anyway:",
          error
        );
        setIsLoading(false);
      }
    };

    preloadImages();
  }, [slides]);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPlaying || isLoading) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, isLoading, slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide, isPlaying]);

  if (isLoading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-white/60 text-lg">Loading visual stories...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Fixed Image Container */}
          <div className="absolute inset-0">
            {/* Use Next.js Image component with proper configuration */}
            <Image
              src={slides[currentSlide].imageUrl}
              alt={slides[currentSlide].title}
              fill
              priority={currentSlide === 0}
              quality={100}
              sizes="100vw"
              className="object-cover"
              unoptimized={true} // Set to true for external images if you're having issues
            />
            {/* <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient}`} /> */}
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 backdro" />
          </div>

          {/* Parallax Effect Container */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 29,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl w-full">
          {/* Title with character-by-character animation */}
          <div className="mb-8 overflow-hidden">
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
              className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 ${slides[currentSlide].textColor}`}
            >
              {slides[currentSlide].title}
            </motion.h1>
          </div>

          {/* Description with fade-in */}
          <div className="mb-12 overflow-hidden">
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
              }}
              className={`text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed ${slides[currentSlide].textColor}/90`}
            >
              {slides[currentSlide].description}
            </motion.p>
          </div>

          {/* CTA Buttons with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8,
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="group px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-neutral-100 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2"
            >
              Start Your Visual Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#gallery"
              className="px-8 py-4 border-2 border-white/30 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 hover:border-white"
            >
              Explore Portfolio
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls - Fixed at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4 bg-black/30 backdrop-blur-md rounded-full px-4 py-3">
        <button
          onClick={prevSlide}
          className="p-2 sm:p-3 rounded-full hover:bg-white/20 transition-all group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-1.5 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-3 h-3 sm:w-4 sm:h-4"
                  : "bg-white/40 w-2 h-2 sm:w-3 sm:h-3 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-2 sm:p-3 rounded-full hover:bg-white/20 transition-all group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
        </button>

        <div className="h-4 w-px bg-white/30 mx-1" />

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 sm:p-3 rounded-full hover:bg-white/20 transition-all group"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
      >
        <div className="text-center">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mx-auto mb-2 flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
          <p className="text-white/40 text-xs font-light tracking-wider">
            SCROLL
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroCarousel;