'use client'; // 標記為客戶端組件

import React, { useState, useEffect } from 'react';
import { Phone, Search, Menu, X, Filter, Facebook, Instagram, Shield, Globe, Award, ChevronRight, MessageCircle, LogIn, Plus, LayoutGrid, List, Upload, Image as ImageIcon, Save, Loader2, Trash2, Link as LinkIcon, DownloadCloud, CheckCircle } from 'lucide-react'; // ★ 新增了 DownloadCloud, CheckCircle

// 引入 Firebase 功能
import { db } from '../lib/firebase'; 
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

// --- 模擬數據 ---
const INITIAL_MOCK_CARS = [
  {
    id: 'mock-1',
    title: "Ferrari F8 Tributo (Demo)",
    price: "HK$ 3,880,000",
    year: "2021",
    type: "hyper", 
    mileage: "3,500 km",
    engine: "3.9L V8 Twin-Turbo",
    status: "in-stock", 
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1000",
    tags: ["行貨", "陶瓷煞車", "碳纖維內飾"],
    remarks: "🔥 絕版極新淨，原廠保養紀錄齊全！"
  }
];

export default function Home() {
  // --- State Management ---
  const [isAdminMode, setIsAdminMode] = useState(false); 
  const [activeTab, setActiveTab] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Data State
  const [cars, setCars] = useState(INITIAL_MOCK_CARS);
  const [loading, setLoading] = useState(false);

  // ★★★ 新增：CMS 分離架構狀態 ★★★
  const [dmsCars, setDmsCars] = useState([]); // 存放從內部系統 API 傳過來的車輛
  const [adminTab, setAdminTab] = useState('inventory'); // 切換「已發佈」或「DMS 待處理」

  // Admin Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form State: ★ 新增 remarks (行銷備註) 與 dmsId (來源綁定)
  const [newCarForm, setNewCarForm] = useState({
    title: '', price: '', year: '', type: 'hyper', mileage: '', engine: '', status: 'in-stock', 
    image: '', tags: '', remarks: '', dmsId: ''
  });

  // --- Effect: 監聽滾動 ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Effect: 從 Firestore 抓取官網已發佈數據 ---
  useEffect(() => {
    const fetchCars = async () => {
      try {
        if (!db) return; 
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "cars"));
        const firebaseCars = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        if (firebaseCars.length > 0) setCars(firebaseCars);
      } catch (error) {
        console.log("Firebase 讀取失敗:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // ★★★ 新增 Effect: 從金田內部系統讀取「待發佈車輛」 ★★★
  useEffect(() => {
    const fetchDMS = async () => {
      if (isAdminMode) {
        try {
          const res = await fetch('https://gold-land-auto.vercel.app/api/public/inventory');
          if (res.ok) {
            const data = await res.json();
            setDmsCars(data);
          }
        } catch (e) {
          console.log("讀取 DMS 內部系統失敗，請確認 API 是否已啟動", e);
        }
      }
    };
    fetchDMS();
  }, [isAdminMode]);

  const getWhatsAppLink = (carTitle, id) => {
    const message = `你好 Gold Land HK，我對官網上的 ${carTitle} (ID:${id}) 有興趣，想了解更多詳情。`;
    return `https://wa.me/85212345678?text=${encodeURIComponent(message)}`;
  };

  // ★★★ 新增：一鍵導入 DMS 資料至編輯器 ★★★
  const handleImportFromDMS = (dmsCar) => {
    setNewCarForm({
      dmsId: dmsCar.id,
      title: dmsCar.title,
      // 將 HK$ 格式清洗成純數字或保留原樣
      price: String(dmsCar.price).replace(/[^0-9]/g, ''), 
      year: dmsCar.year,
      type: dmsCar.type || 'hyper',
      mileage: dmsCar.mileage,
      engine: dmsCar.engine,
      status: 'in-stock',
      image: dmsCar.image || '',
      tags: dmsCar.tags ? dmsCar.tags.join(', ') : '',
      remarks: '' // 留空讓行銷同事自由發揮
    });
    setIsAddModalOpen(true);
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const imageUrl = newCarForm.image || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000";

      const carData = {
        dmsId: newCarForm.dmsId, // ★ 紀錄來源 ID
        title: newCarForm.title,
        price: `HK$ ${Number(newCarForm.price).toLocaleString()}`, // 自動格式化
        year: newCarForm.year,
        type: newCarForm.type,
        mileage: newCarForm.mileage,
        engine: newCarForm.engine,
        status: newCarForm.status,
        image: imageUrl,
        tags: newCarForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        remarks: newCarForm.remarks, // ★ 儲存行銷備註
        createdAt: new Date()
      };

      if (db) {
        const docRef = await addDoc(collection(db, "cars"), carData);
        setCars([{ id: docRef.id, ...carData }, ...cars]); 
      } else {
        setCars([{ id: Date.now(), ...carData }, ...cars]);
      }

      setIsAddModalOpen(false);
      setNewCarForm({ title: '', price: '', year: '', type: 'hyper', mileage: '', engine: '', status: 'in-stock', image: '', tags: '', remarks: '', dmsId: '' });
      alert("車輛上架成功！");
      setAdminTab('inventory'); // 發佈完自動切回庫存頁

    } catch (error) {
      alert("上傳失敗");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteCar = async (id) => {
    if(confirm("確定要刪除這台車嗎？(這不會影響內部系統的數據)")) {
      try {
        if (db) await deleteDoc(doc(db, "cars", id));
        setCars(cars.filter(c => c.id !== id));
      } catch (error) { console.error("刪除失敗", error); }
    }
  };

  const filteredCars = activeTab === 'all' ? cars : cars.filter(car => car.type === activeTab);

  // --- 後台管理界面 ---
  if (isAdminMode) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-neutral-950 border-r border-neutral-800 p-6 flex flex-col">
          <h2 className="text-xl font-serif text-amber-500 mb-8 font-bold tracking-wider">GOLD LAND ADMIN</h2>
          <nav className="flex-1 space-y-4">
            {/* ★★★ 修改 Sidebar：加入 DMS 待處理區切換 ★★★ */}
            <button onClick={() => setAdminTab('inventory')} className={`flex items-center gap-3 w-full p-3 rounded-lg transition ${adminTab === 'inventory' ? 'bg-neutral-800 text-amber-500' : 'hover:bg-neutral-900 text-neutral-400'}`}>
              <LayoutGrid size={20} /> 已發佈官網庫存
            </button>
            <button onClick={() => setAdminTab('dms')} className={`flex items-center justify-between w-full p-3 rounded-lg transition ${adminTab === 'dms' ? 'bg-neutral-800 text-amber-500' : 'hover:bg-neutral-900 text-neutral-400'}`}>
              <div className="flex items-center gap-3"><DownloadCloud size={20} /> DMS 待處理區</div>
              {dmsCars.length > 0 && <span className="bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{dmsCars.length}</span>}
            </button>
            
            <button className="flex items-center gap-3 w-full p-3 hover:bg-neutral-900 rounded-lg text-neutral-400 transition mt-4">
              <MessageCircle size={20} /> 客戶詢盤
            </button>
          </nav>
          <button onClick={() => setIsAdminMode(false)} className="mt-8 md:mt-auto flex items-center gap-2 text-sm text-neutral-500 hover:text-white p-2">
            <LogIn size={16} className="rotate-180"/> 返回官網前台
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">{adminTab === 'inventory' ? '官網現有庫存 (Published)' : '內部系統傳送 (DMS Inbox)'}</h1>
            {adminTab === 'inventory' && (
              <button onClick={() => setIsAddModalOpen(true)} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 shadow-lg shadow-amber-900/20">
                <Plus size={18} /> 手動新增
              </button>
            )}
          </div>

          <div className="grid gap-4">
              {/* ★★★ 根據 Tab 顯示不同列表 ★★★ */}
              {adminTab === 'inventory' ? (
                <>
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-neutral-800 rounded-t-lg font-bold text-neutral-400 text-sm">
                    <div className="col-span-1">ID</div>
                    <div className="col-span-2">圖片</div>
                    <div className="col-span-4">標題</div>
                    <div className="col-span-2">價格</div>
                    <div className="col-span-2">狀態</div>
                    <div className="col-span-1">操作</div>
                  </div>
                  {cars.map(car => (
                    <div key={car.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-neutral-800/50 border-b border-neutral-700 items-center hover:bg-neutral-800 transition rounded-lg md:rounded-none">
                      <div className="col-span-1 text-neutral-500 text-xs md:text-base truncate">#{car.id.slice(0,5)}</div>
                      <div className="col-span-1 md:col-span-2"><img src={car.image} className="w-16 h-12 md:w-20 md:h-14 object-cover rounded bg-neutral-700" /></div>
                      <div className="col-span-1 md:col-span-4 font-medium">
                        {car.title}
                        {car.dmsId && <span className="ml-2 text-[10px] bg-blue-900/50 text-blue-300 px-1.5 py-0.5 rounded">DMS 來源</span>}
                      </div>
                      <div className="col-span-1 md:col-span-2 text-amber-500">{car.price}</div>
                      <div className="col-span-1 md:col-span-2">
                        <span className={`px-2 py-1 rounded text-xs ${car.status === 'sold' ? 'bg-red-900/50 text-red-200' : car.status === 'incoming' ? 'bg-blue-900/50 text-blue-200' : 'bg-green-900/50 text-green-200'}`}>
                          {car.status === 'sold' ? '已售出' : car.status === 'incoming' ? '期貨' : '現貨'}
                        </span>
                      </div>
                      <div className="col-span-1 flex gap-3 text-neutral-400">
                        <button className="hover:text-red-500" onClick={() => handleDeleteCar(car.id)}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-blue-200 text-sm mb-4">
                    💡 這裡顯示內部金田系統中已打勾「官網展示」的車輛。點擊「導入並包裝」加入宣傳字句後即可發佈。
                  </div>
                  {dmsCars.map(car => {
                    const isPublished = cars.some(c => c.dmsId === car.id);
                    return (
                      <div key={car.id} className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-neutral-800/50 border rounded-lg gap-4 ${isPublished ? 'border-green-900/50 opacity-60' : 'border-blue-500/30 hover:border-blue-500/80'}`}>
                        <div className="flex items-center gap-4">
                          <img src={car.image} className="w-24 h-16 object-cover rounded bg-neutral-900" />
                          <div>
                            <div className="font-bold text-lg">{car.title}</div>
                            <div className="text-xs text-neutral-400 mt-1 flex gap-2">
                               <span>ID: {car.id.slice(0,6)}</span>
                               <span>{car.price}</span>
                               <span>{car.year}</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleImportFromDMS(car)} 
                          disabled={isPublished}
                          className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 w-full md:w-auto justify-center transition-all ${isPublished ? 'bg-neutral-700 text-neutral-500' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg'}`}
                        >
                          {isPublished ? <CheckCircle size={16}/> : <DownloadCloud size={16}/>}
                          {isPublished ? '已發佈至前台' : '導入並包裝'}
                        </button>
                      </div>
                    )
                  })}
                  {dmsCars.length === 0 && <div className="text-center py-10 text-neutral-500">內部系統目前沒有推送任何新車輛</div>}
                </>
              )}
          </div>

          {/* Add/Edit Car Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-neutral-900 border border-neutral-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-2"><Plus className="text-amber-500" /> {newCarForm.dmsId ? '包裝並發佈車輛' : '上架新車'}</h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-neutral-500 hover:text-white"><X size={24} /></button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                  <form id="add-car-form" onSubmit={handleAddCar} className="space-y-6">
                    
                    <div className="space-y-3">
                      <label className="text-sm text-neutral-400">車輛圖片 (Image URL)</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-3 text-neutral-500" size={18} />
                        <input type="text" required placeholder="https://..." className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.image} onChange={e => setNewCarForm({...newCarForm, image: e.target.value})} />
                      </div>
                      <div className="w-full h-48 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-center overflow-hidden">
                         {newCarForm.image ? <img src={newCarForm.image} className="w-full h-full object-cover" /> : <ImageIcon size={32} className="text-neutral-600" />}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-neutral-400">車輛標題</label>
                        <input type="text" required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.title} onChange={e => setNewCarForm({...newCarForm, title: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-neutral-400">售價 (純數字)</label>
                        <input type="number" required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.price} onChange={e => setNewCarForm({...newCarForm, price: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm text-neutral-400">年份</label>
                         <input type="text" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.year} onChange={e => setNewCarForm({...newCarForm, year: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-neutral-400">狀態</label>
                        <select className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.status} onChange={e => setNewCarForm({...newCarForm, status: e.target.value})}>
                          <option value="in-stock">現貨</option>
                          <option value="incoming">期貨</option>
                          <option value="sold">已售出</option>
                        </select>
                      </div>

                      {/* ★★★ 新增：行銷備註欄位 ★★★ */}
                      <div className="space-y-2 md:col-span-2">
                         <label className="text-sm text-amber-500 font-bold flex items-center"><Award size={16} className="mr-1"/> 行銷備註 (顯示給客戶看)</label>
                         <textarea 
                            rows={3} 
                            placeholder="例如：極新淨、0字牌薄、原廠保養..." 
                            className="w-full bg-amber-900/10 border border-amber-500/30 rounded-lg p-3 text-white focus:border-amber-500 outline-none resize-none" 
                            value={newCarForm.remarks} 
                            onChange={e => setNewCarForm({...newCarForm, remarks: e.target.value})} 
                         />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                         <label className="text-sm text-neutral-400">標籤 (用逗號分隔)</label>
                         <input type="text" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.tags} onChange={e => setNewCarForm({...newCarForm, tags: e.target.value})} />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="p-6 border-t border-neutral-800 flex justify-end gap-4 bg-neutral-900 rounded-b-2xl">
                  <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 rounded-lg text-neutral-400 hover:text-white">取消</button>
                  <button type="submit" form="add-car-form" disabled={isUploading} className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold flex items-center gap-2">
                    {isUploading ? <><Loader2 className="animate-spin" /> 處理中...</> : <><Globe size={18} /> 發佈至官網</>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- 前台官網 ---
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-amber-500 selection:text-black">
      {/* Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-serif font-bold tracking-widest text-white">GOLD LAND <span className="text-amber-500">HK</span></div>
            <div className="text-xs text-neutral-400 border-l border-neutral-600 pl-2 ml-2 hidden sm:block">金田汽車</div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wide">
            <a href="#" className="hover:text-amber-500 transition">首頁</a>
            <a href="#inventory" className="hover:text-amber-500 transition">名車庫存</a>
            <a href="#services" className="hover:text-amber-500 transition">中港服務</a>
            <button onClick={() => setIsAdminMode(true)} className="text-neutral-500 hover:text-amber-500 transition flex items-center gap-2" title="員工後台登入"><LogIn size={18} /> 後台</button>
            <a href="#contact" className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full transition flex items-center gap-2"><Phone size={16} /> 預約看車</a>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2000" alt="Luxury Car" className="w-full h-full object-cover opacity-60"/>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center mt-20">
          <p className="text-amber-500 tracking-[0.3em] uppercase mb-4 text-sm md:text-base">Premium Auto Dealer HK</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">專注極致 <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">尊貴隨行</span></h1>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#inventory" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded text-sm uppercase tracking-wider font-bold transition">瀏覽現貨庫存</a>
          </div>
        </div>
      </header>

      {/* Inventory Section */}
      <section id="inventory" className="py-20 bg-neutral-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-neutral-800 pb-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-2">精選車輛 <span className="text-amber-600">Inventory</span></h2>
            <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto">
              {[{ id: 'all', label: '全部' }, { id: 'hyper', label: '超跑' }, { id: 'mpv', label: 'MPV' }].map(cat => (
                <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${activeTab === cat.id ? 'bg-white text-black font-bold' : 'bg-neutral-900 text-neutral-400'}`}>{cat.label}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <div key={car.id} className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-600/50 transition-all duration-300 flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img src={car.image} alt={car.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  {car.status === 'sold' && <div className="absolute inset-0 bg-black/70 flex items-center justify-center"><span className="border-2 border-red-500 text-red-500 px-6 py-2 text-xl font-bold uppercase -rotate-12">SOLD OUT</span></div>}
                  {/* ★ 在前台展示行銷標籤 */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {car.tags?.slice(0, 2).map((tag, i) => (
                      <span key={i} className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded border border-white/20">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold line-clamp-1">{car.title}</h3>
                  <p className="text-2xl text-amber-500 font-serif my-2">{car.price}</p>
                  
                  {/* ★ 在前台展示同事寫的行銷備註 */}
                  {car.remarks && (
                    <div className="bg-neutral-800/50 p-3 rounded-lg mb-4 text-sm text-neutral-300 leading-relaxed flex-1">
                      {car.remarks}
                    </div>
                  )}

                  <div className="flex gap-3 mt-auto">
                     <a href={getWhatsAppLink(car.title, car.id)} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm font-bold"><MessageCircle size={18} /> WhatsApp 查詢</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer id="contact" className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-8">
        <div className="container mx-auto px-6 text-center text-neutral-600 text-xs">
          <p>&copy; 2025 Gold Land HK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
