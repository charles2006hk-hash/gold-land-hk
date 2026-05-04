"use client"; // 啟用客戶端互動

import Link from 'next/link';
import { useState } from 'react';

export default function GlobalFind() {
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // 模擬 2.5 秒的傳輸與建檔過程
    setTimeout(() => {
      setStatus('success');
    }, 2500);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#030100] overflow-x-hidden font-sans relative selection:bg-amber-900/30 py-24 px-6">
      
      {/* 🌅 背景：頂部微弱的琥珀光 */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] transition-all duration-1000 pointer-events-none ${status === 'success' ? 'bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.15)_0%,rgba(0,0,0,0)_70%)]' : 'bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.05)_0%,rgba(0,0,0,0)_70%)]'}`}></div>

      {/* ⬅️ 返回首頁按鈕 */}
      <Link href="/" className={`absolute top-10 left-6 md:left-12 text-zinc-600 hover:text-amber-400 transition-all duration-500 text-xs tracking-[0.3em] flex items-center gap-3 z-20 group ${status === 'success' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <span className="transform group-hover:-translate-x-2 transition-transform duration-500">←</span> 
        <span>RETURN</span>
      </Link>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center min-h-[500px] justify-center mt-8">
        
        {/* 狀態：填寫表單 */}
        <div className={`w-full flex flex-col items-center transition-all duration-700 absolute ${status === 'success' ? 'opacity-0 -translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          <h1 className="font-serif font-extralight text-3xl md:text-4xl tracking-[0.2em] text-zinc-200 mb-4 text-center">
            GLOBAL ACQUISITION
          </h1>
          <p className="text-amber-600/60 text-xs md:text-sm tracking-[0.4em] mb-6 font-light text-center">
            全球稀世車源配對委託
          </p>
          <div className="w-12 h-[1px] bg-amber-500/30 mb-12"></div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <input type="text" required disabled={status === 'loading'} className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.15em] focus:outline-none focus:border-amber-500/50 transition-colors peer disabled:opacity-50" placeholder=" " />
                <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
                  MARQUE <span className="mx-2 font-thin text-zinc-700">|</span> 目標品牌
                </label>
              </div>
              <div className="relative group">
                <input type="text" required disabled={status === 'loading'} className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.15em] focus:outline-none focus:border-amber-500/50 transition-colors peer disabled:opacity-50" placeholder=" " />
                <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
                  MODEL / YEAR <span className="mx-2 font-thin text-zinc-700">|</span> 型號與年份
                </label>
              </div>
            </div>

            <div className="relative group">
              <input type="text" required disabled={status === 'loading'} className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.15em] focus:outline-none focus:border-amber-500/50 transition-colors peer disabled:opacity-50" placeholder=" " />
              <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
                CONTACT <span className="mx-2 font-thin text-zinc-700">|</span> 您的加密聯絡方式
              </label>
            </div>

            <div className="relative group mt-2">
              <textarea required disabled={status === 'loading'} rows="1" className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.1em] focus:outline-none focus:border-amber-500/50 transition-colors peer resize-none disabled:opacity-50" placeholder=" "></textarea>
              <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
                REQUIREMENTS <span className="mx-2 font-thin text-zinc-700">|</span> 特殊規格要求
              </label>
            </div>

            <button type="submit" disabled={status === 'loading'} className="mt-8 w-full py-5 bg-amber-950/10 border border-amber-500/30 text-amber-100/80 text-xs tracking-[0.4em] hover:bg-amber-900/30 hover:border-amber-500/60 transition-all duration-700 relative overflow-hidden group disabled:pointer-events-none">
              <span className={`relative z-10 font-light transition-opacity duration-300 ${status === 'loading' ? 'opacity-50 animate-pulse' : 'opacity-100'}`}>
                {status === 'loading' ? 'ENCRYPTING TRANSMISSION...' : 'INITIATE SEARCH'}
              </span>
            </button>
          </form>
        </div>

        {/* 狀態：送出成功動畫 */}
        <div className={`w-full flex flex-col items-center transition-all duration-1000 delay-300 absolute ${status === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <div className="w-16 h-16 border border-amber-500/50 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(217,119,6,0.2)]">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-amber-400 stroke-[1.5]">
              <path d="M20 6L9 17l-5-5" strokeDasharray="24" strokeDashoffset="0" className="animate-[dash_1s_ease-out_forwards]" />
            </svg>
          </div>
          <h2 className="font-serif font-extralight text-2xl md:text-3xl tracking-[0.3em] text-amber-100 mb-6 text-center">
            PROTOCOL INITIATED
          </h2>
          <p className="text-zinc-400 text-sm tracking-[0.2em] font-light text-center leading-loose max-w-lg">
            尋車協議已正式啟動。<br/>您的委託已加密傳送至金田汽車全球管家網絡。<br/>專屬負責人將於 24 小時內與您聯繫。
          </p>
          
          <Link href="/" className="mt-16 text-amber-600/60 hover:text-amber-400 transition-colors duration-500 text-xs tracking-[0.3em] border-b border-amber-900/50 pb-1">
            RETURN TO LOBBY
          </Link>
        </div>

      </div>

      {/* 隱藏的 SVG 繪製動畫 */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </main>
  );
}
