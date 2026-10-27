import type { Product, Category } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'caliente', name: 'Café Caliente', icon: 'local_cafe', count: 6 },
  { id: 'frio', name: 'Café Frío', icon: 'mode_fan', count: 4 },
  { id: 'te', name: 'Té & Infusiones', icon: 'eco', count: 3 },
  { id: 'panaderia', name: 'Panadería', icon: 'bakery_dining', count: 4 },
  { id: 'snacks', name: 'Snacks', icon: 'lunch_dining', count: 3 },
];

export const INITIAL_PRODUCTS: Product[] = [
  // Café Caliente
  {
    id: 'prod-flat-white',
    name: 'Flat White Roastery',
    description: 'Doble shot espresso con microespuma aterciopelada de leche seleccionada.',
    price: 4.50,
    category: 'caliente',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9MSgrz95nlwh1jwrzTM2VhL1-WA0dMDSZJIuqsNBOfeKVrlYUh7Vw1yFhOg4Ib0aaauBcqkvb0TEHhE-eBjku5NjrDjQInJFUvqoNf1pe917KB5ntMmMMIuNKqTEZ0mf5pXXRxMJWnJqg5PvDXOo_qUBi8tKX8CdlXgKbblIvGnOLspG3ywMpgIil1hrEAHSUOHReni2OMH-rrb1035mHla-Y0JZVgaTanVxA8D4XxZU2jcdjrYFDUA',
    badge: 'Favorito',
    isFavorite: true,
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      milk: 'Entera',
      shots: 'Doble shot (+ $0.50)',
      syrup: 'Sin endulzante',
    }
  },
  {
    id: 'prod-cappuccino',
    name: 'Cappuccino Artesanal',
    description: 'Equilibrio 1:1 espresso y espuma sedosa, terminado con cacao fino.',
    price: 4.20,
    category: 'caliente',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDsZU59ijeMle_eGiAYKwsC0NU0sOARra9IE_P2AiBVz9dXx4-8l6rjaa9umscFNuikRKNx7m98bJhms8V_93II_clzEpv8u6aWdnckr6iWEU61nhZawl8tr3r90FQJ-uu5j_XLY185u-8evY5EFArlZLBx4vwSfzoaxhuOpoRSC70LVxJoZlRtZlgydvJwRQqYs7vGBwb4BPDk_d4ZCwC6lYb-efUwZj1R5aGRjY7a4gypOBMGNKTFw',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      milk: 'Entera',
      shots: 'Normal (1 shot)',
      syrup: 'Sin endulzante',
    }
  },
  {
    id: 'prod-latte-bourbon',
    name: 'Latte Vainilla Bourbon',
    description: 'Espresso suave infusionado con vainilla pura de Madagascar y leche vaporizada.',
    price: 4.90,
    category: 'caliente',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      milk: 'Entera',
      shots: 'Normal (1 shot)',
      syrup: 'Vainilla Madagascar (+ $0.50)',
    }
  },
  {
    id: 'prod-americano',
    name: 'Americano Clásico Barista',
    description: 'Espresso de origen único diluido con agua a temperatura precisa.',
    price: 3.50,
    category: 'caliente',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      shots: 'Doble shot (+ $0.50)',
    }
  },
  {
    id: 'prod-espresso-doble',
    name: 'Espresso Doble Origen',
    description: 'Extracción balanceada con notas de chocolate amargo, frutos rojos y avellana.',
    price: 3.20,
    category: 'caliente',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    customizable: true,
    defaultOptions: {
      size: 'Chico 8 oz',
      shots: 'Doble shot (+ $0.50)',
    }
  },
  {
    id: 'prod-mocha-oaxaca',
    name: 'Mocha Chocolate Oaxaca',
    description: 'Cacao artesanal oaxaqueño fundido con café de tueste medio y leche sedosa.',
    price: 5.10,
    category: 'caliente',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80',
    badge: 'Especial',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      milk: 'Entera',
      shots: 'Normal (1 shot)',
    }
  },

  // Café Frío
  {
    id: 'prod-caramel-iced-latte',
    name: 'Caramel Iced Latte',
    description: 'Espresso vertido sobre hielo cristalino y caramelo tostado artesanal.',
    price: 5.20,
    category: 'frio',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8SOIfhqLKPfVqn-smNi7bopJkwWZGeb-3rOUfz_HSZMROK5HEfXewIGGiO_-5d2lEVQPDRdniTr1nkbFUJK5R9ZsvM6FVGzttMHLvtPVy_YSXAcEvpLe5Hn8oO_0dVzGAkXum3PA9nvu_CztRgZ6G5Xdk5ADLzPWsIctrP8HozNcvVKwgQSm8stAsOVq3udZWVz0qD7LC2rtqdeF6c-biKenBnZSmoBwnT1lmLhvuZj-5QFCFxN4Fdg',
    badge: 'Favorito',
    isFavorite: true,
    customizable: true,
    defaultOptions: {
      size: 'Grande 16 oz',
      milk: 'Entera',
      syrup: 'Caramelo Artesanal (+ $0.50)',
      ice: 'Hielo regular',
    }
  },
  {
    id: 'prod-cold-brew-nitro',
    name: 'Cold Brew Nitro 12h',
    description: 'Macerado en frío por 12 horas e infusionado con nitrógeno puro.',
    price: 4.80,
    category: 'frio',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJJT3Ef_srjlnnm6gEwDyKRxKH5V76TBm1oKRbyVXOUOH01b63IVHUbxScXR3ONpqZ9s_6aY0YAXifWw7qT69PrThlskx1-azkwWoHYhWR-ytrrLi1d6m6a0CCtzfEpnCv95-gT2h3sSarXN-Ryg7zWlCs48IFuG_xRYZMG66rVZAaS0SobXF4Dd8z9j4EJeV2EFnD1vdClfu1qJWwjO8Ov-EwQm8xwsBnZ-Ig1eZK5qyX2dE9s7lpjw',
    badge: 'En Barril',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      ice: 'Poco hielo',
    }
  },
  {
    id: 'prod-shakerato',
    name: 'Shakerato Avellana & Vainilla',
    description: 'Espresso doble agitado vigorosamente con hielo y jarabe de avellana silvestre.',
    price: 4.95,
    category: 'frio',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      ice: 'Hielo regular',
    }
  },
  {
    id: 'prod-iced-americano',
    name: 'Iced Americano Cítrico',
    description: 'Espresso doble extraído en frío sobre hielo con un toque de piel de naranja.',
    price: 3.80,
    category: 'frio',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    customizable: true,
    defaultOptions: {
      size: 'Grande 16 oz',
      ice: 'Hielo regular',
    }
  },

  // Té & Infusiones
  {
    id: 'prod-matcha-ceremonial',
    name: 'Matcha Ceremonial',
    description: 'Té matcha grado ceremonial orgánico de Uji, Kioto, batido con leche vegetal.',
    price: 5.00,
    category: 'te',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ_v4BobnaLDv3k6XZsmULchdl10UbExWgvkG22LTNNwZcbtoWhO1zwYtXaW42onHvLOaEDxZaGIG9JNHuQhOZDMyg090FMx5kc3m6g2-6s63jJpa_dNH19HH2FTq8FJacVdSSX1pFSsAVXos3b_ArDnA-o8r6LHGIMtpcdgPzkMXlYagTnOeHdzpyeLFNiSid_65y3H08izdRUyvaHdUPA6MZvAtjGhzGHG9_connvCAEQg1UZcAULA',
    badge: 'Japonés',
    isFavorite: true,
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      milk: 'Avena Orgánica (+ $0.60)',
      syrup: 'Sin endulzante',
    }
  },
  {
    id: 'prod-chai-latte',
    name: 'Chai Latte Especiado',
    description: 'Té negro infusionado con canela, cardamomo, clavo, jengibre fresco y leche vaporizada.',
    price: 4.75,
    category: 'te',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      milk: 'Entera',
    }
  },
  {
    id: 'prod-infusion-lavanda',
    name: 'Infusión Manzanilla & Lavanda',
    description: 'Flores de manzanilla silvestre con lavanda provenzal y un sutil toque de miel.',
    price: 3.80,
    category: 'te',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
    }
  },

  // Panadería
  {
    id: 'prod-croissant-almendras',
    name: 'Croissant Almendras',
    description: 'Masa hojaldrada con frangipane artesanal y láminas tostadas de almendra.',
    price: 3.90,
    category: 'panaderia',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk7LmicfLUiP4LHeK6m5lmFwFgLnUn_Ch2a-7L4VPXf00VyU3AchmSZMoKs2VG4qx7iCHj01UN0FB8DOJFn4jNgu-VqZVfbYnN5ZQXudx7Y0sCf_3DV0a96d4mey8-bkoz1q918yBjdnwtQm5sRkJn-vVWnDu6BBrXr_wOGr6e6x7QVoZsK5wtI34ZKwGaqOH73_1l8TdIn0FBPMAbN4SIVSbTMU3fk9fQNjNbd9ds7bL18Ghgs8-3Dg',
    badge: 'Horneado Hoy',
    isFavorite: true,
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      warming: 'Calentado al horno',
    }
  },
  {
    id: 'prod-pain-au-chocolat',
    name: 'Pain au Chocolat Francés',
    description: 'Hojaldre de mantequilla pura francesa relleno con barras dobles de chocolate belga.',
    price: 4.10,
    category: 'panaderia',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      warming: 'Calentado al horno',
    }
  },
  {
    id: 'prod-cookie-marina',
    name: 'Cookie Chispas & Sal Marina',
    description: 'Galleta suave en el centro con trozos de chocolate oscuro 70% y escamas de sal marina.',
    price: 3.20,
    category: 'panaderia',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    badge: 'Favorito',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      warming: 'Calentado al horno',
    }
  },
  {
    id: 'prod-cinnamon-roll',
    name: 'Rol de Canela Glaseado',
    description: 'Masa brioche enrollada con canela de Ceilán y cobertura de queso crema suave.',
    price: 4.25,
    category: 'panaderia',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      warming: 'Calentado al horno',
    }
  },

  // Snacks & Bowls
  {
    id: 'prod-avocado-toast',
    name: 'Avocado Toast & Feta',
    description: 'Pan de masa madre tostado con aguacate hass laminado, queso feta y semillas de sésamo.',
    price: 6.50,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    badge: 'Saludable',
    customizable: false,
  },
  {
    id: 'prod-yogur-bowl',
    name: 'Bowl Yogur Griego & Frutas',
    description: 'Yogur griego natural, frutos rojos frescos, granola artesanal horneada con miel.',
    price: 5.80,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    customizable: false,
  },
  {
    id: 'prod-sandwich-prosciutto',
    name: 'Ciabatta Prosciutto & Pesto',
    description: 'Prosciutto curado, mozzarella di bufala, pesto genovés fresco y rúcula en pan ciabatta.',
    price: 7.20,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    badge: 'Recomendado',
    customizable: true,
    defaultOptions: {
      size: 'Mediano 12 oz',
      warming: 'Calentado al horno',
    }
  },
];
