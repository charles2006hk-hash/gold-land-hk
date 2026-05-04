import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black overflow-hidden font-sans selection:bg-amber-900/30 relative">
      
      {/* 注入自訂的 CSS 動畫 (處理呼吸感與線條生長) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes drawLine {
          0% { stroke-dashoffset: 2000; opacity: 0; }
          50% { opacity: 0.6; }
          100% { stroke-dashoffset: 0; opacity: 0.3; }
        }
        @keyframes breatheGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); filter: blur(40px); }
          50% { opacity: 0.5; transform: scale(1.05); filter: blur(60px); }
        }
        @keyframes dayToNight {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-draw {
          stroke-dasharray: 2000;
          animation: drawLine 8s ease-in-out forwards, breatheGlow 12s ease-in-out 8s infinite alternate;
        }
        .bg-day-night {
          background-size: 200% 200%;
          animation: dayToNight 20s ease-in-out infinite;
        }
      `}} />

      {/* 🌅 背景：日出而作，日落而奢的環境光變化 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0500] via-black to-[#05050a] bg-day-night z-0"></div>
      
      {/* 呼吸感的環境光暈 (Sunrise to Sunset 琥珀光) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-amber-600/10" style={{ animation: 'breatheGlow 15s infinite alternate' }}></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-orange-900/10" style={{ animation: 'breatheGlow 18s infinite alternate-reverse' }}></div>

      {/* 🏎️ 靈魂線條 SVG 畫布 (名車抽象輪廓) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          
          {/* Bugatti 靈魂：經典 C-Line 側邊曲線 (優雅的半圓弧) */}
          <path 
            d="M 850 200 C 950 200, 980 500, 850 750 C 700 750, 700 450, 850 450" 
            fill="transparent" 
            stroke="url(#bugattiGrad)" 
            strokeWidth="1.5" 
            className="animate-draw"
          />
          
          {/* Pagani 靈魂：空氣動力學的銳利流線 (貫穿畫面的疾風線) */}
          <path 
            d="M -100 800 Q 300 600, 500 500 T 1100 200" 
            fill="transparent" 
            stroke="url(#paganiGrad)" 
            strokeWidth="1" 
            className="animate-draw"
            style={{ animationDelay: '1s' }}
          />

          {/* Rolls Royce 靈魂：帕德嫩神廟的莊嚴垂直線與腰線 */}
          <path d="M 150 0 L 150 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
          <path d="M 170 0 L 170 1000" fill="transparent" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
          <path d="M 0 350 L 1000 350" fill="transparent" stroke="rgba(251, 191, 36, 0.08)" strokeWidth="0.5" className="animate-draw" style={{ animationDelay: '2s' }} />

          {/* 定義 SVG 漸層色彩 */}
          <defs>
            <linearGradient id="bugattiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.8)" /> {/* 琥珀金 */}
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
            </linearGradient>
            <linearGradient id="paganiGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
              <stop offset="50%" stopColor="rgba(251, 191, 36, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 🌌 主視覺內容區：懸浮於光影線條之上 */}
      <section className="relative z-20 w-full min-h-[85vh] flex flex-col justify-center items-center text-center px-6">
        
        <div className="max-w-5xl w-full flex flex-col items-center mt-12">
          
          {/* 日落而奢的大標題 */}
          <h1 className="font-serif font-extralight text-5xl md:text-7xl lg:text-8xl tracking-[0.25em] leading-tight mb-8">
            <span className="text-zinc-300 drop-shadow-md">THE ELITE</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-amber-600 drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.2))' }}>
              AUTO CONCIERGE
            </span>
          </h1>

          {/* 詩意的副標題 */}
          <p className="text-lg md:text-xl text-zinc-400 font-light tracking-[0.4em] mb-16 opacity-90">
            日出而作 <span className="mx-4 text-amber-500/40">|</span> 日落而<span className="text-amber-200">奢</span>
          </p>
          
          {/* 讓人「一看就想溝通」的聯絡/登入按鈕區 */}
          <div className="flex flex-col sm:flex-row gap-8 w-full max-w-2xl justify-center items-center mt-4">
            
            {/* 專屬品鑑按鈕：帶有發光外暈，吸引點擊 */}
            <button className="group relative px-10 py-4 w-full sm:w-auto bg-black border border-amber-500/40 text-amber-100/90 font-light tracking-[0.2em] text-sm hover:border-amber-400 transition-all duration-700 overflow-hidden">
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-amber-900/40 to-black group-hover:w-full transition-all duration-1000 ease-out z-0"></div>
              <span className="relative z-10">PRIVATE CONSULT <span className="mx-3 text-amber-500/50 font-thin">|</span> 專屬品鑑</span>
            </button>
            
            <Link href="/vip" className="px-10 py-4 w-full sm:w-auto text-zinc-500 font-light tracking-[0.2em] text-sm hover:text-zinc-200 transition-all duration-700 relative group">
              VIP PORTAL <span className="mx-3 text-zinc-700 font-thin">|</span> 尊貴登入
              {/* Hover 時底部出現優雅金線 */}
              <div className="absolute bottom-2 left-10 right-10 h-[1px] bg-amber-500/0 group-hover:bg-amber-500/50 transition-all duration-700"></div>
            </Link>

          </div>
        </div>
      </section>

      {/* 🕯️ 服務展示區：極簡留白，讓內容自己說話 */}
      <section className="w-full relative z-20 bg-black pb-32 px-6 md:px-12 flex justify-center">
        
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16 border-t-[0.5px] border-zinc-800/40 pt-20">
          
          {[
            { en: 'DIVERSITY', hk: '名車多樣性', desc: '從頂尖超跑到奢華房車，我們精準捕捉每一款名車的獨特靈魂。' },
            { en: 'CROSS-BORDER', hk: '無縫跨境', desc: '專辦中港澳指標手續，讓您的愛車自由穿梭大灣區，不受地域界限。' },
            { en: 'AI INTELLIGENCE', hk: '數位管家', desc: '由訂購、運輸至交車，專屬 AI 後台讓您隨時掌控藝術品的旅程。' },
          ].map((service, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-default">
              <h3 className="font-serif font-extralight text-2xl tracking-[0.2em] text-zinc-300 mb-4 group-hover:text-amber-300 transition-colors duration-700">
                {service.en}
              </h3>
              
              <div className="flex flex-col items-center mb-6">
                <span className="text-sm font-light text-amber-600/70 tracking-[0.3em] mb-4 group-hover:text-amber-500 transition-colors duration-700">
                  {service.hk}
                </span>
                <div className="w-2 h-[1px] bg-zinc-700 group-hover:w-16 group-hover:bg-amber-500 transition-all duration-1000 ease-out"></div>
              </div>
              
              <p className="text-zinc-500 font-light text-sm tracking-[0.1em] leading-loose max-w-[280px] group-hover:text-zinc-400 transition-colors duration-700">
                {service.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* 🖋️ Footer */}
      <footer className="w-full py-12 text-center text-zinc-700 text-xs font-light tracking-[0.4em] bg-black relative z-20">
        <p className="opacity-40 hover:opacity-100 transition-opacity duration-700">
          © {new Date().getFullYear()} GOLDLAND HK <span className="mx-2 font-extralight text-zinc-800">|</span> ELITE CONCIERGE
        </p>
      </footer>

    </main>
  )
}
