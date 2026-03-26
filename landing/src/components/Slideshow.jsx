"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"

function Filter({ className = "bg-orange-500 mix-blend-multiply opacity-40" }) {
  return <div className={`absolute inset-0 ${className}`} />
}

export function Slideshow({ slides, interval = 5000, filter }) {
  const [current, $current] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      $current((prev) => (prev + 1) % slides.length)
    }, interval)
    return () => clearInterval(timer)
  }, [slides.length, interval])

  return (
    <>
      <AnimatePresence>
        {slides.map((slide, i) =>
          i === current ? (
            <motion.img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          ) : null
        )}
      </AnimatePresence>

      {filter !== false && <Filter className={typeof filter === "string" ? filter : undefined} />}
    </>
  )
}
