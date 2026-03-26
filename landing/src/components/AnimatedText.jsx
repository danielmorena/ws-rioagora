"use client"

import { useEffect, useRef } from "react"
import { animate, stagger } from "motion"
import { splitText } from "motion-plus"

const SPLIT_KEY_MAP = {
  line: "lines",
  word: "words",
  letter: "chars",
}

function wrapBrSegments(el) {
  const brs = el.querySelectorAll("br")
  if (!brs.length) return false

  const children = Array.from(el.childNodes)
  const lines = []
  let current = []

  children.forEach((node) => {
    if (node.nodeName === "BR") {
      lines.push(current)
      current = []
    } else {
      current.push(node)
    }
  })
  lines.push(current)

  el.innerHTML = ""
  lines.forEach((nodes) => {
    const wrapper = document.createElement("span")
    wrapper.style.display = "block"
    nodes.forEach((n) => wrapper.appendChild(n))
    el.appendChild(wrapper)
  })

  return true
}

function useSplitAnimation({ mode = "line", once = false, staggerDelay = 0.05 }) {
  const $container = useRef(null)
  const $hasAnimated = useRef(false)

  useEffect(() => {
    const el = $container.current
    if (!el) return

    let cleanup

    document.fonts.ready.then(() => {
      const hasBr = wrapBrSegments(el)

      const nodes = hasBr
        ? Array.from(el.querySelectorAll(":scope > span[style]"))
        : mode === "line" && el.querySelectorAll("p").length > 0
          ? Array.from(el.querySelectorAll("p"))
          : [el]

      const key = SPLIT_KEY_MAP[mode] ?? "words"
      const targets = nodes.flatMap((node) => splitText(node)[key] ?? [])

      if (!targets.length) {
        el.style.visibility = "visible"
        return
      }

      targets.forEach((target) => {
        target.style.willChange = "transform, opacity"
        target.style.transform = "translateY(100%)"
        target.style.opacity = "0"

        if (target.parentElement) {
          target.parentElement.style.overflow = "hidden"
          target.parentElement.style.paddingBottom = "0.15em"
          target.parentElement.style.marginBottom = "-0.15em"
        }
      })

      el.style.visibility = "visible"

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            if (once && $hasAnimated.current) return

            $hasAnimated.current = true

            animate(
              targets,
              { transform: "translateY(0%)", opacity: 1 },
              {
                delay: stagger(staggerDelay),
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }
            )

            if (once) observer.unobserve(el)
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(el)
      cleanup = () => observer.disconnect()
    })

    return () => {
      if (cleanup) cleanup()
    }
  }, [mode, once, staggerDelay])

  return $container
}

export function AnimatedText({ children, html, mode = "word", once = false, staggerDelay = 0.05, className = "", as: Tag = "span" }) {
  const $container = useSplitAnimation({ mode, once, staggerDelay })

  if (html) {
    return (
      <Tag
        ref={$container}
        className={className}
        style={{ visibility: "hidden" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <Tag
      ref={$container}
      className={className}
      style={{ visibility: "hidden" }}
    >
      {children}
    </Tag>
  )
}
