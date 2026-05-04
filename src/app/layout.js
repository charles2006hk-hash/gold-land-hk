import './globals.css'

export const metadata = {
  title: '金田汽車 | 頂級超跑與限量名車私人管家',
  description: '專注香港、海外及國內各大名車尋找、配對與引進。提供中港澳跨境車牌代辦，為您打造尊貴的購車體驗。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-HK">
      {/* 設定全站背景為深黑色 (bg-zinc-950)，文字為淺灰色 (text-zinc-50) */}
      <body className="bg-zinc-950 text-zinc-50 min-h-screen font-sans">
        {children}
      </body>
    </html>
  )
}
