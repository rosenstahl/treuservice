import { Inter } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const systemFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'SF Pro Display',
  'SF Pro Text',
  'ui-sans-serif',
  'system-ui',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'sans-serif'
].join(', ')

export const fontClass = 'font-[system-ui] antialiased'