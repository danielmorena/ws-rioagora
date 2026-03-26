import { SectionTitle, RichText } from "@/components/Typography"
import content from "@/content/site-content.json"

const { about } = content

export function About() {
  return (
    <section className="w-screen min-h-dvh md:h-screen flex flex-col justify-center px-[1.5rem] md:px-[6rem] py-[3rem] md:py-0 bg-laranja">
      <SectionTitle className="!text-[2.13rem] md:!text-[4rem] mb-[2rem] md:mb-[3rem]">
        {about.title}
      </SectionTitle>
      <RichText
        html={about.content}
        className="max-w-[50rem] text-[0.96rem] md:text-[1.5rem] leading-relaxed opacity-90"
      />
    </section>
  )
}
