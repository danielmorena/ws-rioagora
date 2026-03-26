import localFont from 'next/font/local'

export const intro = localFont({
  src: [
    { path: './fonts/Intro-Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Intro-Italic.woff2', weight: '400', style: 'italic' },
    { path: './fonts/Intro-Bold.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Intro-BoldItalic.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-intro',
  fallback: ['Arial', 'sans-serif'],
  display: 'swap',
})
