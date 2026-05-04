"use client"; // 必須加在第一行，啟用客戶端互動

import Link from 'next/link';
import { useState } from 'react';

export default function VipPortal() {
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleAuth = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // 模擬 2 秒的加密驗證過程
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#030100] overflow-hidden font-sans relative selection:bg-amber-900/30">
      
      {/* 🌅 背景：深邃的琥珀色環境微光 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-amber-600/5 blur-[100px] pointer-events-none transition-all duration-1000" style={{ opacity: status === 'success' ? 0.8 : 0.5 }}></div>

      {/* ⬅️ 返回首頁按鈕 */}
      <Link href="/" className={`absolute top-10 left-6 md:left-12 text-zinc-600 hover:text-amber-400 transition-all duration-500 text-xs tracking-[0.3em] flex items-center gap-3 z-20 group ${status === 'success' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <span className="transform group-hover:-translate-x-2 transition-transform duration-500">←</span> 
        <span>RETURN</span>
      </Link>

      {/* 🔐 核心區塊 */}
      <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center min-h-[400px] justify-center">
        
        {/* 幾何奢華 Logo */}
        <div className={`w-12 h-12 border-[0.5px] border-amber-500/30 rotate-45 mb-10 flex items-center justify-center relative transition-all duration-1000 ${status === 'success' ? 'scale-150 border-amber-400/50 shadow-[0_0_30px_rgba(217,119,6,0.2)]' : ''}`}>
          <div className={`w-8 h-8 border-[0.5px] border-amber-500/20 -rotate-45 flex items-center justify-center absolute transition-transform duration-1000 ${status === 'loading' ? 'animate-spin' : ''}`}>
            <div className={`w-1 h-1 rounded-full transition-colors duration-500 ${status === 'success' ? 'bg-amber-400' : 'bg-amber-500/50'}`}></div>
          </div>
        </div>

        {/* 狀態：等待登入 或 驗證中 */}
        <div className={`w-full flex flex-col items-center transition-all duration-700 absolute ${status === 'success' ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          <h1 className="font-serif font-extralight text-3xl tracking-[0.3em] text-zinc-200 mb-3 text-center">
            PRIVATE PORTAL
          </h1>
          <p className="text-amber-600/50 text-xs tracking-[0.5em] mb-16 font-light text-center">
            尊貴客戶加密通道
          </p>

          <form onSubmit={handleAuth} className="w-full flex flex-col gap-10">
            <div className="relative group">
              <input type="text" required disabled={status === 'loading'} className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.2em] focus:outline-none focus:border-amber-500/50 transition-colors peer disabled:opacity-50" placeholder=" " />
              <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
                CLIENT ID <span className="mx-2 font-thin text-zinc-700">|</span> 貴賓編號
              </label>
            </div>

            <div className="relative group">
              <input type="password" required disabled={status === 'loading'} className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.2em] focus:outline-none focus:border-amber-500/50 transition-colors peer disabled:opacity-50" placeholder=" " />
              <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
                ACCESS KEY <span className="mx-2 font-thin text-zinc-700">|</span> 專屬金鑰
              </label>
            </div>

            <button type="submit" disabled={status === 'loading'} className="mt-6 w-full py-5 border border-amber-500/30 text-amber-100/80 text-xs tracking-[0.4em] hover:bg-amber-900/20 hover:border-amber-500/60 transition-all duration-700 relative overflow-hidden group disabled:pointer-events-none">
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-amber-950/40 to-transparent group-hover:w-full transition-all duration-1000 ease-out z-0"></div>
              <span className="relative z-10 font-light">
                {status === 'loading' ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
              </span>
            </button>
          </form>
          
          <div className="mt-16 text-center">
            <p className="text-zinc-700 text-[9px] tracking-[0.3em] font-light">
              SECURED BY ELITE QUANTUM ENCRYPTION
            </p>
          </div>
        </div>

        {/* 狀態：登入成功動畫 */}
        <div className={`w-full flex flex-col items-center transition-all duration-1000 delay-300 absolute ${status === 'success' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
          <h2 className="font-serif font-extralight text-2xl tracking-[0.3em] text-amber-100 mb-6 text-center">
            IDENTITY VERIFIED
          </h2>
          <div className="w-12 h-[1px] bg-amber-500/50 mb-6"></div>
          <p className="text-zinc-400 text-sm tracking-[0.2em] font-light text-center leading-loose">
            歡迎登入，尊貴的客戶。<br/>正在為您建立專屬安全連線...
          </p>
        </div>

      </div>
    </main>
  );
}
