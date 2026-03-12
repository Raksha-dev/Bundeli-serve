import { restaurants, menuItems } from '@/data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Star, Clock, IndianRupee, MapPin, Leaf } from 'lucide-react'
import MenuSection from '@/components/MenuSection'
import CartBar from '@/components/CartBar'

export function generateStaticParams() {
  return restaurants.map(r => ({ id: r.id }))
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = restaurants.find(r => r.id === params.id)
  if (!restaurant) notFound()

  const items = menuItems.filter(m => m.restaurantId === params.id)

  // Group by category
  const categories = Array.from(new Set(items.map(i => i.category)))
  const grouped = categories.reduce<Record<string, typeof items>>((acc, cat) => {
    acc[cat] = items.filter(i => i.category === cat)
    return acc
  }, {})

  return (
    <div className="pb-32">
      {/* Hero banner */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1608]/80 via-[#2A1608]/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-6xl mx-auto">
          {restaurant.isVegOnly && (
            <span className="inline-flex items-center gap-1 bg-green-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2">
              <Leaf size={9} /> Pure Veg
            </span>
          )}
          <h1
            className="text-white text-4xl sm:text-5xl font-bold leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {restaurant.name}
          </h1>
          <p className="text-amber-200/80 text-sm mt-1">{restaurant.cuisine.join(' · ')}</p>
        </div>
      </div>

      {/* Info bar */}
      <div className="bg-white border-b border-amber-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-5">
          <div className="flex items-center gap-1.5 text-sm text-[#4A2C17]">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="font-semibold">{restaurant.rating}</span>
            <span className="text-[#8C6F5A]">rating</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#4A2C17]">
            <Clock size={14} className="text-[#D4380D]" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#4A2C17]">
            <IndianRupee size={14} className="text-[#D4380D]" />
            <span>Min order ₹{restaurant.minOrder}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#4A2C17]">
            <MapPin size={14} className="text-[#D4380D]" />
            <span className="text-[#8C6F5A]">{restaurant.address}</span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-3">
          <p className="text-[#8C6F5A] text-sm">{restaurant.description}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h2
          className="text-3xl font-bold text-[#4A2C17] mb-6"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Menu
        </h2>
        <div className="space-y-10">
          {categories.map(cat => (
            <MenuSection
              key={cat}
              category={cat}
              items={grouped[cat]}
              restaurant={restaurant}
            />
          ))}
        </div>
      </div>

      {/* Sticky cart bar */}
      <CartBar />
    </div>
  )
}
