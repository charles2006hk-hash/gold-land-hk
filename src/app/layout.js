import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"; // 📊 1. 引入 Vercel Analytics
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://goldlandhk.com'),
  title: "GOLD LAND HK | Elite Auto Concierge",
  description: "日出而作，日落而奢。為頂級藏家尋獲全球稀世珍藏。",
  openGraph: {
    title: 'GOLD LAND HK | Elite Auto Concierge',
    description: '日出而作，日落而奢。為頂級藏家尋獲全球稀世珍藏。',
    url: 'https://goldlandhk.com',
    siteName: 'GOLD LAND HK',
    images: [
      {
        url: 'https://goldlandhk.com/opengraph-image.jpg',
        width: 800,
        height: 800,
      },
    ],
    locale: 'zh_HK',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics /> {/* 📊 2. 啟用 Analytics 元件，它會在背景默默記錄流量 */}
      </body>
    </html>
  );
}
