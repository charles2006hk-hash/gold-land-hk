import Link from 'next/link';

export default function Collection() {
  const inventory = [
    { id: 1, year: '2024', brand: 'PAGANI', model: 'UTOPIA', status: 'IN STOCK', image: '/pagani.png' },
    { id: 2, year: '2023', brand: 'ROLLS ROYCE', model: 'BOAT TAIL', status: 'ACQUIRED', image: '/rollsroyce.png' },
    { id: 3, year: '2024', brand: 'FERRARI', model: '812 COMPETIZIONE', status: 'AVAILABLE', image: '/ferrari.png' },
  ];

  return (
    <main className="min-h-screen bg-[#030100] text-zinc-300 font-sans selection:bg-amber-900/30 pb-32">
      
      {/* 導覽列 */}
      <nav className="w-full py-10 px-6 md:px-12 flex justify-between items-center relative z-20">
        <Link href="/" className="text-zinc-500 hover:text-amber-400 transition-colors duration-500 text-xs tracking-[0.4em] flex items-center gap-2 group">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> BACK
        </Link>
        <div className="text-[10px] tracking-[0.5em] text-amber-600/50 uppercase">The Collection</div>
      </nav>

      {/* 標題區 */}
      <header className="px-6 md:px-12 mt-12 mb-24">
        <h1 className="font-serif font-extralight text-4xl md:text-5xl tracking-[0.3em] text-zinc-100 mb-6">
          THE CURATED <br /> COLLECTION
        </h1>
        <div className="w-20 h-[1px] bg-amber-500/30 mb-8"></div>
        <p className="max-w-md text-zinc-500 text-xs tracking-[0.2em] leading-loose font-light">
          每一台車輛皆經過全球專員深度鑑定，僅為追求極致的收藏家而存在。
        </p>
      </header>

      {/* 車輛列表 (畫廊模式) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900/20 border-y border-zinc-900/50">
        {inventory.map((car) => (
          <div key={car.id} className="group relative bg-[#030100] aspect-[16/10] overflow-hidden border-zinc-900/30 border-r last:border-r-0">
            
            {/* 車輛圖片：幽靈感縮放動畫 */}
            <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105 opacity-40 group-hover:opacity-70 grayscale group-hover:grayscale-0">
              <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
            </div>

            {/* 漸層遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-1"></div>

            {/* 文字資訊 */}
            <div className="absolute bottom-10 left-10 z-10 transition-transform duration-700 group-hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-amber-500 text-[10px] tracking-[0.3em] font-light">{car.year}</span>
                <span className="w-4 h-[1px] bg-zinc-800"></span>
                <span className="text-zinc-500 text-[10px] tracking-[0.3em] font-light">{car.status}</span>
              </div>
              <h3 className="font-serif text-2xl tracking-[0.2em] text-zinc-200 group-hover:text-amber-100 transition-colors">
                {car.brand} {car.model}
              </h3>
            </div>

            {/* 詳情按鈕：懸浮顯露 */}
            <Link 
              href="/global-find" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4 border border-amber-500/0 text-amber-500/0 group-hover:border-amber-500/40 group-hover:text-amber-500/80 text-[10px] tracking-[0.5em] transition-all duration-700 backdrop-blur-0 group-hover:backdrop-blur-md z-20"
            >
              ENQUIRE
            </Link>
          </div>
        ))}
      </div>

      {/* 底部聯繫暗示 */}
      <footer className="mt-32 text-center">
        <p className="text-zinc-600 text-xs tracking-[0.3em] mb-8 font-light">尋找特定規格或隱藏車源？</p>
        <Link href="/global-find" className="text-amber-100/60 hover:text-amber-300 transition-all duration-500 text-sm tracking-[0.4em] underline underline-offset-[12px] decoration-amber-900">
          INITIATE GLOBAL SEARCH
        </Link>
      </footer>
    </main>
  );
}
