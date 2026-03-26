import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Agenda } from "@/components/Agenda"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <article>
      <Hero />
      <About />
      <Agenda />
      <Footer />
    </article>
  )
}
