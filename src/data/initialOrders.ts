import type { PastOrderItem } from '../types';

export const INITIAL_PAST_ORDERS: PastOrderItem[] = [
  {
    id: 'past-1',
    productId: 'prod-flat-white',
    name: 'Flat White Roastery',
    details: 'Mediano 12 oz · Doble shot espresso',
    price: 4.50,
    category: 'caliente',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9MSgrz95nlwh1jwrzTM2VhL1-WA0dMDSZJIuqsNBOfeKVrlYUh7Vw1yFhOg4Ib0aaauBcqkvb0TEHhE-eBjku5NjrDjQInJFUvqoNf1pe917KB5ntMmMMIuNKqTEZ0mf5pXXRxMJWnJqg5PvDXOo_qUBi8tKX8CdlXgKbblIvGnOLspG3ywMpgIil1hrEAHSUOHReni2OMH-rrb1035mHla-Y0JZVgaTanVxA8D4XxZU2jcdjrYFDUA',
    customizations: {
      size: 'Mediano 12 oz',
      milk: 'Entera',
      shots: 'Doble shot (+ $0.50)',
      syrup: 'Sin endulzante',
    }
  },
  {
    id: 'past-2',
    productId: 'prod-caramel-iced-latte',
    name: 'Caramel Iced Latte',
    details: 'Grande 16 oz · Jarabe artesanal',
    price: 5.20,
    category: 'frio',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8SOIfhqLKPfVqn-smNi7bopJkwWZGeb-3rOUfz_HSZMROK5HEfXewIGGiO_-5d2lEVQPDRdniTr1nkbFUJK5R9ZsvM6FVGzttMHLvtPVy_YSXAcEvpLe5Hn8oO_0dVzGAkXum3PA9nvu_CztRgZ6G5Xdk5ADLzPWsIctrP8HozNcvVKwgQSm8stAsOVq3udZWVz0qD7LC2rtqdeF6c-biKenBnZSmoBwnT1lmLhvuZj-5QFCFxN4Fdg',
    customizations: {
      size: 'Grande 16 oz',
      milk: 'Entera',
      syrup: 'Caramelo Artesanal (+ $0.50)',
      ice: 'Hielo regular',
    }
  },
  {
    id: 'past-3',
    productId: 'prod-croissant-almendras',
    name: 'Croissant Almendras',
    details: 'Masa hojaldrada con láminas de almendra',
    price: 3.90,
    category: 'panaderia',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDk7LmicfLUiP4LHeK6m5lmFwFgLnUn_Ch2a-7L4VPXf00VyU3AchmSZMoKs2VG4qx7iCHj01UN0FB8DOJFn4jNgu-VqZVfbYnN5ZQXudx7Y0sCf_3DV0a96d4mey8-bkoz1q918yBjdnwtQm5sRkJn-vVWnDu6BBrXr_wOGr6e6x7QVoZsK5wtI34ZKwGaqOH73_1l8TdIn0FBPMAbN4SIVSbTMU3fk9fQNjNbd9ds7bL18Ghgs8-3Dg',
    customizations: {
      size: 'Mediano 12 oz',
      warming: 'Calentado al horno',
    }
  },
  {
    id: 'past-4',
    productId: 'prod-matcha-ceremonial',
    name: 'Matcha Ceremonial',
    details: 'Té matcha orgánico de Uji, Kioto',
    price: 5.00,
    category: 'te',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ_v4BobnaLDv3k6XZsmULchdl10UbExWgvkG22LTNNwZcbtoWhO1zwYtXaW42onHvLOaEDxZaGIG9JNHuQhOZDMyg090FMx5kc3m6g2-6s63jJpa_dNH19HH2FTq8FJacVdSSX1pFSsAVXos3b_ArDnA-o8r6LHGIMtpcdgPzkMXlYagTnOeHdzpyeLFNiSid_65y3H08izdRUyvaHdUPA6MZvAtjGhzGHG9_connvCAEQg1UZcAULA',
    customizations: {
      size: 'Mediano 12 oz',
      milk: 'Avena Orgánica (+ $0.60)',
      syrup: 'Sin endulzante',
    }
  },
];
