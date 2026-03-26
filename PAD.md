landing page para o projeto rioagora.org

stack:
- nextjs export static
- all SEO headers e json+ld, e codigo placeholder para o google analytics
- a landing page contém as seguintes seções
- utiliza lenis smooth scroll
- usar as fontes Intro Regular, Italic, Bold e Bold Italic disponíveis em D:\Work\Projects\ws-rio-agora\project\visualidade\type\Intro-FontFamily
criar a pasta @/typography/fonts/ para os arquivos e criar um index em @/typography/ para simplifica o import. nesse processo de instlar deve remover geist que é a fonte padrão do nextjs 
- utilize motion e o motionplus para animations
- para os textos crie o componente de AnimatedText, baseado na ref que está nesse doc. Crie um Arquito de Typography, e dentro dele todos os componentes com a composition do AnimatedText, para diminuir a quantidade de class names, mas tb sem inserir as coisas em global.css evitando quebrar a modularidade. note que na referencia tem style dito de uma forma não tailwind, não use-a use a ideia de tailwind puro.
- crie o projeto dentro de uma pasta nova chamada de landing
- instale o suporte ao wrangler para que eu possa publicar no pages do cloudflare, com um comando. a principio nesse momento no meu cloudflare e depois no do projeto. simplifique a forma de trocar de uma conta para outra com algum tipo de configuração que otimize isso.
  
```
layout.jsx
    <body>
        {children}

page.jsx
    -- todas as sections uma sobre a outra
    <hero> (section size-screen) {
        return 
            <header>
                <slideshow> -- motionplus component, pensar em 4 slides
                    -- use as imagens em D:\Work\Projects\ws-rio-agora\project\fotos\hero, mas antes redimensione-as para ficarem com um tamanho máximo na dimensão menor de 1920 ou 910 dependendo da imagem ser vertical ou horizontal
                <marca> -- place holder no canto direito de baixo com 200x200px
                    <h1> 
                        <span>rioagors para leitores de texto</span>
                        <span> img clicavel que scroll para o topo da página
                <herotitle> Construindo o futuro do Rio de Janeiro através do diálogo e da ação coletiva
    }
    <que> (section size-screen) {
        return 
            <title> (composition com <AnimatedText>, linha masked, letter by letter, once) {title}
            <textblock> (composition com split text, linhas masked, line by line, once) {content}

    }
    <quem> (section size-screen) {
        features{
            - os card se empilham com ha um scroll
            - os card tem os cantos arredondados, mas o canto direito de baixo reto
            - o title deve ficar sticky tb
            - use D:\Work\Projects\ws-rio-agora\project\fotos\people\people-placeholder.png como placeholder
        }
        return 
            <title> Quem Somos
            cards.map
                <Card> 
                    <figure>
                        <img> {people.img}
                    <figcaption>
                        <name> h3 (o mesmo de "que" so que com h3) {people.name}
                        <minibio> p {people.minibio}
    }

    <agenda> (section size-screen) {
        return 
            <title> Agenda
            Debate 1: Educação
            <EventCard>
                <figure> -- bg do event card
                    <img> --imagem do palacio capanema
                -- bloco que compoe as infos fica por cima
                    <data> -- usando tag datetime
                        23 de fevereiro
                        Horário:

                        16h

                    Auditório do Palácio Capanema – Rua da Imprensa 16, Centro, Rio de Janeiro
                    Participantes:

                    Anna Backheuser – Instituto João e Maria Backheuser
                    Antoine Lousao – Secretaria Municipal de Educação do Rio de Janeiro
                    Julia Sant'Anna – Centro de Inovação para a Educação Brasileira (CIEB)
                    Ricardo Henriques – Instituto Unibanco
                    Mediação:

                    Eloy H.S. Oliveira – diretor executivo RioAgora.org
    }
    <footer> rodapé com copyright note e data

```


- criar <AnimatedText> baseado no Splitext, com animation de masked line, ou linha por linha, palavra por palavra, letra por letra. usar {children}
  
```
"use client"

import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"

export default function SplitText() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return

            // Hide the container until the fonts are loaded
            containerRef.current.style.visibility = "visible"

            const { words } = splitText(
                containerRef.current.querySelector("h1")!
            )

            // Animate the words in the h1
            animate(
                words,
                { opacity: [0, 1], y: [10, 0] },
                {
                    type: "spring",
                    duration: 2,
                    bounce: 0,
                    delay: stagger(0.05),
                }
            )
        })
    }, [])

    return (
        <div className="container" ref={containerRef}>
            <h1 className="h1">
                Level up your animations with the all-in membership
            </h1>
            <Stylesheet />
        </div>
    )
}

function Stylesheet() {
    return (
        <style>{`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                max-width: 420px;
                text-align: left;
                visibility: hidden;
            }

            .split-word {
                will-change: transform, opacity;
            }
        `}</style>
    )
}
```