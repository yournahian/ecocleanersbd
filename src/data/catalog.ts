export const BRAND = {
  name: 'Eco Cleaners BD',
  slogan: 'Keeping it clean, Keeping you safe',
  // Replace with the real business contact details before launch.
  phoneDisplay: '+880 1XXX-XXXXXX',
  whatsappNumber: '8801000000000',
  email: 'hello@ecocleaners.bd',
} as const

export const AREAS = ['Dhanmondi', 'Mirpur', 'Uttara', 'Mohammadpur', 'Bashundhara'] as const
export type Area = (typeof AREAS)[number]

export type TierId = 'single' | 'bhk1' | 'bhk2' | 'bhk3'

export interface Tier {
  id: TierId
  name: string
  layout: string
  sqft: string
  crew: string
  base: number
  deep: number
}

export const TIERS: Tier[] = [
  {
    id: 'single',
    name: 'Single / Shared Mess Room',
    layout: '1 Room + 1 Washroom',
    sqft: 'Up to 350 sq. ft.',
    crew: '1 Cleaner (1 hr)',
    base: 350,
    deep: 800,
  },
  {
    id: 'bhk1',
    name: '1 BHK Small Flat / Studio',
    layout: '1 Bed, 1 Hall, 1 Kitchen, 1 Washroom',
    sqft: '400–650 sq. ft.',
    crew: '1 Cleaner (1.5 hrs)',
    base: 550,
    deep: 1500,
  },
  {
    id: 'bhk2',
    name: '2 BHK Medium Family Flat',
    layout: '2 Beds, 1 Hall, 1 Kitchen, 2 Washrooms',
    sqft: '700–1,100 sq. ft.',
    crew: '2 Cleaners (1.5 hrs)',
    base: 800,
    deep: 2200,
  },
  {
    id: 'bhk3',
    name: '3 BHK+ Large Apartment',
    layout: '3+ Beds, 1 Hall, 1 Kitchen, 3 Washrooms',
    sqft: '1,200–1,800+ sq. ft.',
    crew: '2 Cleaners (2 hrs)',
    base: 1100,
    deep: 3000,
  },
]

export interface Frequency {
  sessions: 1 | 2 | 4 | 8
  label: string
  cadence: string
  discountPct: number
}

export const FREQUENCIES: Frequency[] = [
  { sessions: 1, label: '1x / month', cadence: 'Monthly once', discountPct: 0 },
  { sessions: 2, label: '2x / month', cadence: 'Bi-weekly', discountPct: 5 },
  { sessions: 4, label: '4x / month', cadence: 'Weekly', discountPct: 10 },
  { sessions: 8, label: '8x / month', cadence: 'Twice a week', discountPct: 15 },
]

export type AddOnId = 'bodycam' | 'germ' | 'degrease' | 'upholstery'

export interface AddOn {
  id: AddOnId
  name: string
  detail: string
  pricePerSession: number
}

export const ADDONS: AddOn[] = [
  {
    id: 'bodycam',
    name: 'Live Body-Cam Feed Access',
    detail: 'Watch the cleaning live from your phone.',
    pricePerSession: 100,
  },
  {
    id: 'germ',
    name: 'Bathroom Deep Germ-Shield',
    detail: 'Baking soda and vinegar scrub.',
    pricePerSession: 300,
  },
  {
    id: 'degrease',
    name: 'Kitchen Oil & Stove Degreasing',
    detail: 'Heavy degreasing for stove and counters.',
    pricePerSession: 500,
  },
  {
    id: 'upholstery',
    name: 'Sofa / Mattress Vacuum & Spot Clean',
    detail: 'Vacuum and gentle spot treatment.',
    pricePerSession: 600,
  },
]

export interface Pack {
  id: string
  name: string
  price: number
  audience: string
  scope: string
  features: string[]
  popular?: boolean
}

export const PACKS: Pack[] = [
  {
    id: 'bachelor-lite',
    name: 'Bachelor Lite',
    price: 1200,
    audience: 'Students & mess rooms',
    scope: 'Single Room, up to 350 sq. ft.',
    features: ['2 Regular Eco-Clean sessions/month (bi-weekly)', '1 Bathroom Germ-Shield treatment included'],
  },
  {
    id: 'bachelor-saver',
    name: 'Bachelor Saver',
    price: 2200,
    audience: 'Shared mess & bachelor flats',
    scope: 'Single Room / Shared Mess',
    features: ['4 Regular Eco-Clean sessions/month (weekly)', '1 Monthly Room & Washroom Deep Clean included'],
  },
  {
    id: 'family-eco',
    name: 'Family Eco Pack',
    price: 5500,
    audience: 'Busy couples & medium apartments',
    scope: 'Up to 2 BHK',
    features: ['4 visits/month: 1 Full Machine Deep Clean + 3 Regular Eco-Cleans', '2 free Live Body-Cam Feed sessions included'],
    popular: true,
  },
  {
    id: 'family-pro',
    name: 'Family Pro Pack',
    price: 9500,
    audience: 'Large families with kids & pets',
    scope: 'Up to 3 BHK+',
    features: ['8 visits/month (twice weekly): 1 Full Deep Clean + 7 Regular Eco-Cleans', 'Free Live Body-Cam Feed on ALL 8 sessions'],
  },
]
