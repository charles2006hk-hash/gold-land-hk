import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black overflow-hidden font-sans selection:bg-amber-900/30 relative">
      
      {/* 注入自訂的 CSS 動畫 (處理呼吸感與線條顯露) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawAndFade {
          0% { stroke-dashoffset: 2500; opacity: 0; }
          40% { stroke-dashoffset: 0; opacity: 0.35; } /* 在呼吸光暈最亮時完全繪製並顯露 */
          60% { stroke-dashoffset: 0; opacity: 0.35; } 
          100% { stroke-dashoffset: 2500; opacity: 0; } /* 隨著呼吸光暈隱去 */
        }
        @keyframes breatheGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); filter: blur(40px); }
          50% { opacity: 0.55; transform: scale(1.05); filter: blur(60px); } /* 琥珀光最亮 */
        }
        @keyframes dayToNight {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-draw-reveal {
          stroke-dasharray: 2500;
          animation: drawAndFade 20s ease-in-out infinite; /* 20秒一個呼吸週期 (日落而奢) */
        }
        .bg-day-night {
          background-size: 200% 200%;
          animation: dayToNight 20s ease-in-out infinite;
        }
      `}} />

      {/* 🌅 背景：日出而作，日落而奢的環境光呼吸變化 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0500] via-black to-[#05050a] bg-day-night z-0"></div>
      
      {/* 呼吸感的環境琥珀光暈 (配合日落而奢) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-600/10 z-1" style={{ animation: 'breatheGlow 20s infinite' }}></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-orange-900/10 z-1" style={{ animation: 'breatheGlow 20s infinite' }}></div>

      {/* 🏎️ 標誌性名車靈魂線條 SVG (Pagani, Bugatti, rolls Royce) 隨著呼吸顯露 */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-80">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          
          {/* Rolls Royce 靈魂：帕德嫩神廟格柵垂直線與精神神像輪廓 */}
          <path d="M 120 0 L 120 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.8" />
          <path d="M 140 0 L 140 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" />
          {/* 優雅的精神神像輪廓線 */}
          <path 
            d="M 50 100 Q 80 80, 110 100 T 170 80 T 200 100 M 110 100 C 120 120, 120 150, 110 170 C 100 190, 80 190, 70 170 C 60 150, 60 120, 70 100" 
            fill="transparent" 
            stroke="url(#rrGrad)" 
            strokeWidth="0.5" 
            className="animate-draw-reveal"
            style={{ animationDelay: '3s' }}
          />

          {/* Pagani 靈魂：疾風流線和侵略性前臉線條 */}
          <path 
            d="M -50 850 Q 250 700, 450 650 T 1150 450 M 350 730 C 400 700, 500 700, 550 730 M 450 650 C 460 670, 460 690, 450 710" 
            fill="transparent" 
            stroke="url(#paganiGrad)" 
            strokeWidth="1" 
            className="animate-draw-reveal"
            style={{ animationDelay: '0s' }}
          />

          {/* Bugatti 靈魂：經典 C-Line 側邊曲線和巨大馬蹄格柵線條 */}
          <path 
          d="M 880 150 C 980 150, 1000 450, 880 700 C 730 700, 730 400, 880 400 M 820 500 C 830 520, 830 540, 820 560" 
          fill="transparent" 
          stroke="url(#bugattiGrad)" 
          strokeWidth="1.2" 
          className="animate-draw-reveal"
          style={{ animationDelay: '1.5s' }}
          />

          {/* 定義 SVG 漸層色彩 (琥珀與香檳金) */}
          <defs>
            <linearGradient id="rrGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.4)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </linearGradient>
            <linearGradient id="paganiGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(251, 191, 36, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
            <linearGradient id="bugattiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.8)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 🌌 主視覺內容區：懸浮於光影線條之上 */}
      <section className="relative z-20 w-full min-h-[85vh] flex flex-col justify-center items-center text-center px-6">
        
        <div className="max-w-5xl w-full flex flex-col items-center mt-12">
          
          {/* 大標題 */}
          <h1 className="font-serif font-extralight text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] leading-tight mb-8">
            <span className="text-zinc-300 drop-shadow-md">THE ELITE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-600 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 25px rgba(251,191,36,0.25))' }}>
              AUTO CONCIERGE
            </span>
          </h1>

          {/* 詩意副標題 (中英混合) */}
          <p className="text-lg md:text-xl text-zinc-400 font-light tracking-[0.4em] mb-16 opacity-95">
            日出而作 <span className="mx-4 text-amber-500/40 font-thin">|</span> 
            <span className="text-amber-100">Sunrise to <span className="font-extralight text-amber-200">奢</span> (Sunset Luxe)</span>
          </p>
          
          {/* 讓人「一看就想溝通」的藝術級按鈕區 (解決字體走位與對齊問題) */}
          <div className="flex flex-col sm:flex-row gap-8 w-full max-w-3xl justify-center items-center mt-4">
            
            {/* GLOBAL FIND 按鈕 (Flex 佈局確保中英完美置中與對齊) */}
            <button className="group relative px-10 py-5 w-full sm:w-auto bg-black border border-amber-500/30 text-amber-100/90 font-light rounded-sm hover:border-amber-400/70 transition-all duration-700 overflow-hidden flex items-baseline justify-center">
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-amber-950/50 to-black group-hover:w-full transition-all duration-1000 ease-out z-0"></div>
              <span className="relative z-10 font-sans tracking-[0.25em] text-xs">GLOBAL FIND</span>
              <span className="relative z-10 text-amber-500/40 font-thin mx-3 text-lg">|</span>
              <span className="relative z-10 font-sans tracking-[0.2em] text-lg">全球尋車</span>
            </button>
            
            {/* VIP PORTAL 按鈕 (確保對齊和 Hover 金線置中) */}
            <Link href="/vip" className="px-10 py-5 w-full sm:w-auto text-zinc-500 font-light tracking-[0.25em] text-lg rounded-sm hover:text-zinc-200 transition-all duration-700 group flex items-baseline justify-center relative">
              <span className="font-sans tracking-[0.25em] text-xs">VIP PORTAL</span>
              <span className="text-zinc-700 font-thin mx-3 text-lg">|</span>
              <span className="font-sans tracking-[0.2em]">尊貴登入</span>
              {/* Hover 時底部出現優雅對齊的金線 */}
              <div className="absolute bottom-2 left-10 right-10 h-[1px] bg-amber-500/0 group-hover:bg-amber-500/50 transition-all duration-700"></div>
            </Link>

          </div>
        </div>
      </section>

      {/* 🕯️ 服務展示區：極簡留白，優雅呼吸 */}
      <section className="w-full relative z-20 bg-black pb-40 px-6 md:px-12 flex justify-center border-t-[0.5px] border-zinc-800/30 mt-10">
        
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20 pt-24">
          
          {[
            { en: 'DIVERSITY', hk: '名車多樣性', desc: '為您網羅 Pagani、Bugatti、Rolls Royce 等傳奇名車的獨特魂魄線條。' },
            { en: 'CROSS-BORDER', hk: '無縫跨境', desc: '專業代辦中港澳跨境指標手續，暢行大灣區，不受地域界限。' },
            { en: 'AI INTELLIGENCE', hk: '數位管家', desc: '由尋車、運輸至交車，專屬 AI 後台讓您隨時掌握藝術品的旅程。' },
          ].map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-default">
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
      <footer className="w-full py-12 text-center text-zinc-700 text-xs font-light tracking-[0.4em] bg-black relative z-20 border-t border-zinc-900/50">
        <p className="opacity-40 hover:opacity-100 transition-opacity duration-700">
          © {new Date().getFullYear()} GOLDLAND HK <span className="mx-2 font-extralight text-zinc-800">|</span> ELITE CONCIERGE
        </p>
      </footer>

    </main>
  )
}
