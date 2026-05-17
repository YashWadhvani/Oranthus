"use client"


import React, { createContext, useContext, useEffect, useRef, ReactNode } from "react"
import Lenis from "lenis"

interface LenisOptions {
  offset?: number
  [key: string]: unknown
}

type LenisContextType = {
  scrollTo: (target: string | number | Element, options?: LenisOptions) => void
  lenis?: Lenis | null
}
const LenisContext = createContext<LenisContextType | undefined>(undefined)

export function useLenis() {
  const ctx = useContext(LenisContext)
  if (!ctx) throw new Error("useLenis must be used inside a ScrollProvider")
  return ctx
}

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  const scrollTo = (target: string | number | Element, options?: LenisOptions): void => {
    if (!lenisRef.current) return
    // Accept '#id' selector or element or number
    if (typeof target === "string" && target.startsWith("#")) {
      const el = document.querySelector(target)
      if (!el) return
      // document.querySelector returns Element; Lenis expects an HTMLElement.
      // Cast to HTMLElement for TypeScript and runtime compatibility.
      const elHtml = el as unknown as HTMLElement
      lenisRef.current?.scrollTo(elHtml, options)
      return
    }

      if (typeof target === "number") {
        lenisRef.current?.scrollTo(target as number, options)
        return
      }

      // target should be an Element -> cast to HTMLElement for Lenis
      const targetEl = target as unknown as HTMLElement
      lenisRef.current?.scrollTo(targetEl, options)
  }

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1 - Math.pow(1 - t, 2)),
      smooth: true,
      direction: "vertical",
      gestureDirection: "vertical",
      smoothTouch: true,
      touchMultiplier: 1.5,
      lerp: 0.08,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any)

    lenisRef.current = lenis

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={{ scrollTo }}>
      {children}
    </LenisContext.Provider>
  )
}
