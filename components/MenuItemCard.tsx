'use client'

import { useDispatch, useSelector } from 'react-redux'
import { MenuItem, Restaurant } from '@/data'
import { addItem, removeItem, selectItemQuantity, selectCartRestaurantId } from '@/store/cartSlice'
import Image from 'next/image'
import { Plus, Minus, Award } from 'lucide-react'
import { useState } from 'react'

export default function MenuItemCard({
  item,
  restaurant,
}: {
  item: MenuItem
  restaurant: Restaurant
}) {
  const dispatch = useDispatch()
  const quantity = useSelector(selectItemQuantity(item.id))
  const cartRestaurantId = useSelector(selectCartRestaurantId)
  const [showConflict, setShowConflict] = useState(false)
  const [popKey, setPopKey] = useState(0)

  const handleAdd = () => {
    if (cartRestaurantId && cartRestaurantId !== item.restaurantId) {
      setShowConflict(true)
      return
    }
    dispatch(addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurantId: item.restaurantId,
      restaurantName: restaurant.name,
      isVeg: item.isVeg,
      imageUrl: item.imageUrl,
    }))
    setPopKey(k => k + 1)
  }

  const handleRemove = () => {
    dispatch(removeItem(item.id))
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-amber-100 p-4 flex gap-4 hover:border-amber-200 hover:shadow-md transition-all duration-200">
        {/* Details */}
        <div className="flex-1 min-w-0">
          {/* Veg/Non-veg indicator */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className={item.isVeg ? 'veg-dot' : 'non-veg-dot'} />
            {item.isBestseller && (
              <span className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                <Award size={9} /> Bestseller
              </span>
            )}
          </div>

          <h4
            className="text-[#4A2C17] font-semibold text-base leading-snug mb-1"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {item.name}
          </h4>
          <p className="text-[#8C6F5A] text-xs leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>

          {/* Price + controls */}
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#4A2C17] text-sm" style={{ fontFamily: 'DM Mono, monospace' }}>
              ₹{item.price}
            </span>

            {quantity === 0 ? (
              <button
                onClick={handleAdd}
                disabled={!item.isAvailable}
                className="flex items-center gap-1.5 bg-[#D4380D] hover:bg-[#B83209] disabled:bg-gray-300 text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition-all shadow-sm hover:shadow"
              >
                <Plus size={12} /> Add
              </button>
            ) : (
              <div key={popKey} className="flex items-center gap-0 bg-[#D4380D] rounded-xl overflow-hidden shadow-sm animate-pop">
                <button
                  onClick={handleRemove}
                  className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#B83209] transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-white text-xs font-bold w-6 text-center">{quantity}</span>
                <button
                  onClick={handleAdd}
                  className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#B83209] transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
      </div>

      {/* Conflict modal */}
      {showConflict && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <p className="text-2xl mb-3">🛒</p>
            <h3 className="text-[#4A2C17] font-semibold text-lg mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Items already in cart
            </h3>
            <p className="text-[#8C6F5A] text-sm mb-5">
              Your cart has items from another restaurant. Adding this will clear your current cart.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConflict(false)}
                className="flex-1 border border-amber-200 text-[#4A2C17] py-2.5 rounded-xl text-sm font-medium hover:bg-amber-50 transition-colors"
              >
                Keep current
              </button>
              <button
                onClick={() => {
                  setShowConflict(false)
                  // clear and add
                  dispatch({ type: 'cart/clearCart' })
                  dispatch(addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                    restaurantId: item.restaurantId,
                    restaurantName: restaurant.name,
                    isVeg: item.isVeg,
                    imageUrl: item.imageUrl,
                  }))
                }}
                className="flex-1 bg-[#D4380D] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#B83209] transition-colors"
              >
                Start fresh
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
