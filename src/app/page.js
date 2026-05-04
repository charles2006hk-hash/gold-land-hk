import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black overflow-hidden font-sans selection:bg-amber-900/30 relative">
      
      {/* 注入自訂的 CSS 動畫 (處理呼吸感、向下引導) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes streakLine {
          0% { stroke-dashoffset: 2500; opacity: 0; }
          10% { stroke-dashoffset: 0; opacity: 0.8; } 
          40% { stroke-dashoffset: 0; opacity: 0.15; } 
          100% { stroke-dashoffset: 2500; opacity: 0; } 
        }
        @keyframes breatheGlow {
          0%, 100% { opacity: 0.1; transform: scale(1); filter: blur(50px); }
          50% { opacity: 0.35; transform: scale(1.05); filter: blur(70px); }
        }
        /* 讓神車部件在黑影中隱約呼吸 */
        @keyframes breatheParts {
          0%, 100% { opacity: 0.1; transform: scale(1.02); filter: grayscale(50%) brightness(0.8); }
          50% { opacity: 0.35; transform: scale(1); filter: grayscale(10%) brightness(1.2); } 
        }
        @keyframes breatheGuide {
          0%, 100% { opacity: 0.2; transform: translate(-50%, 0px); }
          50% { opacity: 0.8; transform: translate(-50%, 10px); }
        }
        .animate-streak { animation: streakLine 1.5s ease-out infinite; }
        .animate-breathe-parts { animation: breatheParts 12s ease-in-out infinite; }
        .animate-breathe-guide { animation: breatheGuide 3s ease-in-out infinite; }
      `}} />

      {/* 🟢 第 0 層：純黑背景 */}
      <div className="absolute inset-0 bg-black z-0"></div>

      {/* 🟢 第 1 層：【修復與升級】獨佔左下角的千萬級別超跑部件 (使用無痕羽化 Mask 融入黑暗) */}
      <div className="absolute inset-0 z-1 pointer-events-none animate-breathe-parts mix-blend-lighten flex items-end justify-start p-10">
        
        {/* 獨佔位置：畫面左下角 (Bottom Left) */}
        {/* 💡 此處範例為 Ferrari 812 Competizione 鍛造輪圈與碳纖維卡鉗細節 */}
        {/* 💡 開發指南：未來將 src 改為 您 public 中的特寫細節照片，例如 "/ferrari-812-wheel.jpg" */}
        <div 
          className="w-full h-full max-w-[400px] max-h-[300px]"
          style={{ 
            WebkitMaskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 70%)',
            maskImage: 'radial-gradient(circle at center, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 70%)',
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=1000&q=80" 
            alt="Ferrari 812 Competizione style detail"
            className="w-full h-full object-cover object-center" 
          />
        </div>
      </div>
      
      {/* 🌅 第 2 層：降低亮度的琥珀呼吸光暈 */}
      <div className="absolute top-[0%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-amber-600/5 z-2 mix-blend-screen" style={{ animation: 'breatheGlow 15s infinite' }}></div>
      <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-orange-900/5 z-2 mix-blend-screen" style={{ animation: 'breatheGlow 15s infinite alternate-reverse' }}></div>

      {/* 🏎️ 第 3 層：SVG 靈魂光影線條 */}
      <div className="absolute inset-0 z-3 pointer-events-none opacity-80 Footer text-center">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <path d="M -50 850 Q 250 700, 450 650 T 1150 450 M 350 730 C 400 700, 500 700, 550 730" fill="transparent" stroke="url(#paganiGrad)" strokeWidth="1" className="animate-streak" style={{ animationDelay: '0s' }} />
          <path d="M 120 0 L 120 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.8" className="animate-streak" style={{ animationDelay: '2.5s' }} />
          <path d="M 140 0 L 140 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" className="animate-streak" style={{ animationDelay: '2.5s' }} />
          <path d="M 880 150 C 980 150, 1000 450, 880 700 C 730 700, 730 400, 880 400" fill="transparent" stroke="url(#bugattiGrad)" strokeWidth="1.2" className="animate-streak" style={{ animationDelay: '0.8s' }} />
          <defs>
            <linearGradient id="paganiGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(251, 191, 36, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
            <linearGradient id="bugattiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(251, 191, 36, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 🌌 第 4 層：主視覺內容區：懸浮於光影線條之上 */}
      <section className="relative z-20 w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-6 mt-12 pb-32">
        <div className="max-w-5xl w-full flex flex-col items-center mt-12 mb-16 relative z-30">
          
          {/* 大標題 */}
          <h1 className="font-serif font-extralight text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] leading-tight mb-8">
            <span className="text-zinc-300 drop-shadow-md">THE ELITE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-600 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 25px rgba(251,191,36,0.25))' }}>
              AUTO CONCIERGE
            </span>
          </h1>

          {/* 副標題 (日落而奢中文大器版) */}
          <p className="text-lg md:text-xl text-zinc-400 font-light tracking-[0.4em] mb-16 opacity-95">
            日出而作 <span className="mx-4 text-amber-500/40 font-thin">|</span> 
            <span className="text-amber-100/90 hover:text-amber-100 transition-colors duration-500 relative cursor-default Footer text-center">
              日落而<span className="text-amber-200">奢</span> (Sunset Luxe)
              {/* Hover 時下方顯露琥珀金光 */}
              <div className="absolute inset-0 w-0 bg-amber-500/0 hover:w-full hover:bg-amber-900/10 transition-all duration-700"></div>
            </span>
          </p>
          
          {/* 讓人「一看就想溝通」的藝術級按鈕區 */}
          <div className="flex flex-col sm:flex-row gap-8 w-full max-w-3xl justify-center items-center mt-4">
            
            {/* GLOBAL FIND 按鈕 (確保對齊) */}
            <button className="group relative px-10 py-5 w-full sm:w-auto bg-black border border-amber-500/30 text-amber-100/90 font-light rounded-sm hover:border-amber-400/70 transition-all duration-700 overflow-hidden flex items-baseline justify-center Footer text-center">
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-amber-950/50 to-black group-hover:w-full transition-all duration-1000 ease-out z-0"></div>
              <span className="relative z-10 font-sans tracking-[0.25em] text-xs">GLOBAL FIND</span>
              <span className="relative z-10 text-amber-500/40 font-thin mx-3 text-lg">|</span>
              <span className="relative z-10 font-sans tracking-[0.2em] text-lg">全球尋車</span>
            </button>
            
            {/* VIP PORTAL 按鈕 (修復 Hover 金線置中) */}
            <Link href="/vip" className="px-10 py-5 w-full sm:w-auto text-zinc-500 font-light tracking-[0.25em] text-lg rounded-sm hover:text-zinc-200 transition-all duration-700 group flex items-baseline justify-center relative Footer text-center">
              <span className="font-sans tracking-[0.25em] text-xs">VIP PORTAL</span>
              <span className="text-zinc-700 font-thin mx-3 text-lg">|</span>
              <span className="font-sans tracking-[0.2em]">尊貴登入</span>
              {/* Hover 時底部出現優雅對齊的金線 */}
              <div className="absolute bottom-2 left-10 right-10 h-[1px] bg-amber-500/0 group-hover:bg-amber-500/50 transition-all duration-700"></div>
            </Link>

          </div>
        </div>

        {/* ⬇️ 向下滾動引導 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-breathe-guide z-20 pointer-events-none opacity-80 flex flex-col items-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-amber-500 stroke-[0.5] mb-2">
            <path d="M12 21V3M12 21L17 16M12 21L7 16" />
          </svg>
          <div className="text-amber-600/60 font-light tracking-[0.3em] text-[10px] absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            EXPLORE THE LUXE
          </div>
        </div>
      </section>

      {/* 🕯️ 服務展示區：極簡留白 */}
      <section className="w-full relative z-20 bg-black pb-40 px-6 md:px-12 flex justify-center border-t-[0.5px] border-zinc-800/30 mt-10">
        
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20 pt-24 relative overflow-hidden">
          
          {/* 在這區加入一個隱約的巨大琥珀漸層背景，增加深度 */}
          <div className="absolute top-0 -left-1/2 w-[120vw] h-[120vw] rounded-full bg-amber-900/10" style={{ animation: 'breatheGlow 25s infinite' }}></div>
          
          {[
            { en: 'GLOBAL ACQUISITION', hk: '全球車源配對', desc: '從日本直連、歐洲訂製至千萬級之稀世珍藏，精準尋獲您的夢想魂魄。' },
            { en: 'CROSS-BORDER LOGISTICS', hk: '一站式跨境引進', desc: '訂購、運輸、出牌、倉存一條龍。專業中港澳跨境指標指標手續。' },
            { en: 'AI INTELLIGENCE', hk: '數位管家', desc: '數位化 AI 管家程序管理，VIP 客戶專屬後台即時追蹤藝術品的旅程。' },
          ].map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-default relative z-10 Footer text-center">
              <h3 className="font-serif font-extralight text-2xl tracking-[0.2em] text-zinc-300 mb-5 group-hover:text-amber-300 transition-colors duration-700">
                {service.en}
              </h3>
              
              <div className="flex flex-col items-center mb-7">
                <span className="text-sm font-light text-amber-600/70 tracking-[0.3em] mb-4 group-hover:text-amber-500 transition-colors duration-700">
                  {service.hk}
                </span>
                <div className="w-2 h-[1px] bg-zinc-700 group-hover:w-20 group-hover:bg-amber-500 transition-all duration-1000 ease-out"></div>
              </div>
              
              <p className="text-zinc-500 font-light text-sm tracking-[0.1em] leading-loose max-w-[280px] group-hover:text-zinc-400 transition-colors duration-700">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* 🖋️ Footer */}
      <footer className="w-full py-12 text-center text-zinc-700 text-xs font-light tracking-[0.4em] bg-black relative z-20 border-t border-zinc-900/50 text-center Footer text-center">
        <p className="opacity-40 hover:opacity-100 transition-opacity duration-700">
          © {new Date().getFullYear()} GOLDLAND HK <span className="mx-2 font-extralight text-zinc-800">|</span> ELITE CONCIERGE
        </p>
      </footer>

    </main>
  )
}
