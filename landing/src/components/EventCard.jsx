"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

const MONTHS_PT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

function parseEventDate(dateStr, timeStr) {
  if (!dateStr) return { day: "", month: "", time: timeStr || "" }
  const [y, m, d] = dateStr.split("-").map(Number)
  const monthIndex = Math.max(0, Math.min(11, m - 1))
  return {
    day: String(d),
    month: MONTHS_PT[monthIndex],
    time: timeStr || ""
  }
}

export function EventCard({ event }) {
  const [selected, $selected] = useState(0)
  const participant = event.participants[selected]
  const { day, month, time } = parseEventDate(event.date, event.time)

  return (
    <article className="relative bg-black md:bg-transparent rounded-tl-[2rem] rounded-tr-[2rem] rounded-bl-[2rem] md:rounded-tl-[4rem] md:rounded-tr-[4rem] md:rounded-bl-[4rem] rounded-br-none overflow-hidden md:overflow-hidden min-h-[85vh] md:min-h-[90vh]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={participant.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:block absolute inset-0"
          aria-hidden="true"
        >
          <img
            src={participant.image}
            alt=""
            className="w-full h-full object-cover object-right"
          />
        </motion.div>
      </AnimatePresence>

      <span className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" aria-hidden="true" />

      <div className="relative z-10 px-[1.5rem] pt-[1.25rem] pb-[1.5rem] md:px-[4rem] md:pt-[2.875rem] md:pb-[2.5rem] flex flex-col min-h-0 md:min-h-[90vh]">
        <div className="flex flex-col gap-[1rem] md:flex-row md:items-start md:justify-between md:gap-0 shrink-0">
          <div>
            <h2 className="leading-tight">
              <span className="block text-[1.44rem] md:text-[2.1rem] font-normal text-laranja">{event.label}</span>
              {event.subtitle && <span className="block text-[1.56rem] md:text-[3.45rem] font-bold">{event.subtitle}</span>}
            </h2>
            <address className="text-[0.84rem] md:text-[1rem] opacity-60 not-italic mt-[0.25rem]">
              {event.location}
            </address>
          </div>

          <time dateTime={event.date} className="order-first md:order-none flex items-center gap-[0.75rem] text-laranja font-bold shrink-0">
            <span className="text-[2.4rem] md:text-[5.2rem] leading-none">{day}</span>
            <span className="h-[1.9rem] md:h-[4.5rem] w-[1px] bg-laranja/60" aria-hidden="true" />
            <span className="flex flex-col text-[0.96rem] md:text-[1.6rem] leading-tight uppercase justify-center h-[1.9rem] md:h-[4.5rem]">
              <span>{month}</span>
              <span className="font-normal">{time}</span>
            </span>
          </time>
        </div>

        <AnimatePresence mode="wait">
          <motion.img
            key={participant.image + "-mobile"}
            src={participant.image}
            alt={participant.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="block md:hidden w-[75%] aspect-[3/4] object-cover object-right mt-[1rem] order-3 md:order-none"
          />
        </AnimatePresence>

        <div className="mt-[1rem] md:relative md:mt-[100px] md:flex-1 order-4 md:order-none">
          <AnimatePresence mode="wait">
            <motion.p
              key={selected}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="md:absolute md:inset-x-0 md:top-0 text-[0.84rem] md:text-[1.05rem] text-balance leading-relaxed opacity-80 max-w-[43rem]"
            >
              {participant.bio || participant.org}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="shrink-0 flex flex-col gap-[1rem] mt-[1.5rem] md:mt-0 order-2 md:order-none">
          <nav className="flex flex-col gap-[0.35rem] md:flex-row md:flex-wrap md:gap-[0.5rem]" aria-label="Participantes">
            {event.participants.map((p, i) => (
              <button
                key={p.name}
                onClick={() => $selected(i)}
                className={`text-left px-[0.75rem] py-[0.65rem] md:px-[1.15rem] md:py-[0.525rem] rounded-xl transition-all duration-300 cursor-pointer ${
                  i === selected
                    ? "bg-laranja text-white"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="block text-[0.98rem] md:text-[1.1rem] font-bold leading-snug">
                  {p.name}
                </span>
                <span className="block text-[0.75rem] md:text-[0.8rem] opacity-50 leading-snug">
                  {p.org}
                </span>
              </button>
            ))}
          </nav>

          <section className="pt-[0.5rem]" aria-label="Mediação">
            <p className="text-[0.78rem] md:text-[0.9rem] opacity-50">
              Mediação:{" "}
              <span className="font-bold text-white/80">{event.mediator.name}</span>
              <span className="opacity-70"> — {event.mediator.role}</span>
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
