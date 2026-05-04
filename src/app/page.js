import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black overflow-hidden font-sans selection:bg-amber-900/30 relative">
      
      {/* 注入自訂的 CSS 動畫 (處理高速光影、呼吸與顯露、向下引導) */}
      <style dangerouslySetInnerHTML={{__html: `
        /* 🏎️ 高速光影疾風動畫 */
        @keyframes streakLine {
          0% { stroke-dashoffset: 2500; opacity: 0; }
          10% { stroke-dashoffset: 0; opacity: 0.8; } 
          40% { stroke-dashoffset: 0; opacity: 0.15; } 
          100% { stroke-dashoffset: 2500; opacity: 0; } 
        }
        /* 🌅 環境琥珀呼吸光暈動畫 */
        @keyframes breatheGlow {
          0%, 100% { opacity: 0.1; transform: scale(1); filter: blur(40px); }
          50% { opacity: 0.5; transform: scale(1.05); filter: blur(60px); }
        }
        /* 🌌 【修復】車輛魂魄光影清晰顯露動畫 (Showcasing Icons, z-1) */
        @keyframes breatheImages {
          0%, 100% { opacity: 0.15; filter: grayscale(80%); }
          50% { opacity: 0.45; filter: grayscale(30%) contrast(1.2); } /* 在呼吸光暈最亮時完全顯露 (45%) */
        }
        /* ⬇️ 向下滾動引導呼吸箭頭動畫 */
        @keyframes breatheGuide {
          0%, 100% { opacity: 0.3; transform: translate(-50%, 0px); }
          50% { opacity: 0.8; transform: translate(-50%, 10px); }
        }
        /* 日出而作，日落而奢背景動畫 */
        @keyframes dayToNight {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-streak {
          stroke-dasharray: 2500;
          animation: streakLine 1.5s ease-out infinite; /* 每個高速光影週期 */
        }
        .animate-breathe-images {
          animation: breatheImages 15s ease-in-out infinite; /* 縮短時間至 15s，讓呼吸感更明顯 */
        }
        .animate-breathe-guide {
          animation: breatheGuide 3s ease-in-out infinite; 
        }
        .bg-day-night {
          background-size: 200% 200%;
          animation: dayToNight 25s ease-in-out infinite;
        }
      `}} />

      {/* 🟢 第0層 (底層)：日出而作，日落而奢的「純黑漸層背景」(修復：Z-index墊底 z-0) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0500] via-black to-[#05050a] bg-day-night z-0"></div>

      {/* 🟢 第1層：【修復】標誌性名車魂魄圖片 (修復：移到背景之上 z-1，並加入 mix-blend-screen 呈現光影感) */}
      <div className="absolute inset-0 z-1 animate-breathe-images pointer-events-none mix-blend-screen opacity-80">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          
          {/* Rolls Royce Spectre (右下角魂魄 - 千萬級代購的靈魂立標與水箱護罩) */}
          <img 
            src="/rollsroyce.png" 
            alt="Rolls Royce Spectre Phantom Luxe Icon"
            className="absolute -bottom-10 -right-20 w-[60vw] h-auto object-contain object-bottom scale-110 opacity-12 blur-[1.2px]" 
          />
          
          {/* Pagani Utopia style Soul Line (中心幽靈魂魄) */}
          <img 
            src="/pagani.png" 
            alt="Pagani Utopia style Soul Line"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-auto object-contain object-center scale-110 opacity-15 blur-[1px]" 
          />

          {/* De Tomaso P72 Style (左上角魂魄 - 銳利疾風魂魄) */}
          <img 
            src="/ferrari.png" 
            alt="De Tomaso P72 Style"
            className="absolute -top-10 -left-20 w-[60vw] h-auto object-contain object-top scale-110 opacity-12 blur-[1.2px]" 
          />
        </svg>
      </div>
      
      {/* 🌅 第2層：環境琥珀呼吸光暈 (配合日落而奢) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-600/10 z-2 mix-blend-screen" style={{ animation: 'breatheGlow 15s infinite' }}></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-orange-900/10 z-2 mix-blend-screen" style={{ animation: 'breatheGlow 15s infinite' }}></div>

      {/* 🏎️ 第3層：高速光影 SVG 線條 */}
      <div className="absolute inset-0 z-3 pointer-events-none opacity-80">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          {/* Bugatti Mistral style invader line */}
          <path d="M -50 850 Q 250 700, 450 650 T 1150 450 M 350 730 C 400 700, 500 700, 550 730" fill="transparent" stroke="url(#paganiGrad)" strokeWidth="1.2" className="animate-streak" style={{ animationDelay: '0s' }} />
          {/* Rolls Royce 靈魂垂直格柵線做高速餘光 */}
          <path d="M 120 0 L 120 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.8" className="animate-streak" style={{ animationDelay: '2.5s' }} />
          <path d="M 140 0 L 140 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" className="animate-streak" style={{ animationDelay: '2.5s' }} />
          {/* Ferrari 812 style invader line */}
          <path d="M 0 350 L 1000 350" fill="transparent" stroke="rgba(251, 191, 36, 0.05)" strokeWidth="0.5" className="animate-streak" style={{ animationDelay: '1.2s' }} />
          {/* Pagani C-Line style invader line */}
          <path 
          d="M 880 150 C 980 150, 1000 450, 880 700 C 730 700, 730 400, 880 400 M 820 500 C 830 520, 830 540, 820 560" 
          fill="transparent" 
          stroke="url(#bugattiGrad)" 
          strokeWidth="1.5" 
          className="animate-streak"
          style={{ animationDelay: '0.8s' }}
          />
          <defs>
            <linearGradient id="paganiGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(251, 191, 36, 0.8)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
            <linearGradient id="bugattiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.9)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 🌌 第4層：主視覺內容區 (Hero height optimized) */}
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
            <span className="text-amber-100/90 hover:text-amber-100 transition-colors duration-500 relative cursor-default">
              日落而<span className="text-amber-200">奢</span> (Sunset Luxe)
              {/* Hover 時下方顯露琥珀金光 */}
              <div className="absolute inset-0 w-0 bg-amber-500/0 hover:w-full hover:bg-amber-900/10 transition-all duration-700"></div>
            </span>
          </p>
          
          {/* 讓人「一看就想溝通」的藝術級按鈕區 (解決字體走位與對齊問題) */}
          <div className="flex flex-col sm:flex-row gap-8 w-full max-w-3xl justify-center items-center mt-4">
            
            {/* GLOBAL FIND 按鈕 (確保對齊) */}
            <button className="group relative px-10 py-5 w-full sm:w-auto bg-black border border-amber-500/30 text-amber-100/90 font-light rounded-sm hover:border-amber-400/70 transition-all duration-700 overflow-hidden flex items-baseline justify-center">
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-amber-950/50 to-black group-hover:w-full transition-all duration-1000 ease-out z-0"></div>
              <span className="relative z-10 font-sans tracking-[0.25em] text-xs">GLOBAL FIND</span>
              <span className="relative z-10 text-amber-500/40 font-thin mx-3 text-lg">|</span>
              <span className="relative z-10 font-sans tracking-[0.2em] text-lg">全球尋車</span>
            </button>
            
            {/* VIP PORTAL 按鈕 (修復 Hover 金線置中) */}
            <Link href="/vip" className="px-10 py-5 w-full sm:w-auto text-zinc-400 font-light tracking-[0.25em] text-lg rounded-sm hover:text-zinc-200 transition-all duration-700 group flex items-baseline justify-center relative">
              <span className="font-sans tracking-[0.25em] text-xs">VIP PORTAL</span>
              <span className="text-zinc-700 font-thin mx-3 text-lg">|</span>
              <span className="font-sans tracking-[0.2em]">尊貴登入</span>
              {/* Hover 時底部出現優雅對齊的金線 */}
              <div className="absolute bottom-2 left-10 right-10 h-[1px] bg-amber-500/0 group-hover:bg-amber-500/50 transition-all duration-700"></div>
            </Link>

          </div>
        </div>

        {/* ⬇️ 向下滾動引導 (z-20) */}
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
            { en: 'DIVERSITY', hk: '名車多樣性', desc: '為您網羅 Pagani Utopia、Bugatti、Rolls Royce Boat Tail 等稀世珍藏。' },
            { en: 'CROSS-BORDER', hk: '無縫跨境 logistical', desc: '專業代辦中港澳跨境指標手續，暢行大灣區，不受地域界限。' },
            { en: 'AI INTELLIGENCE', hk: '數位管家', desc: '數位程序管理，VIP 客戶專屬加密後台即時追蹤藝術品的旅程。' },
          ].map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-default relative z-10">
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
      <footer className="w-full py-12 text-center text-zinc-700 text-xs font-light tracking-[0.4em] bg-black relative z-20 border-t border-zinc-900/50 Footer text-center">
        <p className="opacity-40 hover:opacity-100 transition-opacity duration-700">
          © {new Date().getFullYear()} GOLDLAND HK <span className="mx-2 font-extralight text-zinc-800">|</span> ELITE CONCIERGE
        </p>
      </footer>

    </main>
  )
}
