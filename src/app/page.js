'use client'; // 標記為客戶端組件

import React, { useState, useEffect } from 'react';
import { Phone, Search, Menu, X, Filter, Facebook, Instagram, Shield, Globe, Award, ChevronRight, MessageCircle, LogIn, Plus, LayoutGrid, List, Upload, Image as ImageIcon, Save, Loader2, Trash2, Link as LinkIcon } from 'lucide-react';

// 引入 Firebase 功能
import { db } from '../lib/firebase'; // 移除 storage 引用
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
// 移除 storage 相關的 import，暫時用不到
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
    tags: ["行貨", "陶瓷煞車", "碳纖維內飾"]
  },
  {
    id: 'mock-2',
    title: "Toyota Alphard Executive (Demo)",
    price: "HK$ 988,000",
    year: "2023",
    type: "mpv",
    mileage: "New",
    engine: "2.5L Hybrid",
    status: "incoming",
    image: "https://images.unsplash.com/photo-1621503410500-2e008e3845c9?auto=format&fit=crop&q=80&w=1000",
    tags: ["全新車", "JBL音響", "蒙娜麗莎椅"]
  },
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

  // Admin Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form State: 注意這裡移除了 imageFile，只保留 image (網址字串)
  const [newCarForm, setNewCarForm] = useState({
    title: '', price: '', year: '', type: 'hyper', mileage: '', engine: '', status: 'in-stock', 
    image: '', tags: ''
  });

  // --- Effect: 監聽滾動 ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Effect: 從 Firestore 抓取真實數據 ---
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
        
        if (firebaseCars.length > 0) {
          setCars(firebaseCars);
        }
      } catch (error) {
        console.log("Firebase 尚未連接或讀取失敗，使用演示數據:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // WhatsApp 連結
  const getWhatsAppLink = (carTitle, id) => {
    const message = `你好 Gold Land HK，我對官網上的 ${carTitle} (ID:${id}) 有興趣，想了解更多詳情。`;
    return `https://wa.me/85212345678?text=${encodeURIComponent(message)}`;
  };

  // --- Admin Functions (No Storage Version) ---

  const handleAddCar = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // 這裡不再進行檔案上傳，直接使用用戶輸入的 URL
      const imageUrl = newCarForm.image || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1000"; // 預設圖片

      const carData = {
        title: newCarForm.title,
        price: newCarForm.price,
        year: newCarForm.year,
        type: newCarForm.type,
        mileage: newCarForm.mileage,
        engine: newCarForm.engine,
        status: newCarForm.status,
        image: imageUrl, // 直接存網址
        tags: newCarForm.tags.split(',').map(tag => tag.trim()),
        createdAt: new Date()
      };

      // 寫入 Firestore Database
      if (db) {
        const docRef = await addDoc(collection(db, "cars"), carData);
        setCars([{ id: docRef.id, ...carData }, ...cars]); 
      } else {
        // Fallback
        setCars([{ id: Date.now(), ...carData }, ...cars]);
        alert("Firebase DB 未連接，僅更新畫面演示");
      }

      setIsAddModalOpen(false);
      setNewCarForm({
        title: '', price: '', year: '', type: 'hyper', mileage: '', engine: '', status: 'in-stock', image: '', tags: ''
      });
      alert("車輛上架成功！");

    } catch (error) {
      console.error("上傳失敗:", error);
      alert("上傳失敗，請檢查 Firestore 權限或網絡");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteCar = async (id) => {
    if(confirm("確定要刪除這台車嗎？")) {
      try {
        if (db) {
           await deleteDoc(doc(db, "cars", id));
        }
        setCars(cars.filter(c => c.id !== id));
      } catch (error) {
        console.error("刪除失敗", error);
      }
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
            <button className="flex items-center gap-3 w-full p-3 bg-neutral-800 rounded-lg text-amber-500">
              <LayoutGrid size={20} /> 車輛庫存管理
            </button>
            <button className="flex items-center gap-3 w-full p-3 hover:bg-neutral-900 rounded-lg text-neutral-400 transition">
              <MessageCircle size={20} /> 客戶詢盤
            </button>
            <button className="flex items-center gap-3 w-full p-3 hover:bg-neutral-900 rounded-lg text-neutral-400 transition">
              <Facebook size={20} /> Facebook 同步
            </button>
          </nav>
          <button onClick={() => setIsAdminMode(false)} className="mt-8 md:mt-auto flex items-center gap-2 text-sm text-neutral-500 hover:text-white p-2">
            <LogIn size={16} className="rotate-180"/> 返回官網前台
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">車輛庫存 (Inventory)</h1>
            <button onClick={() => setIsAddModalOpen(true)} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded flex items-center gap-2 shadow-lg shadow-amber-900/20">
              <Plus size={18} /> 新增車輛
            </button>
          </div>

          <div className="grid gap-4">
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
                  <div className="col-span-1 text-neutral-500 text-xs md:text-base truncate">#{car.id}</div>
                  <div className="col-span-1 md:col-span-2">
                    <img src={car.image} alt={car.title} className="w-16 h-12 md:w-20 md:h-14 object-cover rounded bg-neutral-700" />
                  </div>
                  <div className="col-span-1 md:col-span-4 font-medium">{car.title}</div>
                  <div className="col-span-1 md:col-span-2 text-amber-500">{car.price}</div>
                  <div className="col-span-1 md:col-span-2">
                    <span className={`px-2 py-1 rounded text-xs ${car.status === 'sold' ? 'bg-red-900/50 text-red-200' : car.status === 'incoming' ? 'bg-blue-900/50 text-blue-200' : 'bg-green-900/50 text-green-200'}`}>
                      {car.status === 'sold' ? '已售出' : car.status === 'incoming' ? '期貨' : '現貨'}
                    </span>
                  </div>
                  <div className="col-span-1 flex gap-3 text-neutral-400">
                    <button className="hover:text-red-500" title="刪除" onClick={() => handleDeleteCar(car.id)}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
          </div>

          {/* Add Car Modal */}
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-neutral-900 border border-neutral-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-neutral-800 flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-2"><Plus className="text-amber-500" /> 上架新車</h3>
                  <button onClick={() => setIsAddModalOpen(false)} className="text-neutral-500 hover:text-white"><X size={24} /></button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                  <form id="add-car-form" onSubmit={handleAddCar} className="space-y-6">
                    
                    {/* Image URL Input Area (取代原本的 File Upload) */}
                    <div className="space-y-3">
                      <label className="text-sm text-neutral-400">車輛圖片網址 (Image URL)</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <LinkIcon className="absolute left-3 top-3 text-neutral-500" size={18} />
                          <input 
                            type="text" 
                            required 
                            placeholder="https://..." 
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 p-3 text-white focus:border-amber-500 outline-none" 
                            value={newCarForm.image} 
                            onChange={e => setNewCarForm({...newCarForm, image: e.target.value})} 
                          />
                        </div>
                      </div>
                      
                      {/* Image Preview */}
                      <div className="w-full h-48 bg-neutral-950 rounded-xl border-2 border-dashed border-neutral-800 flex items-center justify-center overflow-hidden relative">
                         {newCarForm.image ? (
                           <img src={newCarForm.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image'} />
                         ) : (
                           <div className="text-neutral-600 flex flex-col items-center">
                             <ImageIcon size={32} className="mb-2" />
                             <span className="text-sm">圖片預覽將顯示於此</span>
                           </div>
                         )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-neutral-400">車輛標題</label>
                        <input type="text" required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.title} onChange={e => setNewCarForm({...newCarForm, title: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-neutral-400">售價</label>
                        <input type="text" required className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.price} onChange={e => setNewCarForm({...newCarForm, price: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm text-neutral-400">年份</label>
                         <input type="text" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.year} onChange={e => setNewCarForm({...newCarForm, year: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-neutral-400">分類</label>
                        <select className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.type} onChange={e => setNewCarForm({...newCarForm, type: e.target.value})}>
                          <option value="hyper">超級跑車</option>
                          <option value="luxury">豪華轎車</option>
                          <option value="mpv">保姆車</option>
                          <option value="jdm">JDM / 日本車</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-neutral-400">狀態</label>
                        <select className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.status} onChange={e => setNewCarForm({...newCarForm, status: e.target.value})}>
                          <option value="in-stock">現貨</option>
                          <option value="incoming">期貨</option>
                          <option value="sold">已售出</option>
                        </select>
                      </div>
                       <div className="space-y-2">
                         <label className="text-sm text-neutral-400">引擎</label>
                         <input type="text" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none" value={newCarForm.engine} onChange={e => setNewCarForm({...newCarForm, engine: e.target.value})} />
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
                    {isUploading ? <><Loader2 className="animate-spin" /> 處理中...</> : <><Save size={18} /> 儲存車輛</>}
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
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-neutral-900 border-b border-neutral-800 p-6 flex flex-col gap-4 shadow-xl">
            <a href="#" className="text-lg">首頁</a>
            <button onClick={() => setIsAdminMode(true)} className="text-left text-neutral-500 flex items-center gap-2"><LogIn size={16} /> 員工後台</button>
          </div>
        )}
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
              <div key={car.id} className="group bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-600/50 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img src={car.image} alt={car.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  {car.status === 'sold' && <div className="absolute inset-0 bg-black/70 flex items-center justify-center"><span className="border-2 border-red-500 text-red-500 px-6 py-2 text-xl font-bold uppercase -rotate-12">SOLD OUT</span></div>}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold line-clamp-1">{car.title}</h3>
                  <p className="text-2xl text-amber-500 font-serif mb-4">{car.price}</p>
                  <div className="flex gap-3">
                     <a href={getWhatsAppLink(car.title, car.id)} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-lg transition flex items-center justify-center gap-2 text-sm font-bold"><MessageCircle size={18} /> WhatsApp</a>
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