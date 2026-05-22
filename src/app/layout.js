import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://goldlandhk.com'),
  title: "GOLD LAND HK | Elite Auto Concierge",
  description: "日出而作，日落而奢。為頂級藏家尋獲全球稀世珍藏。",
  // 👉 這裡我們把手動寫的 icons 和 images 刪掉了，因為 Next.js 會自動去抓您剛放進 app/ 的那兩張圖片！
  openGraph: {
    title: 'GOLD LAND HK | Elite Auto Concierge',
    description: '日出而作，日落而奢。打破常規，為頂級藏家尋獲全球稀世珍藏。',
    url: 'https://goldlandhk.com',
    siteName: 'GOLD LAND HK',
    locale: 'zh_HK',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
