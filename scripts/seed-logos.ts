import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const brands = [
  {
    name: 'Frontix',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/3d7405dcabc4b2834386ca40862571ef89da0b9b?width=1304',
  },
  {
    name: 'Bitfirst',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/f3853daecf41ae7421da3fb9963284be380a3d20?width=1310',
  },
  {
    name: 'Vernacula',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/a427c717b2d578c04ac63a52598ce725a05877de?width=1368',
  },
  {
    name: 'Easedo',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/ab7997ef40116660302a3e537499c5ccd5dd377e?width=1334',
  },
  {
    name: 'Tabitha Properties',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/ed26ae1bd73d6359ddf4105b7a242bff5a666270?width=1576',
  },
  {
    name: 'WOW',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/7a4b8168fde60eff6e0e280d7e1134c79b53c27c?width=1598',
  },
  {
    name: 'Jolakin',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/7c17df4df7de17f72702585a75d50d201fa2e5b4?width=1576',
  },
  {
    name: 'LordFrank',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/38517cc3338b4d18c4a09991bb55a7c90cef1eb1?width=1598',
  },
]

async function seedLogos() {
  const { data, error } = await supabase.from('logos').insert(brands)

  if (error) {
    console.error('Error seeding logos:', error)
  } else {
    console.log('Successfully seeded logos:', data)
  }
}

seedLogos()
