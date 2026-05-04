"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function VipPortal() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, dashboard

  const handleAuth = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // 模擬 2 秒的加密驗證過程
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  // 當進入 success 狀態後，等待 2.5 秒自動進入 Dashboard
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        setStatus('dashboard');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleLogout = () => {
    setStatus('idle');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#030100] overflow-x-hidden font-sans relative selection:bg-amber-900/30">
      
      {/* 🌅 背景：深邃的琥珀色環境微光 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-amber-600/5 blur-[100px] pointer-events-none transition-all duration-1000" style={{ opacity: status === 'dashboard' ? 0.2 : (status === 'success' ? 0.8 : 0.5) }}></div>

      {/* ⬅️ 返回首頁按鈕 (僅在未登入時顯示) */}
      <Link href="/" className={`absolute top-10 left-6 md:left-12 text-zinc-600 hover:text-amber-400 transition-all duration-500 text-xs tracking-[0.3em] flex items-center gap-3 z-20 group ${(status === 'success' || status === 'dashboard') ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <span className="transform group-hover:-translate-x-2 transition-transform duration-500">←</span> 
        <span>RETURN</span>
      </Link>

      {/* 🔐 登入區塊 (idle, loading, success 狀態) */}
      <div className={`relative z-10 w-full max-w-md px-8 flex flex-col items-center min-h-[400px] justify-center transition-all duration-1000 ${status === 'dashboard' ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'}`}>
        
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
              {/* 這裡可以隨意輸入任何字測試 */}
              <input type="text" required disabled={status === 'loading'} className="w-full bg-transparent border-b border-zinc-800 py-3 px-2 text-amber-100/90 text-sm tracking-[0.2em] focus:outline-none focus:border-amber-500/50 transition-colors peer disabled:opacity-50" placeholder=" " />
              <label className="absolute left-2 top-3 text-zinc-600 text-xs tracking-[0.2em] transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-amber-500/70 peer-valid:-top-5 peer-valid:text-[10px] peer-valid:text-amber-500/50 pointer-events-none">
                CLIENT ID <span className="mx-2 font-thin text-zinc-700">|</span> 貴賓編號
              </label>
            </div>

            <div className="relative group">
              {/* 這裡可以隨意輸入任何字測試 */}
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

      {/* 🚀 儀表板區塊 (Dashboard 狀態) */}
      <div className={`relative z-10 w-full max-w-4xl px-6 md:px-12 py-20 flex flex-col transition-all duration-1000 ${status === 'dashboard' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none hidden'}`}>
        
        {/* Header */}
        <div className="flex justify-between items-end border-b border-zinc-800 pb-8 mb-12">
          <div>
            <p className="text-amber-600/70 text-[10px] tracking-[0.4em] mb-2 font-light">WELCOME BACK</p>
            <h2 className="font-serif font-extralight text-3xl tracking-[0.2em] text-zinc-200">
              VIP-HK-8809
            </h2>
          </div>
          <button onClick={handleLogout} className="text-zinc-600 hover:text-amber-500 transition-colors text-[10px] tracking-[0.3em]">
            LOGOUT ⎋
          </button>
        </div>

        {/* Active Commission (進行中的委託) */}
        <div className="bg-zinc-900/20 border border-zinc-800/50 p-8 md:p-12 backdrop-blur-md relative overflow-hidden">
          {/* 裝飾性背景 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-900/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row gap-12">
            
            {/* 左側：車輛資訊 */}
            <div className="flex-1">
              <p className="text-zinc-500 text-[10px] tracking-[0.4em] mb-4">ACTIVE COMMISSION | 委託代購中</p>
              <h3 className="font-serif text-3xl tracking-[0.1em] text-amber-100/90 mb-2">FERRARI 812 COMPETIZIONE</h3>
              <p className="text-zinc-400 font-light tracking-[0.1em] text-sm mb-8">Rosso Coburn (特製紅) / Carbon Fiber Wheels</p>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-xs font-light tracking-[0.15em]">
                <div>
                  <p className="text-zinc-600 mb-1 text-[9px]">VIN / 識別碼</p>
                  <p className="text-zinc-300">ZFF************49</p>
                </div>
                <div>
                  <p className="text-zinc-600 mb-1 text-[9px]">SOURCE / 車源地</p>
                  <p className="text-zinc-300">MUNICH, GERMANY</p>
                </div>
                <div>
                  <p className="text-zinc-600 mb-1 text-[9px]">ETA / 預計交付</p>
                  <p className="text-amber-500/80">OCTOBER 2026</p>
                </div>
              </div>
            </div>

            {/* 右側：物流時間軸 (Timeline) */}
            <div className="flex-1 border-t md:border-t-0 md:border-l border-zinc-800/50 pt-8 md:pt-0 md:pl-12">
              <p className="text-zinc-500 text-[10px] tracking-[0.4em] mb-8">LOGISTICS TRACKING | 物流追蹤</p>
              
              <div className="flex flex-col gap-8 relative">
                {/* 垂直連接線 */}
                <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-zinc-800"></div>

                {/* 步驟 1: 已完成 */}
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-600 border border-black shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
                  <p className="text-[10px] text-zinc-500 tracking-[0.2em] mb-1">2026.05.01</p>
                  <p className="text-sm text-zinc-400 font-light tracking-[0.1em]">德國原廠 PDI 檢驗通過</p>
                </div>

                {/* 步驟 2: 進行中 (Amber 高亮) */}
                <div className="relative pl-6">
                  <div className="absolute left-[-2px] top-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-[#030100] shadow-[0_0_15px_rgba(217,119,6,0.6)] animate-pulse"></div>
                  <p className="text-[10px] text-amber-500/80 tracking-[0.2em] mb-1">CURRENT STATUS</p>
                  <p className="text-sm text-amber-100 font-light tracking-[0.1em]">漢堡港口裝船作業中</p>
                </div>

                {/* 步驟 3: 未來 */}
                <div className="relative pl-6 opacity-30">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-700 border border-black"></div>
                  <p className="text-[10px] text-zinc-500 tracking-[0.2em] mb-1">PENDING</p>
                  <p className="text-sm text-zinc-400 font-light tracking-[0.1em]">香港海關清關與指標辦理</p>
                </div>

                {/* 步驟 4: 未來 */}
                <div className="relative pl-6 opacity-30">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-zinc-700 border border-black"></div>
                  <p className="text-[10px] text-zinc-500 tracking-[0.2em] mb-1">PENDING</p>
                  <p className="text-sm text-zinc-400 font-light tracking-[0.1em]">專屬管家尊榮交付</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 專屬管家聯絡 */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-3 text-[10px] tracking-[0.3em] text-zinc-500 hover:text-amber-400 transition-colors group">
            <span>CONTACT CONCIERGE</span>
            <span className="w-6 h-[1px] bg-zinc-700 group-hover:bg-amber-500 transition-colors"></span>
          </button>
        </div>

      </div>
    </main>
  );
}
