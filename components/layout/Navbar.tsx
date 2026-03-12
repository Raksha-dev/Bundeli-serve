"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCartCount, selectCartTotal } from "@/store/cartSlice";
import { ShoppingBag, MapPin } from "lucide-react";

export default function Navbar() {
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <header className="sticky top-0 z-50 bg-[#FDFAF4]/90 backdrop-blur-md border-b border-amber-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-brand-red flex items-center justify-center shadow-sm">
            <span
              className="text-white text-lg font-bold leading-none"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              B
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="font-bold text-[#4A2C17] text-base tracking-tight"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              BundeliServe
            </span>
            <span className="text-[10px] text-[#8C6F5A] tracking-widest uppercase">
              Food Delivery
            </span>
          </div>
        </Link>

        {/* Location pill */}
        <div className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 cursor-pointer hover:bg-amber-100 transition-colors">
          <MapPin size={12} className="text-brand-red" />
          <span className="text-xs font-medium text-[#4A2C17]">
            Amanganj, MP
          </span>
        </div>

        {/* Cart */}
        <Link
          href="/cart"
          className="flex items-center gap-2 bg-[#D4380D] hover:bg-[#B83209] text-white rounded-xl px-3.5 py-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="relative">
            <ShoppingBag size={17} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-[#D4380D] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {cartCount}
              </span>
            )}
          </div>
          {cartCount > 0 ? (
            <span className="text-sm font-medium hidden sm:block">
              ₹{cartTotal}
            </span>
          ) : (
            <span className="text-sm font-medium hidden sm:block">Cart</span>
          )}
        </Link>
      </div>
    </header>
  );
}
