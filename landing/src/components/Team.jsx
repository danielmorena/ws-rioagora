import { SectionTitle, CardName, RichText } from "@/components/Typography"
import content from "@/content/site-content.json"

const { team } = content

export function Team() {
  return (
    <section className="relative">
      <div className="sticky top-0 flex items-end bg-black">
        <div className="p-[1.5rem] md:p-[6rem] pb-[4rem] md:pb-[6rem]">
          <SectionTitle>{team.title}</SectionTitle>
        </div>
      </div>

      {team.members.map((member) => (
        <div key={member.name} className="size-screen sticky top-0 overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/30 to-black/80" />

          <div className="absolute inset-0 flex items-end md:items-center justify-end p-[1.5rem] md:p-[6rem] pb-[4rem] md:pb-[6rem]">
            <div className="max-w-[22rem] md:max-w-[30rem]">
              <CardName className="mb-[0.75rem]">{member.name}</CardName>
              <RichText
                html={member.bio}
                className="text-[1rem] md:text-[1.3rem] leading-relaxed opacity-90"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="sticky top-0 px-[1.5rem] md:px-[6rem] py-[3rem] md:py-[4rem]">
        <RichText
          html={team.footer}
          className="max-w-[50rem] text-[1rem] md:text-[1.3rem] leading-relaxed opacity-70"
        />
      </div>
    </section>
  )
}
