import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://goldlandhk.com'),
  title: "GOLD LAND HK | Elite Auto Concierge",
  description: "日出而作，日落而奢。為頂級藏家尋獲全球稀世珍藏。",
  icons: {
    icon: '/logo.png', // 🌟 改成 png
    apple: '/logo.png', // 🌟 改成 png
  },
  openGraph: {
    title: 'GOLD LAND HK | Elite Auto trConcierge',
    description: '日出而作，日落而奢。打破常規，為頂級藏家尋獲全球稀世珍藏。',
    url: 'https://goldlandhk.com',
    siteName: 'GOLD LAND HK',
    images: [
      {
        // 🌟 關鍵修改：加上完整的 https 網域
        url: 'https://goldlandhk.com/logo.png', 
        width: 800,
        height: 800,
        alt: 'GOLD LAND HK Elite Logo',
      },
    ],
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
