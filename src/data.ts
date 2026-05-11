import { Place } from './types';

export const PLACES: Place[] = [
  {
    id: 'cafe-central',
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
  },
  {
    id: 'miradouro-santa-catarina',
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
  },
  {
    id: 'restaurante-ponto-final',
    name: 'Ponto Final',
    category: 'food',
    rating: 4.7,
    distance: '2.5km',
    image: 'https://images.unsplash.com/photo-1514537024320-911681283995?q=80&w=800&auto=format&fit=crop',
    tags: ['Comida Tradicional', 'Beira-Rio', 'Peixe Fresco'],
    description: 'Famoso pelas suas mesas amarelas junto ao rio em Almada. Uma experiência gastronómica inesquecível com vista para a ponte.',
    location: { lat: 38.6852, lng: -9.1554 }
  },
  {
    id: 'parque-das-nacoes',
    name: 'Parque das Nações',
    category: 'nature',
    rating: 4.6,
    distance: '6km',
    image: 'https://images.unsplash.com/photo-1525902096384-e867ded8ea49?q=80&w=800&auto=format&fit=crop',
    tags: ['Caminhada', 'Arquitetura Moderna', 'Jardins'],
    description: 'Um espaço moderno e refrescante junto ao rio, ideal para desportos ao ar livre e passeios em família.',
    location: { lat: 38.7667, lng: -9.0933 }
  }
];
