import { Slideshow } from "@/components/Slideshow"
import { AnimatedText } from "@/components/AnimatedText"
import { Brand } from "@/components/Brand"
import content from "@/content/site-content.json"

const { hero } = content

export function Hero() {
  return (
    <section className="size-screen relative overflow-hidden bg-black">
      <Slideshow slides={hero.slides} interval={5000} />

      <div className="absolute inset-0 flex flex-col items-start p-6 md:p-28 pt-12 md:pt-24">
        <span className="text-xl font-black text-white mb-10">rioagora.org</span>
        <h2 className="text-[4.53rem] md:text-[8rem] font-normal leading-[0.9] w-full md:w-[80vw]">
          <AnimatedText mode="word" html={hero.title} />
        </h2>
      </div>

      <Brand />
    </section>
  )
}
