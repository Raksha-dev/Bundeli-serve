import { MenuItem, Restaurant } from '@/data'
import MenuItemCard from './MenuItemCard'

export default function MenuSection({
  category,
  items,
  restaurant,
}: {
  category: string
  items: MenuItem[]
  restaurant: Restaurant
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h3
          className="text-xl font-semibold text-[#4A2C17]"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          {category}
        </h3>
        <span className="text-xs text-[#8C6F5A] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
          {items.length} items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(item => (
          <MenuItemCard key={item.id} item={item} restaurant={restaurant} />
        ))}
      </div>
    </div>
  )
}
