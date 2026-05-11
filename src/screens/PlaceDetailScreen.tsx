import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Star, Navigation2, Bookmark, Share2, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Place } from '../types';

interface PlaceDetailScreenProps {
  place: Place;
  onBack: () => void;
}

export const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({ place, onBack }) => {
  return (
    <div className="h-full bg-white flex flex-col no-scrollbar overflow-y-auto pb-12 relative animate-in fade-in slide-in-from-right duration-300">
      {/* Header Image */}
      <div className="h-[40%] relative flex-shrink-0">
        <img src={place.image} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        
        {/* Top Controls */}
        <div className="absolute top-4 w-full flex justify-between px-6 z-20">
          <motion.button 
            onClick={onBack}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 text-white"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <div className="flex gap-2">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 text-white"
            >
              <Share2 size={20} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white items-center justify-center rounded-xl flex text-brand-purple shadow-lg"
            >
              <Bookmark size={20} fill="currentColor" />
            </motion.button>
          </div>
        </div>

        {/* Name & Quick Info (Overlay) */}
        <div className="absolute bottom-6 px-6 w-full z-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <span className={cn(
                "px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-lg",
                place.category === 'cafe' ? "bg-brand-pink" : 
                place.category === 'viewpoint' ? "bg-brand-blue" :
                place.category === 'food' ? "bg-orange-500" : "bg-green-500"
              )}>
                {place.category}
              </span>
              <div className="flex items-center gap-1 bg-brand-yellow px-2 py-0.5 rounded-lg">
                <Star size={10} fill="currentColor" className="text-white" />
                <span className="text-[10px] font-black text-white">{place.rating}</span>
              </div>
            </div>
            <h1 className="text-3xl font-display font-bold text-white leading-tight">
              {place.name}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col gap-8 -mt-4 bg-white rounded-t-3xl relative z-10">
        {/* Info Pills */}
        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
          <InfoItem label="Distância" value={place.distance} />
          <div className="w-[1px] h-8 bg-slate-200" />
          <InfoItem label="Aberto até" value="20:00" />
          <div className="w-[1px] h-8 bg-slate-200" />
          <InfoItem label="Preço" value="€€" />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <ActionButton icon={Navigation2} label="Ira agora" primary />
          <ActionButton icon={Phone} label="Ligar" />
          <ActionButton icon={Share2} label="Partilhar" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {place.tags.map((tag, idx) => (
            <span key={idx} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold border border-slate-200">
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-slate-800">Sobre</h2>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            {place.description}
          </p>
        </div>

        {/* Gallery/Photos */}
        {place.gallery && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end">
              <h2 className="text-lg font-bold text-slate-800">Fotos</h2>
              <button className="text-brand-purple text-xs font-bold uppercase tracking-widest">Ver Todas</button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
              {place.gallery.map((img, idx) => (
                <div key={idx} className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-100">
                   <img src={img} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {place.highlights && (
           <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold text-slate-800">Destaques</h2>
              <div className="grid grid-cols-1 gap-3">
                {place.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-brand-purple/5 p-3 rounded-xl border border-brand-purple/10">
                    <CheckCircle2 size={18} className="text-brand-purple" />
                    <span className="text-sm font-bold text-slate-700">{h}</span>
                  </div>
                ))}
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    <span className="text-sm font-black text-slate-800 mt-1">{value}</span>
  </div>
);

const ActionButton = ({ icon: Icon, label, primary = false }: { icon: any, label: string, primary?: boolean }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    className={cn(
      "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all",
      primary ? "bg-brand-purple text-white shadow-xl shadow-brand-purple/20" : "bg-slate-50 text-slate-600 border border-slate-100"
    )}
  >
    <Icon size={20} />
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </motion.button>
);
