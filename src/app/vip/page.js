import Link from 'next/link';

export default function VipPortal() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#030100] overflow-hidden font-sans relative selection:bg-amber-900/30">
      
      {/* 🌅 背景：深邃的琥珀色環境微光 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-amber-600/5 blur-[100px] pointer-events-none"></div>

      {/* ⬅️ 返回首頁按鈕 */}
      <Link href="/" className="absolute top-10 left-6 md:left-12 text-zinc-600 hover:text-amber-400 transition-colors duration-500 text-xs tracking-[0.3em] flex items-center gap-3 z-20 group">
        <span className="transform group-hover:-translate-x-2 transition-transform duration-500">←</span> 
        <span>RETURN</span>
      </Link>

      {/* 🔐 登入區塊 */}
      <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center">
        
        {/* 幾何奢華 Logo 佔位 (金田汽車加密徽飾) */}
        <div className="w-12 h-12 border-[0.5px] border-amber-500/30 rotate-45 mb-10 flex items-center justify-center relative">
          <div className="w-8 h-8 border-[0.5px] border-amber-500/20 -rotate-45 flex items-center justify-center absolute">
            <div className="w-1 h-1 bg-amber-500/50 rounded-full"></div>
          </div>
        </div>

        <h1 className="font-serif font-extralight text-3xl tracking-[0.3em] text-zinc-200 mb-3">
          PRIVATE PORTAL
        </h1>
        <p className="text-amber-600/50 text-xs tracking-[0.5em] mb-16 font-light">
          尊貴客戶加密通道
        </p>

        {/* 極簡表單 */}
        <form className="w-full flex flex-col gap-10">
          
          {/* 浮動標籤輸入框：CLIENT ID */}
          <div className="relative group">
            <input 
              type="text" 
              required 
              className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.2em] focus:outline-none focus:border-amber-500/50 transition-colors peer" 
              placeholder=" " 
            />
            <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
              CLIENT ID <span className="mx-2 font-thin text-zinc-700">|</span> 貴賓編號
            </label>
          </div>

          {/* 浮動標籤輸入框：ACCESS KEY */}
          <div className="relative group">
            <input 
              type="password" 
              required 
              className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.2em] focus:outline-none focus:border-amber-500/50 transition-colors peer" 
              placeholder=" " 
            />
            <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
              ACCESS KEY <span className="mx-2 font-thin text-zinc-700">|</span> 專屬金鑰
            </label>
          </div>

          {/* 認證按鈕 */}
          <button type="button" className="mt-6 w-full py-5 border border-amber-500/30 text-amber-100/80 text-xs tracking-[0.4em] hover:bg-amber-900/20 hover:border-amber-500/60 transition-all duration-700 relative overflow-hidden group">
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-amber-950/40 to-transparent group-hover:w-full transition-all duration-1000 ease-out z-0"></div>
            <span className="relative z-10 font-light">AUTHENTICATE</span>
          </button>
        </form>

        <div className="mt-16 text-center">
          <p className="text-zinc-700 text-[9px] tracking-[0.3em] font-light">
            SECURED BY ELITE QUANTUM ENCRYPTION
          </p>
        </div>
      </div>
    </main>
  );
}
