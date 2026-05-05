"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

export default function VipLogin() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🛠️ 自動生成測試資料的功能
  const initTestData = async () => {
    try {
      await addDoc(collection(db, "cars"), {
        client_name: "Charles VIP",
        email: "test@example.com",
        access_code: "GL888",
        car_model: "Bugatti Chiron Pur Sport",
        status_index: 2, // 模擬進度到一半
        last_update: new Date().toISOString()
      });
      alert("測試資料已自動生成！帳號: test@example.com / 密碼: GL888");
    } catch (e) { console.error(e); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const q = query(
        collection(db, "cars"), 
        where("email", "==", email), 
        where("access_code", "==", code)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        // 登入成功，將資料存入 sessionStorage (簡單做法)
        sessionStorage.setItem('vip_client', JSON.stringify(userData));
        router.push('/vip-tracking');
      } else {
        alert("驗證失敗：密鑰不正確或帳號不存在。");
      }
    } catch (error) {
      console.error(error);
      alert("連線失敗，請檢查 Firebase 規則設定。");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#030100] flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl tracking-[0.3em] text-zinc-200 mb-2">VIP PORTAL</h1>
          <p className="text-amber-600/60 text-[10px] tracking-[0.4em] uppercase">尊貴客戶專屬門戶</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-6">
            <input 
              type="email" required placeholder="REGISTERED EMAIL"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm tracking-[0.1em] text-zinc-300 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <input 
              type="password" required placeholder="ACCESS CODE"
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-transparent border-b border-zinc-800 py-3 text-sm tracking-[0.1em] text-zinc-300 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full py-4 bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs tracking-[0.4em] hover:bg-amber-950/20 hover:border-amber-500/30 hover:text-amber-200 transition-all duration-700"
          >
            {loading ? "VERIFYING..." : "ENTER PORTAL"}
          </button>
        </form>

        {/* 測試按鈕：部署後點擊一次即可自動生成 Firebase 資料 */}
        <button onClick={initTestData} className="mt-12 w-full text-[9px] text-zinc-800 tracking-[0.2em] hover:text-zinc-600 transition-colors">
          INITIALIZE DATABASE SCHEMA (ADMIN ONLY)
        </button>
      </div>
    </main>
  );
}
