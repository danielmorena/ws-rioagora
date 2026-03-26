"use client"

import { createContext, useContext, useEffect, useRef } from "react"
import Lenis from "lenis"

const LenisContext = createContext(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }) {
  const $lenis = useRef(null)

  useEffect(() => {
    const lenis = new Lenis()
    $lenis.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      $lenis.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={$lenis}>
      {children}
    </LenisContext.Provider>
  )
}
