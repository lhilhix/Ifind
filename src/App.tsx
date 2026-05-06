import { MobileFrame } from './components/MobileFrame';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { HomeScreen } from './screens/HomeScreen';
import { PlaceDetailScreen } from './screens/PlaceDetailScreen';
import { Place } from './types';

const CAFE_PLACE: Place = {
  id: '1',
  name: 'Café Central',
  category: 'cafe',
  rating: 4.8,
  distance: '200m',
  image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
  tags: ['Especialidade Café', 'Opções Vegan', 'Pet Friendly'],
  description: 'Um refúgio acolhedor no coração da cidade, onde o café artesanal encontra um ambiente moderno e vibrante. Perfeito para trabalhar ou relaxar com amigos.',
  location: { lat: 38.7126, lng: -9.1393 },
  gallery: [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400&auto=format&fit=crop'
  ]
};

const VIEWPOINT_PLACE: Place = {
  id: '2',
  name: 'Miradouro de Santa Catarina',
  category: 'viewpoint',
  rating: 4.9,
  distance: '800m',
  image: 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=800&auto=format&fit=crop',
  tags: ['Fotografia', 'Pôr do Sol', 'Vista Panorâmica'],
  description: 'Um dos locais mais icónicos para ver o pôr do sol em Lisboa. Oferece uma vista inigualável sobre o rio Tejo e a Ponte 25 de Abril.',
  location: { lat: 38.7095, lng: -9.1476 },
  highlights: [
    'Melhor spot para pôr do sol',
    'Ambiente jovem e relaxado',
    'Frequentado por músicos de rua'
  ],
  gallery: [
    'https://images.unsplash.com/photo-1558236714-d1ae5da8e60b?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1528114039593-4366cc08227d?q=80&w=400&auto=format&fit=crop'
  ]
};

export default function App() {
  return (
    <div className="min-h-screen w-full bg-slate-50 p-12 overflow-x-auto no-scrollbar">
      <div className="max-w-[1700px] mx-auto flex flex-col gap-12">
        {/* Branding & Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center shadow-xl shadow-brand-purple/20 rotate-3">
            <span className="text-white font-display text-2xl font-bold italic">If</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-slate-800">Ifind Design System</h1>
          <p className="text-slate-500 font-medium max-w-lg">
            Um sistema vibrante e jovem para exploração urbana. Descobre lugares, vive experiências e conecta-te com o que te rodeia.
          </p>
        </div>

        {/* Mockup Presentation Grid */}
        <div className="flex gap-12 px-4 pb-12 overflow-x-auto no-scrollbar justify-center">
          <MobileFrame title="1. Welcome Screen">
            <WelcomeScreen />
          </MobileFrame>

          <MobileFrame title="2. Home (Mapa)">
            <HomeScreen />
          </MobileFrame>

          <MobileFrame title="3. Local (Café)">
            <PlaceDetailScreen place={CAFE_PLACE} />
          </MobileFrame>

          <MobileFrame title="4. Local (Miradouro)">
            <PlaceDetailScreen place={VIEWPOINT_PLACE} />
          </MobileFrame>
        </div>
      </div>
    </div>
  );
}
