import React from 'react';
import { motion } from 'motion/react';
import { Search, Utensils, Coffee, Landmark, TreePine, LayoutGrid, Heart, Map as MapIcon, User } from 'lucide-react';
import { cn } from '../lib/utils';

export const HomeScreen: React.FC = () => {
  const categories = [
    { name: 'Tudo', icon: LayoutGrid, color: 'bg-brand-purple' },
    { name: 'Comida', icon: Utensils, color: 'bg-brand-orange', brand: '#f97316' },
    { name: 'Cafés', icon: Coffee, color: 'bg-brand-pink' },
    { name: 'Cultura', icon: Landmark, color: 'bg-brand-blue' },
    { name: 'Natureza', icon: TreePine, color: 'bg-green-500' },
  ];

  const recommendations = [
    { 
      name: 'Café Central', 
      rating: 4.8, 
      dist: '200m', 
      img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop'
    },
    { 
      name: 'Miradouro de Santa Catarina', 
      rating: 4.9, 
      dist: '800m', 
      img: 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-50 relative">
      {/* Top Search Bar */}
      <div className="absolute top-4 left-0 w-full px-6 z-20">
        <div className="relative group">
          <div className="absolute inset-x-0 -bottom-1 h-12 bg-black/5 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-5 py-4 rounded-3xl shadow-lg border border-slate-100">
            <Search size={20} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Procura lugares, categorias..." 
              className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Map Content - Mockup for now */}
      <div className="flex-1 relative overflow-hidden bg-slate-200">
        {/* Placeholder for Interactive Map */}
        <div className="absolute inset-0 bg-[#e5e7eb] flex items-center justify-center">
            {/* Abstract Map UI */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 100L400 150M200 0V600M50 0L350 600M0 450L400 400" stroke="#94a3b8" strokeWidth="2" />
                </svg>
            </div>
            
            {/* Colorful Pins */}
            <MapPin x={120} y={180} color="#EC4899" />
            <MapPin x={240} y={280} color="#8B5CF6" />
            <MapPin x={180} y={400} color="#3B82F6" />
            <MapPin x={80} y={480} color="#22c55e" />
            
            <div className="absolute flex flex-col items-center gap-1 opacity-60">
                <div className="w-24 h-24 bg-brand-purple/10 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand-purple rounded-full border-2 border-white shadow-xl" />
            </div>
        </div>
      </div>

      {/* Floating Category List */}
      <div className="absolute top-24 left-0 w-full overflow-x-auto no-scrollbar py-2 z-20">
        <div className="flex px-6 gap-3 pb-2">
          {categories.map((cat, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-sm whitespace-nowrap transition-all",
                idx === 0 ? "bg-brand-purple text-white shadow-brand-purple/20" : "bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              <cat.icon size={18} />
              <span className="text-xs font-bold tracking-tight">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        {/* Recommendation Carousel */}
        <div className="mb-24 px-6 overflow-x-auto no-scrollbar pointer-events-auto">
          <div className="flex gap-4 pb-4">
            {recommendations.map((item, idx) => (
              <motion.div
                key={idx}
                whileTap={{ scale: 0.98 }}
                className="w-72 bg-white/95 backdrop-blur-md rounded-[2rem] p-3 shadow-2xl flex border border-white/50 gap-4"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                  <img src={item.img} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center py-1">
                  <h3 className="font-bold text-slate-800 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1 text-xs font-bold bg-brand-yellow/20 text-brand-yellow px-2 py-0.5 rounded-lg">
                      <span>★</span>
                      <span>{item.rating}</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      {item.dist} de ti
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-white/90 backdrop-blur-xl border-t border-slate-100 px-6 py-4 flex justify-between items-center pointer-events-auto rounded-t-[3rem] shadow-[0_-20px_50px_-5px_rgba(0,0,0,0.1)]">
          <NavIcon icon={LayoutGrid} label="Explorar" active />
          <NavIcon icon={Heart} label="Favoritos" />
          <NavIcon icon={MapIcon} label="Mapa" />
          <NavIcon icon={User} label="Perfil" />
        </div>
      </div>
    </div>
  );
};

const MapPin = ({ x, y, color }: { x: number, y: number, color: string }) => (
  <motion.div 
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', delay: Math.random() }}
    style={{ top: y, left: x }}
    className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center group cursor-pointer"
  >
    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xl relative z-10")} style={{ backgroundColor: color }}>
        <div className="w-2 h-2 bg-white rounded-full" />
    </div>
    <div className="w-4 h-2 -mt-1 rounded-full blur-[2px] opacity-20" style={{ backgroundColor: color }} />
  </motion.div>
);

const NavIcon = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={cn(
    "flex flex-col items-center gap-1 transition-colors",
    active ? "text-brand-purple" : "text-slate-400"
  )}>
    <Icon size={24} weight={active ? "fill" : "regular"} />
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </div>
);
