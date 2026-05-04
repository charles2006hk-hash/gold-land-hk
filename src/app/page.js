import Link from 'next/link';

{/* 🛰️ 頂部導覽列 (加入首頁最上方) */}
<nav className="fixed top-0 w-full z-50 flex justify-between items-baseline px-6 md:px-12 py-10 pointer-events-none">
  <div className="text-zinc-400 font-serif tracking-[0.4em] text-sm pointer-events-auto cursor-default">
    GOLDLAND <span className="text-amber-600/50 font-thin">|</span> HK
  </div>
  <div className="flex gap-12 pointer-events-auto">
    <Link href="/collection" className="text-zinc-500 hover:text-amber-400 transition-colors duration-500 text-[10px] tracking-[0.4em]">
      COLLECTION
    </Link>
    <Link href="/vip" className="text-zinc-500 hover:text-amber-400 transition-colors duration-500 text-[10px] tracking-[0.4em]">
      MEMBERS
    </Link>
  </div>
</nav>

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black overflow-hidden font-sans selection:bg-amber-900/30 relative">
      
      {/* 注入自訂的 CSS 動畫 */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes streakLine {
          0% { stroke-dashoffset: 2500; opacity: 0; }
          10% { stroke-dashoffset: 0; opacity: 0.6; } 
          40% { stroke-dashoffset: 0; opacity: 0.1; } 
          100% { stroke-dashoffset: 2500; opacity: 0; } 
        }
        @keyframes breatheGlow {
          0%, 100% { opacity: 0.05; transform: scale(1); filter: blur(50px); }
          50% { opacity: 0.3; transform: scale(1.05); filter: blur(70px); }
        }
        /* 🌌 極致奢華：壓低亮度和透明度，提高灰階，只留反光 */
        @keyframes breatheParts {
          0%, 100% { opacity: 0.05; transform: scale(1.02); filter: grayscale(90%) brightness(0.5); }
          50% { opacity: 0.20; transform: scale(1); filter: grayscale(70%) brightness(0.9); } 
        }
        @keyframes breatheGuide {
          0%, 100% { opacity: 0.1; transform: translate(-50%, 0px); }
          50% { opacity: 0.6; transform: translate(-50%, 10px); }
        }
        .animate-streak { animation: streakLine 1.5s ease-out infinite; }
        .animate-breathe-parts { animation: breatheParts 15s ease-in-out infinite; }
        .animate-breathe-guide { animation: breatheGuide 3s ease-in-out infinite; }
      `}} />

      {/* 🟢 第 0 層：深淵純黑背景 */}
      <div className="absolute inset-0 bg-[#030100] z-0"></div>

      {/* 🟢 第 1 層：神車部位幽靈顯露 (使用 linear-gradient 實現無痕邊緣消散) */}
      <div className="absolute top-0 left-0 w-full h-screen z-1 pointer-events-none mix-blend-screen overflow-hidden">
        
        {/* 神車 1：Pagani (鎖定在最左側，向右漸隱化為無形) */}
        <div 
          className="absolute top-0 left-0 w-[40vw] h-screen animate-breathe-parts"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%)',
            maskImage: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%)',
            animationDelay: '0s'
          }}
        >
          <img src="/pagani.png" alt="Pagani Detail" className="w-full h-full object-cover object-left" />
        </div>

        {/* 神車 2：Rolls Royce (鎖定在最右側，向左漸隱化為無形) */}
        <div 
          className="absolute top-0 right-0 w-[40vw] h-screen animate-breathe-parts"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 80%)',
            animationDelay: '7s' /* 錯開呼吸時間，營造流動感 */
          }}
        >
          <img src="/rollsroyce.png" alt="Rolls Royce Detail" className="w-full h-full object-cover object-right" />
        </div>
      </div>
      
      {/* 🌅 第 2 層：環境琥珀微光 (大幅降低存在感，只做為底蘊) */}
      <div className="absolute top-0 left-0 w-full h-screen z-2 pointer-events-none mix-blend-screen overflow-hidden">
        <div className="absolute top-[0%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-amber-600/10" style={{ animation: 'breatheGlow 20s infinite' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-orange-900/10" style={{ animation: 'breatheGlow 20s infinite alternate-reverse' }}></div>
      </div>

      {/* 🏎️ 第 3 層：SVG 靈魂光影線條 (流線速度感) */}
      <div className="absolute top-0 left-0 w-full h-screen z-3 pointer-events-none opacity-60 overflow-hidden">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <path d="M -50 850 Q 250 700, 450 650 T 1150 450 M 350 730 C 400 700, 500 700, 550 730" fill="transparent" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="0.8" className="animate-streak" style={{ animationDelay: '0s' }} />
          <path d="M 120 0 L 120 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.5" className="animate-streak" style={{ animationDelay: '3s' }} />
          <path d="M 140 0 L 140 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.01)" strokeWidth="0.5" className="animate-streak" style={{ animationDelay: '3s' }} />
          <path d="M 880 150 C 980 150, 1000 450, 880 700 C 730 700, 730 400, 880 400" fill="transparent" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1" className="animate-streak" style={{ animationDelay: '1s' }} />
        </svg>
      </div>

      {/* 🌌 第 4 層：主視覺文字內容區 (保持絕對置中大器) */}
      <section className="relative z-20 w-full min-h-screen flex flex-col justify-center items-center text-center px-6 pb-32">
        <div className="max-w-5xl w-full flex flex-col items-center mt-12 mb-16 relative z-30">
          
          <h1 className="font-serif font-extralight text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] leading-tight mb-8">
            <span className="text-zinc-300 drop-shadow-md">THE ELITE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-600 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 25px rgba(251,191,36,0.15))' }}>
              AUTO CONCIERGE
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 font-light tracking-[0.4em] mb-16 opacity-90">
            日出而作 <span className="mx-4 text-amber-500/30 font-thin">|</span> 
            <span className="text-amber-100/80 hover:text-amber-100 transition-colors duration-500 relative cursor-default">
              日落而<span className="text-amber-200">奢</span> (Sunset Luxe)
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 w-full max-w-3xl justify-center items-center mt-4">
            <Link href="/global-find" className="group relative px-10 py-5 w-full sm:w-auto bg-black/40 backdrop-blur-md border border-amber-500/20 text-amber-100/80 font-light rounded-sm hover:border-amber-400/50 transition-all duration-700 overflow-hidden flex items-baseline justify-center">
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-amber-950/40 to-black/50 group-hover:w-full transition-all duration-1000 ease-out z-0"></div>
              <span className="relative z-10 font-sans tracking-[0.25em] text-xs">GLOBAL FIND</span>
              <span className="relative z-10 text-amber-500/30 font-thin mx-3 text-lg">|</span>
              <span className="relative z-10 font-sans tracking-[0.2em] text-lg">全球尋車</span>
            </Link>
            
            <Link href="/vip" className="px-10 py-5 w-full sm:w-auto text-zinc-400 font-light tracking-[0.25em] text-lg rounded-sm hover:text-zinc-200 transition-all duration-700 group flex items-baseline justify-center relative">
              <span className="font-sans tracking-[0.25em] text-xs">VIP PORTAL</span>
              <span className="text-zinc-700 font-thin mx-3 text-lg">|</span>
              <span className="font-sans tracking-[0.2em]">尊貴登入</span>
              <div className="absolute bottom-2 left-10 right-10 h-[1px] bg-amber-500/0 group-hover:bg-amber-500/40 transition-all duration-700"></div>
            </Link>
          </div>
        </div>

        {/* ⬇️ 向下滾動引導 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-breathe-guide z-20 pointer-events-none opacity-60 flex flex-col items-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-amber-500 stroke-[0.5] mb-2">
            <path d="M12 21V3M12 21L17 16M12 21L7 16" />
          </svg>
          <div className="text-amber-600/50 font-light tracking-[0.3em] text-[10px] absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            EXPLORE THE LUXE
          </div>
        </div>
      </section>

      {/* 🕯️ 服務展示區 */}
      <section className="w-full relative z-20 bg-black pb-40 px-6 md:px-12 flex justify-center border-t-[0.5px] border-zinc-800/30 mt-10">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-20 pt-24 relative overflow-hidden">
          
          <div className="absolute top-0 -left-1/2 w-[120vw] h-[120vw] rounded-full bg-amber-900/5" style={{ animation: 'breatheGlow 30s infinite' }}></div>
          
          {[
            { en: 'GLOBAL ACQUISITION', hk: '全球車源配對', desc: '從日本直連、歐洲訂製至千萬級之傳奇魂魄，精準尋獲您的稀世珍藏。' },
            { en: 'CROSS-BORDER LOGISTICS', hk: '一站式跨境引進', desc: '訂購、運輸、出牌、倉存一條龍。專業中港澳跨境指標手續辦理。' },
            { en: 'AI INTELLIGENCE', hk: '數位管家', desc: '數位化 AI 管家程序管理，VIP 客戶專屬後台即時追蹤愛車旅程。' },
          ].map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-default relative z-10">
              <h3 className="font-serif font-extralight text-2xl tracking-[0.2em] text-zinc-300 mb-5 group-hover:text-amber-300 transition-colors duration-700">
                {service.en}
              </h3>
              
              <div className="flex flex-col items-center mb-7">
                <span className="text-sm font-light text-amber-600/60 tracking-[0.3em] mb-4 group-hover:text-amber-500 transition-colors duration-700">
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
