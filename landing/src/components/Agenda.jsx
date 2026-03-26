import { SectionTitle } from "@/components/Typography"
import { EventCard } from "@/components/EventCard"
import content from "@/content/site-content.json"

const { agenda } = content

export function Agenda() {
  const event = agenda.events[0]

  return (
    <section className="w-screen min-h-screen flex flex-col justify-center px-[1.5rem] md:px-[6rem] pt-[4rem] md:pt-[6rem] pb-[2rem] md:pb-[3rem] bg-[#1a1a1a]">
      <SectionTitle className="mb-[1rem] md:mb-[1.5rem] ml-[1.5rem] md:ml-[4rem]">
        {agenda.title}
      </SectionTitle>
      <EventCard event={event} />
    </section>
  )
}
