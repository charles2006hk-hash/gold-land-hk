import './globals.css' // 確保這行在最上面
import { Noto_Serif_TC, Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const serif = Noto_Serif_TC({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata = {
  title: 'Gold Land HK | 金田汽車',
  description: '香港頂級歐洲及日本名車進出口商 | Hyper Cars & Luxury MPV',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-HK">
      <head>
        {/* 加入一個簡單的 Favicon 連結，解決 404 */}
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/741/741407.png" sizes="any" />
      </head>
      <body className={`${inter.className} ${serif.variable}`}>{children}</body>
    </html>
  )
}
