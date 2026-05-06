import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Compass } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="h-full relative overflow-hidden bg-gradient-to-br from-brand-purple via-brand-pink to-brand-yellow flex flex-col justify-end p-8 pb-16">
      {/* Abstract Background Elements */}
      <motion.div 
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col gap-6"
      >
        <div className="flex gap-4">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/50"
          >
            <MapPin className="text-white" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/50"
          >
            <Navigation className="text-white" size={20} />
          </motion.div>
        </div>

        <h1 className="font-display text-6xl font-bold text-white leading-tight">
          Ifind
        </h1>
        
        <p className="text-white/90 text-2xl font-medium max-w-[240px] leading-relaxed italic">
          Descobre o que te rodeia
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="mt-8 py-5 px-10 bg-white text-brand-purple rounded-3xl font-bold text-xl shadow-2xl hover:shadow-white/20 transition-all flex items-center justify-between group"
        >
          Começar
          <Compass className="group-hover:rotate-45 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Decorative dots */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white/40 rounded-full" />
      <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-white/40 rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-white/20 rounded-full blur-[1px]" />
    </div>
  );
};
