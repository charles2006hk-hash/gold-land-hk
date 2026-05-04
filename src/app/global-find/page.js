import Link from 'next/link';

export default function GlobalFind() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#030100] overflow-x-hidden font-sans relative selection:bg-amber-900/30 py-24 px-6">
      
      {/* 🌅 背景：頂部微弱的琥珀光 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.05)_0%,rgba(0,0,0,0)_70%)] pointer-events-none"></div>

      {/* ⬅️ 返回首頁按鈕 */}
      <Link href="/" className="absolute top-10 left-6 md:left-12 text-zinc-600 hover:text-amber-400 transition-colors duration-500 text-xs tracking-[0.3em] flex items-center gap-3 z-20 group">
        <span className="transform group-hover:-translate-x-2 transition-transform duration-500">←</span> 
        <span>RETURN</span>
      </Link>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center mt-12">
        
        {/* 標題區 */}
        <h1 className="font-serif font-extralight text-3xl md:text-4xl tracking-[0.2em] text-zinc-200 mb-4 text-center">
          GLOBAL ACQUISITION
        </h1>
        <p className="text-amber-600/60 text-xs md:text-sm tracking-[0.4em] mb-6 font-light text-center">
          全球稀世車源配對委託
        </p>
        <div className="w-12 h-[1px] bg-amber-500/30 mb-16"></div>

        <p className="text-zinc-400 text-sm tracking-[0.1em] font-light leading-relaxed text-center mb-16 max-w-lg">
          無論是限量版 Hypercar 或經典絕版古董車，請提供您的夢想規格。我們的全球尋車管家將啟動加密網絡為您尋獲。
        </p>

        {/* 尋車表單 */}
        <form className="w-full flex flex-col gap-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* 品牌 / Marque */}
            <div className="relative group">
              <input type="text" required className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.15em] focus:outline-none focus:border-amber-500/50 transition-colors peer" placeholder=" " />
              <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
                MARQUE <span className="mx-2 font-thin text-zinc-700">|</span> 目標品牌
              </label>
            </div>

            {/* 型號 / Model */}
            <div className="relative group">
              <input type="text" required className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.15em] focus:outline-none focus:border-amber-500/50 transition-colors peer" placeholder=" " />
              <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
                MODEL / YEAR <span className="mx-2 font-thin text-zinc-700">|</span> 型號與年份
              </label>
            </div>
          </div>

          {/* 聯絡方式 / Contact */}
          <div className="relative group">
            <input type="text" required className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.15em] focus:outline-none focus:border-amber-500/50 transition-colors peer" placeholder=" " />
            <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
              WHATSAPP / EMAIL <span className="mx-2 font-thin text-zinc-700">|</span> 加密聯絡方式
            </label>
          </div>

          {/* 備註 / Requirements */}
          <div className="relative group mt-4">
            <textarea required rows="1" className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.1em] focus:outline-none focus:border-amber-500/50 transition-colors peer resize-none" placeholder=" "></textarea>
            <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
              SPECIFIC REQUIREMENTS <span className="mx-2 font-thin text-zinc-700">|</span> 特殊規格要求
            </label>
          </div>

          {/* 提交按鈕 */}
          <button type="button" className="mt-8 w-full py-5 bg-amber-950/10 border border-amber-500/30 text-amber-100/80 text-xs tracking-[0.4em] hover:bg-amber-900/30 hover:border-amber-500/60 transition-all duration-700 relative overflow-hidden group">
            <span className="relative z-10 font-light">INITIATE SEARCH <span className="mx-2 font-thin text-amber-600/50">|</span> 啟動尋車</span>
          </button>
        </form>

      </div>
    </main>
  );
}
