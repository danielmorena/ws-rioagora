import { AnimatedText } from "@/components/AnimatedText"

export function SectionTitle({ children, className = "" }) {
  return (
    <h2 className={`text-[2.5rem] md:text-[4rem] font-bold leading-tight uppercase ${className}`}>
      <AnimatedText mode="letter">
        {children}
      </AnimatedText>
    </h2>
  )
}

export function SectionText({ children, className = "" }) {
  return (
    <div className={`text-[1.3rem] md:text-[1.5rem] leading-relaxed ${className}`}>
      <AnimatedText mode="line">
        {children}
      </AnimatedText>
    </div>
  )
}

export function CardName({ children, className = "" }) {
  return (
    <h3 className={`text-[1.25rem] md:text-[1.5rem] font-bold leading-snug ${className}`}>
      <AnimatedText mode="word">
        {children}
      </AnimatedText>
    </h3>
  )
}

export function CardText({ children, className = "" }) {
  return (
    <p className={`text-[1.125rem] md:text-[1.3rem] leading-relaxed ${className}`}>
      {children}
    </p>
  )
}

export function RichText({ html, className = "", animated = true }) {
  const base = `[&>p+p]:mt-[1em] ${className}`

  if (!animated) {
    return (
      <div
        className={base}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return <AnimatedText html={html} mode="line" staggerDelay={0.08} as="div" className={base} />
}
