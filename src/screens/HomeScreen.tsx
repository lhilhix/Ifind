import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Utensils, Coffee, Landmark, TreePine, LayoutGrid, Heart, Map as MapIcon, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { Place } from '../types';
import { PLACES } from '../data';
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY !== '';

interface HomeScreenProps {
  onPlaceSelect: (place: Place) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onPlaceSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tudo');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Tudo', icon: LayoutGrid, color: 'bg-brand-purple' },
    { name: 'Comida', icon: Utensils, color: 'bg-orange-500', value: 'food' },
    { name: 'Cafés', icon: Coffee, color: 'bg-brand-pink', value: 'cafe' },
    { name: 'Cultura', icon: Landmark, color: 'bg-brand-blue', value: 'culture' },
    { name: 'Natureza', icon: TreePine, color: 'bg-green-500', value: 'nature' },
  ];

  const filteredPlaces = PLACES.filter(p => {
    const matchesCategory = selectedCategory === 'Tudo' || p.category === categories.find(c => c.name === selectedCategory)?.value;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-slate-50 relative animate-in fade-in duration-500">
      {/* Top Search Bar */}
      <div className="absolute top-4 left-0 w-full px-6 z-20">
        <div className="relative group">
          <div className="absolute inset-x-0 -bottom-1 h-12 bg-black/5 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-5 py-4 rounded-3xl shadow-lg border border-slate-100">
            <Search size={20} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Procura lugares, categorias..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium w-full placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-1 relative overflow-hidden bg-slate-200">
        {hasValidKey ? (
          <APIProvider apiKey={API_KEY}>
            <Map
              defaultCenter={{ lat: 38.7223, lng: -9.1393 }}
              defaultZoom={13}
              mapId="ifind_map"
              className="w-full h-full"
              disableDefaultUI
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            >
              <Markers 
                places={filteredPlaces} 
                onPlaceSelect={onPlaceSelect} 
              />
            </Map>
          </APIProvider>
        ) : (
          /* Placeholder Fallback (Interactive) */
          <div className="absolute inset-0 bg-[#e5e7eb] flex items-center justify-center">
            {/* Abstract Map UI */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 100L400 150M200 0V600M50 0L350 600M0 450L400 400" stroke="#94a3b8" strokeWidth="2" />
              </svg>
            </div>
            
            {filteredPlaces.map((place, idx) => (
              <InteractivePin 
                key={place.id}
                x={120 + (idx * 50) % 150} 
                y={180 + (idx * 70) % 250} 
                color={getCategoryColor(place.category)}
                onClick={() => onPlaceSelect(place)}
              />
            ))}
            
            <div className="absolute flex flex-col items-center gap-1 opacity-60">
                <div className="w-24 h-24 bg-brand-purple/10 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand-purple rounded-full border-2 border-white shadow-xl" />
            </div>

            {/* Key Hint for Developers */}
            {!hasValidKey && API_KEY !== '' && (
              <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-bold text-slate-500 shadow-xl border border-slate-100 z-30">
                Mock Map: Instalar API Key para mapa real
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Category List */}
      <div className="absolute top-24 left-0 w-full overflow-x-auto no-scrollbar py-2 z-20">
        <div className="flex px-6 gap-3 pb-2">
          {categories.map((cat, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.name)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-sm whitespace-nowrap transition-all",
                selectedCategory === cat.name ? "bg-brand-purple text-white shadow-brand-purple/20" : "bg-white text-slate-600 hover:bg-slate-50"
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
            <AnimatePresence mode="popLayout">
              {filteredPlaces.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onPlaceSelect(item)}
                  className="w-72 bg-white/95 backdrop-blur-md rounded-[2rem] p-3 shadow-2xl flex border border-white/50 gap-4 cursor-pointer hover:bg-white transition-colors group"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center py-1">
                    <h3 className="font-bold text-slate-800 line-clamp-1">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1 text-xs font-bold bg-brand-yellow/20 text-brand-yellow px-2 py-0.5 rounded-lg">
                        <span>★</span>
                        <span>{item.rating}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {item.distance} de ti
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredPlaces.length === 0 && (
              <div className="w-72 bg-white/90 backdrop-blur rounded-[2rem] p-8 text-center border border-white/50">
                <p className="text-slate-400 font-bold text-sm">Sem resultados encontrados</p>
              </div>
            )}
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

/**
 * Markers component to handle marker clustering
 */
const Markers = ({ places, onPlaceSelect }: { places: Place[], onPlaceSelect: (place: Place) => void }) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);

  // Initialize Clusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);

  // Update Clusterer when markers change
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  // Function to set marker ref
  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers(prev => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const next = { ...prev };
        delete next[key];
        return next;
      }
    });
  };

  return (
    <>
      {places.map(place => (
        <AdvancedMarker
          key={place.id}
          position={place.location}
          ref={marker => setMarkerRef(marker as unknown as Marker, place.id)}
          onClick={() => onPlaceSelect(place)}
        >
          <Pin
            background={getCategoryColor(place.category)}
            borderColor="white"
            glyphColor="white"
            scale={1.2}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

interface InteractivePinProps {
  x: number;
  y: number;
  color: string;
  onClick: () => void;
}

const InteractivePin: React.FC<InteractivePinProps> = ({ x, y, color, onClick }) => (
  <motion.div 
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', delay: Math.random() * 0.5 }}
    style={{ top: y, left: x }}
    onClick={onClick}
    className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center group cursor-pointer z-10"
  >
    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white shadow-xl relative z-10 border-2 border-white transition-transform group-hover:scale-110")} style={{ backgroundColor: color }}>
        <div className="w-2 h-2 bg-white rounded-full" />
    </div>
    <div className="w-4 h-2 -mt-1 rounded-full blur-[2px] opacity-20" style={{ backgroundColor: color }} />
  </motion.div>
);

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'food': return '#f97316';
    case 'cafe': return '#EC4899';
    case 'culture': return '#3B82F6';
    case 'nature': return '#22c55e';
    case 'viewpoint': return '#8B5CF6';
    default: return '#8B5CF6';
  }
};

const NavIcon = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={cn(
    "flex flex-col items-center gap-1 transition-colors cursor-pointer",
    active ? "text-brand-purple" : "text-slate-400"
  )}>
    <Icon size={24} className={active ? "fill-brand-purple" : ""} />
    <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
  </div>
);
