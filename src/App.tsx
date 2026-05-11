import { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { HomeScreen } from './screens/HomeScreen';
import { PlaceDetailScreen } from './screens/PlaceDetailScreen';
import { Place } from './types';
import { AnimatePresence, motion } from 'motion/react';

type Screen = 'welcome' | 'home' | 'detail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const handleStart = () => {
    setCurrentScreen('home');
  };

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setCurrentScreen('detail');
  };

  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedPlace(null);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-4">
      {/* Desktop Helper / Instructions overlay */}
      <div className="fixed top-8 left-8 hidden xl:flex flex-col gap-4 text-white/40 max-w-xs scale-90 origin-top-left pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center text-white font-bold italic text-sm">If</div>
          <span className="font-display font-bold tracking-wider uppercase text-xs">Ifind App</span>
        </div>
        <div className="h-[1px] bg-white/10 w-full" />
        <p className="text-xs leading-relaxed">
          Esta é uma aplicação interativa mobile. Podes navegar entre o ecrã de boas-vindas, o mapa de exploração e os detalhes de cada local.
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
            Mapa Interativo
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
            Filtros por Categoria
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
            Detalhes de Lugares
          </div>
        </div>
      </div>

      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-20 bg-brand-purple/20 rounded-full blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none" />
        
        <MobileFrame title={currentScreen === 'welcome' ? 'Start Journey' : 'v1.0'} className="shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen + (selectedPlace?.id || '')}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full w-full"
            >
              {currentScreen === 'welcome' && (
                <WelcomeScreen onStart={handleStart} />
              )}
              {currentScreen === 'home' && (
                <HomeScreen onPlaceSelect={handlePlaceSelect} />
              )}
              {currentScreen === 'detail' && selectedPlace && (
                <PlaceDetailScreen place={selectedPlace} onBack={handleBack} />
              )}
            </motion.div>
          </AnimatePresence>
        </MobileFrame>
      </div>

      {/* Legend for API Key */}
      {!process.env.GOOGLE_MAPS_PLATFORM_KEY && (
        <div className="fixed bottom-8 right-8 bg-slate-800/80 backdrop-blur border border-white/10 p-4 rounded-2xl hidden md:block max-w-[280px]">
           <p className="text-[10px] text-white/60 leading-relaxed">
             <strong className="text-white">Dica:</strong> Para ver o mapa real da Google, adiciona a tua <code className="text-brand-purple bg-brand-purple/10 px-1 rounded">GOOGLE_MAPS_PLATFORM_KEY</code> às Secrets do AI Studio.
           </p>
        </div>
      )}
    </div>
  );
}
