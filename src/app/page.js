import Link from 'next/link';

export default function Home() {
  return (
    // 使用純黑背景 (bg-black) 營造最深邃的神祕感
    <main className="flex min-h-screen flex-col bg-black overflow-hidden font-sans selection:bg-amber-900/30">
      
      {/* 🌌 第一部分：神秘、細膩的藝術級主視覺 */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        
        {/* 背景圖：更加深邃、對比度更柔和 */}
        <img
          src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2500&auto=format&fit=crop"
          alt="Artistic Luxury Detail"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 z-0 scale-100 hover:scale-110 transition-transform duration-[20000ms] ease-out"
        />
        
        {/* 柔和的多層次漸層遮罩，消除生硬的邊界 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black z-10"></div>

        {/* 核心文字區：完美置中，解決跳行與生硬感 */}
        <div className="relative z-20 max-w-5xl w-full flex flex-col items-center mt-20">
          
          {/* 頂級奢華品牌的靈魂：極細的襯線字體 (font-serif) 與超寬字距 */}
          <h1 className="font-serif font-extralight text-5xl md:text-7xl lg:text-8xl tracking-[0.3em] leading-tight mb-8">
            <span className="text-zinc-300">THE ELITE</span>
            <br />
            {/* 更加內斂的香檳金漸層，不刺眼 */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-500/80">
              AUTO CONCIERGE
            </span>
          </h1>

          {/* 中文描述：極細、低調，宛如藝術品的註腳 */}
          <p className="text-lg md:text-xl text-zinc-400 font-light tracking-[0.5em] mb-16 opacity-80">
            大灣區限量名車私人管家
          </p>
          
          {/* 藝術感按鈕：捨棄粗糙的色塊，改用極細邊框與微透光效果 */}
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center">
            <button className="group relative px-10 py-4 border-[0.5px] border-amber-500/30 text-amber-100/90 font-light tracking-[0.2em] text-sm hover:bg-amber-900/20 hover:border-amber-500/60 transition-all duration-700 backdrop-blur-md">
              GLOBAL FIND <span className="mx-3 text-amber-500/30 font-thin">|</span> 全球尋車
            </button>
            
            <Link href="/vip" className="px-10 py-4 border-[0.5px] border-zinc-700/50 text-zinc-400 font-light tracking-[0.2em] text-sm hover:text-zinc-200 hover:border-zinc-500 transition-all duration-700 backdrop-blur-md">
              VIP PORTAL <span className="mx-3 text-zinc-700 font-thin">|</span> 尊貴登入
            </Link>
          </div>
        </div>

        {/* 畫面底部的神秘引導線，優雅過渡到下一區塊，解決視覺斷層 */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-amber-500/0 via-amber-500/30 to-transparent z-20"></div>
      </section>

      {/* 🕯️ 第二部分：細膩排版的服務展示 (卡片區) */}
      <section className="w-full relative z-20 bg-black pt-10 pb-40 px-6 md:px-12 flex justify-center">
        
        {/* 用一條極細的頂部橫線，將 Hero 區與卡片區優雅地銜接 */}
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 border-t-[0.5px] border-zinc-800/50 pt-20">
          
          {[
            { en: 'ACQUISITION', hk: '頂級車源配對', desc: '專注日本與歐洲稀缺資源，為您跨國網羅極致珍藏。' },
            { en: 'LOGISTICS', hk: '跨境一站引進', desc: '從海運倉存至中港澳兩地牌照，提供無縫的專屬代辦。' },
            { en: 'INTELLIGENCE', hk: '數位智能管家', desc: 'VIP 專屬加密後台，透過 AI 即時追蹤您的愛車動態。' },
          ].map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* 卡片標題：極細襯線體 */}
              <h3 className="font-serif font-extralight text-2xl tracking-[0.2em] text-zinc-200 mb-4 group-hover:text-amber-200 transition-colors duration-500">
                {service.en}
              </h3>
              
              {/* 中文副標與裝飾線 */}
              <div className="flex flex-col items-center mb-6">
                <span className="text-sm font-light text-amber-600/70 tracking-[0.3em] mb-3">
                  {service.hk}
                </span>
                {/* 動態髮絲紋裝飾線 */}
                <div className="w-4 h-[1px] bg-zinc-700 group-hover:w-12 group-hover:bg-amber-500/50 transition-all duration-700"></div>
              </div>
              
              {/* 描述文字：使用極柔和的灰色與細字體 */}
              <p className="text-zinc-500 font-light text-sm tracking-[0.1em] leading-loose max-w-[280px]">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* 🖋️ 第三部分：宛如名片般的極簡 Footer */}
      <footer className="w-full py-12 text-center text-zinc-700 text-xs font-light tracking-[0.4em] bg-black">
        <p className="opacity-50 hover:opacity-100 transition-opacity duration-500">
          © {new Date().getFullYear()} GOLDLAND HK <span className="mx-2 font-extralight text-zinc-800">|</span> ELITE CONCIERGE
        </p>
      </footer>

    </main>
  )
}
