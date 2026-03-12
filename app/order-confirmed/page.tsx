'use client'

import Link from 'next/link'
import { CheckCircle, Clock, Home } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function OrderConfirmedPage() {
  const [orderId] = useState(() => `BS${Date.now().toString().slice(-6)}`)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div
        className={`max-w-md w-full text-center transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Success icon */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
          <div className="relative w-28 h-28 bg-green-50 border-4 border-green-200 rounded-full flex items-center justify-center">
            <CheckCircle size={52} className="text-green-500" strokeWidth={1.5} />
          </div>
        </div>

        <h1
          className="text-5xl font-bold text-[#4A2C17] mb-3"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Order Placed!
        </h1>
        <p className="text-[#8C6F5A] text-base mb-8 leading-relaxed">
          Your order has been received.<br />
          Get ready for some amazing food!
        </p>

        {/* Order details card */}
        <div className="bg-white border border-amber-100 rounded-2xl p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-amber-50">
            <span className="text-[#8C6F5A] text-sm">Order ID</span>
            <span className="font-bold text-[#4A2C17] text-sm tracking-wider" style={{ fontFamily: 'DM Mono, monospace' }}>
              #{orderId}
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-amber-50">
            <span className="text-[#8C6F5A] text-sm">Payment</span>
            <span className="text-[#4A2C17] text-sm font-medium">💵 Cash on Delivery</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#8C6F5A] text-sm flex items-center gap-1.5">
              <Clock size={13} /> Estimated delivery
            </span>
            <span className="text-[#4A2C17] text-sm font-medium">30–45 minutes</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-[#D4380D] text-white py-3.5 rounded-xl font-medium hover:bg-[#B83209] transition-colors"
          >
            <Home size={16} /> Back to Home
          </Link>
        </div>

        <p className="text-[#8C6F5A] text-xs mt-6">
          Questions? Call us at <span className="text-[#D4380D] font-medium">+91 76XXX XXXXX</span>
        </p>
      </div>
    </div>
  )
}
