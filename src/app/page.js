import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black overflow-hidden font-sans selection:bg-amber-900/30 relative">
      
      <style dangerouslySetInnerHTML={{__html: `
        /* 🏎️ 高速光影疾風動畫 */
        @keyframes streakLine {
          0% { stroke-dashoffset: 2500; opacity: 0; }
          10% { stroke-dashoffset: 0; opacity: 0.8; } 
          40% { stroke-dashoffset: 0; opacity: 0.15; } 
          100% { stroke-dashoffset: 2500; opacity: 0; } 
        }
        /* 🌅 環境琥珀呼吸光暈 */
        @keyframes breatheGlow {
          0%, 100% { opacity: 0.1; transform: scale(1); filter: blur(50px); }
          50% { opacity: 0.4; transform: scale(1.05); filter: blur(70px); }
        }
        /* 🌌 完美羽化的超跑部件呼吸顯露 */
        @keyframes breatheParts {
          0%, 100% { opacity: 0.05; transform: scale(1.02); }
          50% { opacity: 0.35; transform: scale(1); } /* 亮度適中，避免泛白 */
        }
        /* ⬇️ 向下滾動引導呼吸 */
        @keyframes breatheGuide {
          0%, 100% { opacity: 0.2; transform: translate(-50%, 0px); }
          50% { opacity: 0.8; transform: translate(-50%, 10px); }
        }
        /* 日出而作，日落而奢背景動畫 */
        @keyframes dayToNight {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* 🔴 關鍵修復：極致柔和的邊緣羽化遮罩，徹底消滅生硬邊界 */
        .mask-soft {
          -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%);
          mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%);
        }

        .animate-streak { animation: streakLine 1.5s ease-out infinite; }
        .animate-breathe-parts { animation: breatheParts 12s ease-in-out infinite; }
        .animate-breathe-guide { animation: breatheGuide 3s ease-in-out infinite; }
        .bg-day-night { background-size: 200% 200%; animation: dayToNight 30s ease-in-out infinite; }
      `}} />

      {/* 🟢 第0層：純黑漸層背景 (確保最底層夠黑) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050200] via-black to-black bg-day-night z-0"></div>

      {/* 🟢 第1層：千萬級別超跑部件 (使用 mask-soft 完美融入黑暗) */}
      <div className="absolute inset-0 z-1 pointer-events-none animate-breathe-parts mix-blend-lighten">
        
        {/* 神車 1 號位 (左上方)：預留給 Pagani Utopia 或 De Tomaso P72 的金屬流線 */}
        {/* 💡 開發指南：未來將 src 改為 "/pagani-utopia.jpg" */}
        <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[70vh] mask-soft">
          <img 
            src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1500&q=80" 
            alt="Pagani Utopia Style Detail"
            className="w-full h-full object-cover object-center opacity-80" 
          />
        </div>

        {/* 神車 2 號位 (右下方)：預留給 Rolls Royce Boat Tail 的奢華車尾或立標 */}
        {/* 💡 開發指南：未來將 src 改為 "/rr-boat-tail.jpg" */}
        <div className="absolute -bottom-[10%] -right-[5%] w-[55vw] h-[70vh] mask-soft">
          <img 
            src="https://images.unsplash.com/photo-1631828117621-0a6962fdd250?auto=format&fit=crop&w=1500&q=80" 
            alt="Rolls Royce Boat Tail Style"
            className="w-full h-full object-cover object-left opacity-90" 
          />
        </div>

        {/* 神車 3 號位 (正下方/偏中)：預留給 Ferrari 812 Competizione 的侵略性排氣管或尾燈 */}
        {/* 💡 開發指南：未來將 src 改為 "/ferrari-812.jpg" */}
        <div className="absolute bottom-[5%] left-[20%] w-[50vw] h-[60vh] mask-soft">
          <img 
            src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1500&q=80" 
            alt="Ferrari 812 Competizione Style"
            className="w-full h-full object-cover object-bottom opacity-70" 
          />
        </div>
      </div>
      
      {/* 🌅 第2層：環境琥珀光暈 (降低亮度，避免干擾車輛細節) */}
      <div className="absolute top-[0%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-amber-600/5 z-2 mix-blend-screen" style={{ animation: 'breatheGlow 15s infinite' }}></div>
      <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-orange-900/5 z-2 mix-blend-screen" style={{ animation: 'breatheGlow 15s infinite alternate-reverse' }}></div>

      {/* 🏎️ 第3層：SVG 靈魂線條 */}
      <div className="absolute inset-0 z-3 pointer-events-none opacity-80">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <path d="M -50 850 Q 250 700, 450 650 T 1150 450 M 350 730 C 400 700, 500 700, 550 730 M 450 650 C 460 670, 460 690, 450 710" fill="transparent" stroke="url(#paganiGrad)" strokeWidth="1" className="animate-streak" style={{ animationDelay: '0s' }} />
          <path d="M 120 0 L 120 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="0.8" className="animate-streak" style={{ animationDelay: '2.5s' }} />
          <path d="M 140 0 L 140 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" className="animate-streak" style={{ animationDelay: '2.5s' }} />
          <path d="M 880 150 C 980 150, 1000 450, 880 700 C 730 700, 730 400, 880 400 M 820 500 C 830 520, 830 540, 820 560" fill="transparent" stroke="url(#bugattiGrad)" strokeWidth="1.2" className="animate-streak" style={{ animationDelay: '0.8s' }} />

          <defs>
            <linearGradient id="paganiGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(251, 191, 36, 0.6)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
            <linearGradient id="bugattiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.6)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 🌌 第4層：主視覺內容區 */}
      <section className="relative z-20 w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pb-32">
        <div className="max-w-5xl w-full flex flex-col items-center mt-12 mb-16 relative z-30">
          
          <h1 className="font-serif font-extralight text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] leading-tight mb-8">
            <span className="text-zinc-300 drop-shadow-md">THE ELITE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-600 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 25px rgba(251,191,36,0.25))' }}>
              AUTO CONCIERGE
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 font-light tracking-[0.4em] mb-16 opacity-95">
            日出而作 <span className="mx-4 text-amber-500/40 font-thin">|</span> 
            <span className="text-amber-100/90 hover:text-amber-100 transition-colors duration-500 relative cursor-default">
              日落而<span className="text-amber-200">奢</span> (Sunset Luxe)
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 w-full max-w-3xl justify-center items-center mt-4">
            <button className="group relative px-10 py-5 w-full sm:w-auto bg-black/40 backdrop-blur-md border border-amber-500/30 text-amber-100/90 font-light rounded-sm hover:border-amber-400/70 transition-all duration-700 overflow-hidden flex items-baseline justify-center">
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-amber-950/50 to-black/50 group-hover:w-full transition-all duration-1000 ease-out z-0"></div>
              <span className="relative z-10 font-sans tracking-[0.25em] text-xs">GLOBAL FIND</span>
              <span className="relative z-10 text-amber-500/40 font-thin mx-3 text-lg">|</span>
              <span className="relative z-10 font-sans tracking-[0.2em] text-lg">全球尋車</span>
            </button>
            
            <Link href="/vip" className="px-10 py-5 w-full sm:w-auto text-zinc-400 font-light tracking-[0.25em] text-lg rounded-sm hover:text-zinc-200 transition-all duration-700 group flex items-baseline justify-center relative">
              <span className="font-sans tracking-[0.25em] text-xs">VIP PORTAL</span>
              <span className="text-zinc-700 font-thin mx-3 text-lg">|</span>
              <span className="font-sans tracking-[0.2em]">尊貴登入</span>
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

      {/* 🕯️ 服務展示區 */}
      <section className="w-full relative z-20 bg-black pb-40 px-6 md:px-12 flex justify-center border-t-[0.5px] border-zinc-800/30 mt-10">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20 pt-24 relative overflow-hidden">
          <div className="absolute top-0 -left-1/2 w-[120vw] h-[120vw] rounded-full bg-amber-900/5" style={{ animation: 'breatheGlow 25s infinite' }}></div>
          
          {[
            { en: 'DIVERSITY', hk: '名車多樣性', desc: '為您網羅 Pagani Utopia、De Tomaso P72 等千萬級別之稀世珍藏。' },
            { en: 'CROSS-BORDER', hk: '無縫跨境', desc: '專業代辦中港澳跨境指標手續，暢行大灣區，不受地域界限。' },
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
      <footer className="w-full py-12 text-center text-zinc-700 text-xs font-light tracking-[0.4em] bg-black relative z-20 border-t border-zinc-900/50">
        <p className="opacity-40 hover:opacity-100 transition-opacity duration-700">
          © {new Date().getFullYear()} GOLDLAND HK <span className="mx-2 font-extralight text-zinc-800">|</span> ELITE CONCIERGE
        </p>
      </footer>
    </main>
  )
}
