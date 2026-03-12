'use client'

import { useState, useMemo } from 'react'
import { Restaurant } from '@/data'
import RestaurantCard from './RestaurantCard'
import { Search, Leaf, Flame, Coffee, Star } from 'lucide-react'

const FILTERS = [
  { label: 'All', value: 'all', icon: null },
  { label: 'Veg Only', value: 'veg', icon: <Leaf size={13} /> },
  { label: 'Open Now', value: 'open', icon: <Flame size={13} /> },
  { label: 'Top Rated', value: 'rated', icon: <Star size={13} /> },
  { label: 'Cafe', value: 'cafe', icon: <Coffee size={13} /> },
]

export default function RestaurantGrid({ restaurants }: { restaurants: Restaurant[] }) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = useMemo(() => {
    let list = restaurants

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        r =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.some(c => c.toLowerCase().includes(q))
      )
    }

    if (activeFilter === 'veg') list = list.filter(r => r.isVegOnly)
    if (activeFilter === 'open') list = list.filter(r => r.isOpen)
    if (activeFilter === 'rated') list = list.filter(r => r.rating >= 4.3)
    if (activeFilter === 'cafe') list = list.filter(r => r.cuisine.includes('Cafe'))

    return list
  }, [restaurants, search, activeFilter])

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C6F5A]" />
        <input
          type="text"
          placeholder="Search restaurants or cuisines..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-amber-200 bg-white/70 backdrop-blur-sm text-[#4A2C17] placeholder-[#C4A882] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4380D]/30 focus:border-[#D4380D]/50 transition-all"
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
              activeFilter === f.value
                ? 'bg-[#D4380D] text-white border-[#D4380D] shadow-md shadow-red-200'
                : 'bg-white text-[#4A2C17] border-amber-200 hover:border-[#D4380D]/40 hover:bg-amber-50'
            }`}
          >
            {f.icon}
            {f.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-[#8C6F5A] text-sm mb-5">
        {filtered.length === 0
          ? 'No restaurants found'
          : `${filtered.length} restaurant${filtered.length > 1 ? 's' : ''} near you`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r, i) => (
            <div
              key={r.id}
              className={`animate-fade-up stagger-${Math.min(i + 1, 6)}`}
            >
              <RestaurantCard restaurant={r} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🍽️</p>
          <p className="text-[#8C6F5A] text-lg" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            No restaurants match your search
          </p>
          <button
            onClick={() => { setSearch(''); setActiveFilter('all') }}
            className="mt-4 text-[#D4380D] text-sm underline underline-offset-2"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  )
}
