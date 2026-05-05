"use client";

import { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc, orderBy, query } from 'firebase/firestore';

export default function AdminPortal() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. 管理員登入驗證 (簡單版：預設代碼為 GOLD888)
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminKey === "GOLD888") {
      setIsAdmin(true);
      fetchOrders();
    } else {
      alert("管理員金鑰錯誤！");
    }
  };

  // 2. 抓取所有客戶資料
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "cars"), orderBy("last_update", "desc"));
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // 3. 更新進度 (status_index)
  const updateStatus = async (orderId, currentIndex) => {
    if (currentIndex >= 4) return; // 已到最後一步
    const orderRef = doc(db, "cars", orderId);
    try {
      await updateDoc(orderRef, {
        status_index: currentIndex + 1,
        last_update: new Date().toISOString()
      });
      fetchOrders(); // 重新整理清單
    } catch (e) { console.error(e); }
  };

  // 4. 刪除記錄
  const deleteOrder = async (orderId) => {
    if (!confirm("確定要移除此 VIP 記錄嗎？此操作不可恢復。")) return;
    try {
      await deleteDoc(doc(db, "cars", orderId));
      fetchOrders();
    } catch (e) { console.error(e); }
  };

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <form onSubmit={handleAdminLogin} className="text-center space-y-6">
          <h1 className="text-amber-500 tracking-[0.5em] text-xs mb-8">ADMIN AUTHENTICATION</h1>
          <input 
            type="password" placeholder="ENTER ADMIN KEY"
            onChange={(e) => setAdminKey(e.target.value)}
            className="bg-transparent border-b border-zinc-800 py-2 text-center text-zinc-300 focus:outline-none focus:border-amber-500 w-64"
          />
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-300 p-8 md:p-24 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="font-serif text-2xl tracking-[0.2em] text-zinc-100">CONCIERGE DASHBOARD</h1>
            <p className="text-amber-600/60 text-[10px] tracking-[0.4em] mt-2 uppercase">管家控管中心</p>
          </div>
          <button onClick={fetchOrders} className="text-[10px] border border-zinc-800 px-4 py-2 hover:bg-zinc-900 transition-all">REFRESH</button>
        </div>

        <div className="grid gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-zinc-900/20 border border-zinc-800/50 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-amber-500 text-sm font-bold uppercase tracking-widest">{order.client_name}</span>
                  <span className="bg-zinc-800 text-[9px] px-2 py-0.5 text-zinc-400">{order.access_code}</span>
                </div>
                <h2 className="text-zinc-200 text-sm tracking-widest">{order.car_model}</h2>
                <p className="text-zinc-600 text-[10px] mt-1 italic">{order.email}</p>
              </div>

              {/* 進度控制條 */}
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className={`h-1 w-8 ${i <= order.status_index ? 'bg-amber-600' : 'bg-zinc-800'}`}></div>
                ))}
                <span className="text-[10px] ml-4 text-zinc-500">STEP {order.status_index + 1}/5</span>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => updateStatus(order.id, order.status_index)}
                  disabled={order.status_index >= 4}
                  className={`px-6 py-2 text-[10px] tracking-widest border transition-all ${order.status_index >= 4 ? 'border-zinc-800 text-zinc-700' : 'border-amber-900/50 text-amber-200 hover:bg-amber-900/20'}`}
                >
                  {order.status_index >= 4 ? "COMPLETED" : "NEXT STEP"}
                </button>
                <button onClick={() => deleteOrder(order.id)} className="px-4 py-2 text-[10px] text-red-900/50 hover:text-red-500 transition-colors">REMOVE</button>
              </div>
            </div>
          ))}

          {orders.length === 0 && <div className="text-center py-20 text-zinc-700 text-xs tracking-widest">NO ACTIVE PROTOCOLS FOUND</div>}
        </div>
      </div>
    </main>
  );
}
