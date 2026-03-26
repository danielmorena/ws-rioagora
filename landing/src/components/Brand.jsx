"use client"

import { useCallback } from "react"
import { useLenis } from "@/providers/LenisProvider"

export function Brand() {
  const $lenis = useLenis()

  const scrollToTop = useCallback(() => {
    if ($lenis?.current) {
      $lenis.current.scrollTo(0)
    }
  }, [$lenis])

  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 w-[5.75rem] h-[5.75rem] md:w-[17.5rem] md:h-[17.5rem] z-50">
      <h1>
        <span className="sr-only">RioAgora.org</span>
        <img
          src="/images/brand/RioAgora_BalaoVerde_RGB.png"
          alt="RioAgora.org"
          className="w-full h-full object-contain cursor-pointer"
          onClick={scrollToTop}
        />
      </h1>
    </div>
  )
}
