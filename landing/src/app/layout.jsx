import { intro } from "@/typography";
import { LenisProvider } from "@/providers/LenisProvider";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://rioagora.org"),
  title: "RioAgora.org — Um Rio de futuros",
  description:
    "Iniciativa apartidária que promove debates públicos sobre temas essenciais para o Estado do Rio de Janeiro.",
  icons: {
    icon: "/images/brand/RioAgora_BalaoVerde_RGB.png",
  },
  openGraph: {
    title: "RioAgora.org — Um Rio de futuros",
    description:
      "Iniciativa apartidária que promove debates públicos sobre temas essenciais para o Estado do Rio de Janeiro.",
    url: "https://rioagora.org",
    siteName: "RioAgora.org",
    images: [
      { url: "/images/brand/RioAgora_RGB.png", width: 1200, height: 630 },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RioAgora.org — Um Rio de futuros",
    description:
      "Iniciativa apartidária que promove debates públicos sobre temas essenciais para o Estado do Rio de Janeiro.",
    images: ["/images/brand/RioAgora_RGB.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RioAgora.org",
  url: "https://rioagora.org",
  description:
    "Iniciativa apartidária que promove debates públicos sobre temas essenciais para o Estado do Rio de Janeiro.",
  logo: "https://rioagora.org/images/brand/RioAgora_RGB.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${intro.variable} ${intro.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics - uncomment and replace GA_MEASUREMENT_ID when ready
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        */}
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
