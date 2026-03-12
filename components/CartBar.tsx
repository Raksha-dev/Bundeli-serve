'use client'

import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectCartCount, selectCartTotal } from '@/store/cartSlice'
import { ShoppingBag, ChevronRight } from 'lucide-react'

export default function CartBar() {
  const count = useSelector(selectCartCount)
  const total = useSelector(selectCartTotal)

  if (count === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4">
      <div className="max-w-lg mx-auto">
        <Link
          href="/cart"
          className="flex items-center justify-between bg-[#D4380D] text-white rounded-2xl px-5 py-4 shadow-2xl shadow-red-900/30 hover:bg-[#B83209] transition-all active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-xl w-9 h-9 flex items-center justify-center">
              <ShoppingBag size={17} />
            </div>
            <div>
              <p className="font-semibold text-sm">{count} item{count > 1 ? 's' : ''} in cart</p>
              <p className="text-white/70 text-xs">Tap to review order</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-lg" style={{ fontFamily: 'DM Mono, monospace' }}>
              ₹{total}
            </span>
            <ChevronRight size={18} className="text-white/60" />
          </div>
        </Link>
      </div>
    </div>
  )
}
