import content from "@/content/site-content.json"

const { footer } = content

export function Footer() {
  const year = new Date().getFullYear()
  const copyright = footer.copyright.replace("{year}", year)

  return (
    <footer className="px-[3rem] md:px-[10rem] -mt-[1rem] pt-0 pb-[12rem] md:mt-0 md:py-[5rem] bg-[#1a1a1a]">
      <p className="text-[0.68rem] md:text-[1.2rem] opacity-70">
        {copyright}
      </p>
      <p className="text-[0.68rem] md:text-[1.2rem] opacity-70 mt-1">
        Fale Conosco:{" "}
        <a href={`mailto:${footer.email}`} className="underline hover:opacity-100">
          {footer.email}
        </a>
      </p>
    </footer>
  )
}
