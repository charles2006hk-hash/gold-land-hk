"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const steps = [
  { title: "SOURCE SECURED", desc: "已在海外特派點確認實車狀況" },
  { title: "INSPECTION", desc: "通過大師級 200 項技術鑑定" },
  { title: "TRANSIT", desc: "車輛已進入海關封關裝船" },
  { title: "CLEARANCE", desc: "香港海關清關程序辦理中" },
  { title: "DELIVERY", desc: "準備進行 VIP 私人交付儀式" }
];

export default function VipTracking() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const sessionData = sessionStorage.getItem('vip_client');
    if (!sessionData) {
      router.push('/vip-login');
    } else {
      setData(JSON.parse(sessionData));
    }
  }, []);

  if (!data) return null;

  return (
    <main className="min-h-screen bg-[#030100] text-zinc-300 py-24 px-6 font-sans">
      <div className="max-w-xl mx-auto">
        <header className="mb-20 text-center">
          <p className="text-amber-600 text-[10px] tracking-[0.5em] mb-4">LOGGED IN AS: {data.client_name}</p>
          <h1 className="font-serif text-3xl tracking-[0.2em] text-zinc-100">{data.car_model}</h1>
          <div className="h-[1px] w-12 bg-amber-900/50 mx-auto mt-8"></div>
        </header>

        <div className="space-y-12 relative">
          {/* 連接線 */}
          <div className="absolute left-[11px] top-2 bottom-2 w-[1px] bg-zinc-900"></div>

          {steps.map((step, index) => (
            <div key={index} className={`relative pl-10 transition-all duration-1000 ${index <= data.status_index ? 'opacity-100' : 'opacity-20'}`}>
              {/* 圓點 */}
              <div className={`absolute left-0 top-1 w-[22px] h-[22px] rounded-full border flex items-center justify-center transition-all duration-700 ${index <= data.status_index ? 'border-amber-500/50 bg-amber-950/20' : 'border-zinc-800 bg-black'}`}>
                {index < data.status_index && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]"></div>}
                {index === data.status_index && <div className="w-1.5 h-1.5 bg-amber-200 rounded-full animate-pulse shadow-[0_0_12px_#fff]"></div>}
              </div>

              <div>
                <h3 className={`text-xs tracking-[0.3em] mb-2 ${index <= data.status_index ? 'text-amber-100' : 'text-zinc-600'}`}>
                  {step.title}
                </h3>
                <p className="text-[11px] text-zinc-500 tracking-[0.1em] font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => { sessionStorage.clear(); router.push('/'); }}
          className="mt-24 w-full py-4 text-[9px] tracking-[0.4em] text-zinc-700 hover:text-amber-600 transition-colors"
        >
          LOGOUT SESSION
        </button>
      </div>
    </main>
  );
}
