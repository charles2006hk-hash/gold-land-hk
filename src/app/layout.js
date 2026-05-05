import './globals.css'

export const metadata = {
  metadataBase: new URL('https://gold-land-hk.vercel.app'), // 替換為您目前的 Vercel 網址
  title: 'GOLDLAND HK | The Elite Auto Concierge',
  description: '日出而作，日落而奢。金田汽車專為頂級藏家提供全球稀世車源配對、中港澳跨境引進與 VIP 專屬數位管家服務。',
  openGraph: {
    title: 'GOLDLAND HK | 頂級名車專屬管家',
    description: '全球稀世車源配對 | 一站式跨境引進 | 尊貴數位管家',
    url: '/',
    siteName: 'GOLDLAND HK',
    images: [
      {
        url: '/og-image.jpg', // 這是我們等一下要上傳的預覽圖
        width: 1200,
        height: 630,
        alt: 'GOLDLAND HK The Elite Auto Concierge',
      },
    ],
    locale: 'zh_HK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GOLDLAND HK | The Elite Auto Concierge',
    description: '日出而作，日落而奢。頂級名車專屬管家。',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-HK">
      <body className="bg-black text-zinc-200 selection:bg-amber-900/30">
        {children}
      </body>
    </html>
  )
}
