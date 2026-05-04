import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 overflow-hidden">
      
      {/* 🟢 第一部分：極致滿版、震撼視覺的 Hero 區域 */}
      <section className="relative w-full h-screen flex flex-col justify-end items-start px-8 md:px-20 pb-20 overflow-hidden">
        
        <img
          src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2500&auto=format&fit=crop"
          alt="Subtle Luxury Vehicle Detail"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 z-0 scale-105 hover:scale-100 transition-transform duration-[10000ms]"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-zinc-950 z-10"></div>

        <div className="relative z-20 max-w-6xl w-full">
          
          <h1 className="font-sans font-bold text-6xl md:text-8xl lg:text-9xl tracking-[0.2em] leading-none mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-50 to-zinc-500">THE ELITE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-600">AUTO CONCIERGE</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-100 font-extralight tracking-[0.4em] mb-16 leading-loose pl-1 border-l-2 border-yellow-500/50">
            大灣區限量名車與超級跑車私人管家
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start pl-1">
            <button className="group relative w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold rounded-sm tracking-[0.2em] hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300">
              REQUEST A FIND <span className="font-extralight text-black/60 mx-1">|</span> 全球尋車
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm"></div>
            </button>
            
            <Link href="/vip" className="w-full sm:w-auto text-center px-12 py-5 border border-yellow-500/40 text-yellow-500/80 font-semibold rounded-sm tracking-[0.2em] hover:bg-yellow-500/10 hover:border-yellow-500 transition-all duration-300 backdrop-blur-sm">
              VIP PORTAL <span className="font-extralight text-yellow-500/40 mx-1">|</span> 尊貴登入
            </Link>
          </div>
        </div>
      </section>

      {/* 🟡 第二部分：極簡化、高品質的服務介紹塊 🟡 */}
      <section className="w-full h-auto bg-zinc-950 py-32 px-8 md:px-20 overflow-hidden relative">
        
        <div className="absolute -top-40 -left-60 w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-[160px] z-0"></div>
        <div className="absolute -bottom-40 -right-60 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[140px] z-0"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          
          {[
            { en: 'GLOBAL ACQUISITION', hk: '全球車源配對', desc: '日本直連、歐洲訂製。為您網羅世界頂級限量車款。' },
            { en: 'CROSS-BORDER LOGISTICS', hk: '一站式跨境引進', desc: '訂購、運輸、出牌、倉存一條龍。專業中港澳跨境手續代辦。' },
            { en: 'AI化管理的數碼程序', hk: '數碼化 AI 管家', desc: '智能 AI 管理，VIP 客戶專屬後台即時追蹤愛車動態。' },
          ].map((service, index) => (
            <div key={index} className="space-y-6 group">
              {/* 【Bug 修復處】將原本打錯的 } 改成了正確的 </h3> */}
              <h3 className="text-3xl font-bold tracking-[0.1em] text-white">
                {service.en}
                <div className="w-8 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mt-3 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </h3>
              
              <p className="text-xl font-medium text-yellow-500 tracking-[0.2em]">
                {service.hk}
              </p>
              <p className="text-zinc-400 leading-relaxed font-light text-base tracking-wide">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* 🔷 第三部分：簡潔奢華的 Footer 🔷 */}
      <footer className="w-full py-16 px-8 md:px-20 border-t border-zinc-800 bg-black/50 text-center text-zinc-600 text-sm tracking-[0.3em]">
        © {new Date().getFullYear()} GOLDLAND HK <span className="mx-2">|</span> 大灣區頂級超跑與限量名車私人管家 <span className="mx-2">|</span> All Rights Reserved
      </footer>

    </main>
  )
}
