"use client"
import Image from "next/image";
import { useState } from "react";

const BeforeAfterComparison = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = 'touches' in event ? event.touches[0].clientX : (event as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-24 px-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">The Editing Process</h3>
        <p className="text-neutral-400">Drag to see the raw capture vs. the final color grade.</p>
      </div>
      
      <div 
        className="relative w-full aspect-[3/2] rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl border border-neutral-800"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* Edited Image (Background) */}
        <Image
          src="https://images.pexels.com/photos/2253821/pexels-photo-2253821.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="After Edit"
          fill
          className="object-cover pointer-events-none"
        />

        {/* Raw Image (Foreground with Clip Path) */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <Image
            src="https://images.pexels.com/photos/2253821/pexels-photo-2253821.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Before Edit"
            fill
            className="object-cover grayscale contrast-75 brightness-75" // Simulating a "Raw" flat look
          />
          {/* Label */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded text-xs font-bold border border-white/10">RAW</div>
        </div>

        {/* Edited Label */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded text-xs font-bold border border-white/10">EDITED</div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
            <div className="flex gap-0.5">
               <div className="w-0.5 h-3 bg-black/80"></div>
               <div className="w-0.5 h-3 bg-black/80"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison