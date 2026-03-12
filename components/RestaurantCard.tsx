import Link from 'next/link'
import Image from 'next/image'
import { Restaurant } from '@/data'
import { Star, Clock, IndianRupee, Leaf } from 'lucide-react'

export default function RestaurantCard({ restaurant: r }: { restaurant: Restaurant }) {
  return (
    <Link href={`/restaurant/${r.id}`} className="block">
      <div className={`restaurant-card bg-white rounded-2xl overflow-hidden border border-amber-100 cursor-pointer ${!r.isOpen ? 'opacity-60' : ''}`}>
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={r.imageUrl}
            alt={r.name}
            fill
            className={`object-cover transition-transform duration-500 hover:scale-105 ${!r.isOpen ? 'grayscale' : ''}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {r.isVegOnly && (
              <span className="flex items-center gap-1 bg-green-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                <Leaf size={9} /> Pure Veg
              </span>
            )}
            {!r.isOpen && (
              <span className="bg-gray-800/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                Closed
              </span>
            )}
          </div>

          {/* Rating badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 text-[#4A2C17] text-xs font-semibold px-2 py-1 rounded-lg shadow-sm">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            {r.rating}
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <h2
            className="text-[#4A2C17] text-xl font-semibold leading-tight mb-1 truncate"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {r.name}
          </h2>
          <p className="text-[#8C6F5A] text-xs mb-3 truncate">{r.cuisine.join(' · ')}</p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-[#8C6F5A]">
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-[#D4380D]" />
              {r.deliveryTime}
            </span>
            <span className="flex items-center gap-1">
              <IndianRupee size={11} className="text-[#D4380D]" />
              Min ₹{r.minOrder}
            </span>
            <span className="ml-auto text-[10px] font-medium text-[#8C6F5A]">
              ₹{r.deliveryFee} delivery
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
