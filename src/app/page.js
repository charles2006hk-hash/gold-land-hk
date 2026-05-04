import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      
      {/* 第一區塊：滿版主視覺 (Hero Section) */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center bg-zinc-900 overflow-hidden">
        {/* 深色漸層遮罩，讓文字更清楚 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-zinc-950 z-10"></div>

        {/* 暫時的超跑背景圖 (未來可以換成你們實拍的 GR Yaris 或保時捷影片) */}
        <img
          src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Car Background"
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
        />

        {/* 標題與按鈕區 */}
        <div className="relative z-20 text-center px-4 mt-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200 mb-6">
            金田汽車
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-12 tracking-widest">
            大灣區頂級超跑與限量名車私人管家
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold rounded-sm hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 tracking-wide">
              全球尋車委託
            </button>
            {/* VIP 入口，點擊會導向 /vip 網址 */}
            <Link href="/vip" className="px-8 py-4 border border-yellow-500/50 text-yellow-500 font-semibold rounded-sm hover:bg-yellow-500/10 transition-all duration-300 tracking-wide backdrop-blur-sm">
              VIP 尊貴登入
            </Link>
          </div>
        </div>
      </section>

      {/* 第二區塊：三大核心服務介紹 */}
      <section className="w-full max-w-7xl mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-yellow-500">全球尋車配對</h3>
          <p className="text-zinc-400 leading-relaxed">專注日本、歐洲各大名車與限量版超級跑車，為您精準網羅世界頂級車源。</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-yellow-500">一站式跨境引進</h3>
          <p className="text-zinc-400 leading-relaxed">訂購、運輸、出牌、倉存一條龍服務。專業代辦中港澳跨境車牌，暢行大灣區。</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-yellow-500">AI 智能管家</h3>
          <p className="text-zinc-400 leading-relaxed">數碼化程序管理，VIP 客戶專屬後台即時追蹤愛車動態，體驗極致科技尊榮。</p>
        </div>
      </section>

    </main>
  )
}
