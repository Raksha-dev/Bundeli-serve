"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount, selectCartTotal } from "@/store/cartSlice";
import { selectUser, selectAuthLoading, clearUser } from "@/store/authSlice";
import { ShoppingBag, MapPin, User, LogOut, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthLoading);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await supabase.auth.signOut();
    dispatch(clearUser());
  };

  const displayName = user?.fullName || user?.email?.split("@")[0] || "Account";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-[#FDFAF4]/90 backdrop-blur-md border-b border-amber-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-[#D4380D] flex items-center justify-center shadow-sm">
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
          <MapPin size={12} className="text-[#D4380D]" />
          <span className="text-xs font-medium text-[#4A2C17]">
            Select Location
          </span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Auth area */}
          {!loading && (
            <>
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl px-3 py-2 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#D4380D] flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">
                        {initials}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-[#4A2C17] hidden sm:block max-w-[80px] truncate">
                      {displayName}
                    </span>
                    <ChevronDown
                      size={12}
                      className={`text-[#8C6F5A] transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl border border-amber-100 shadow-xl shadow-amber-100/50 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-amber-50">
                        <p className="text-xs text-[#8C6F5A]">Signed in as</p>
                        <p className="text-sm font-medium text-[#4A2C17] truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="flex items-center gap-1.5 border border-amber-200 bg-white hover:bg-amber-50 text-[#4A2C17] rounded-xl px-3.5 py-2 text-sm font-medium transition-all"
                >
                  <User size={14} />
                  <span className="hidden sm:block">Login</span>
                </Link>
              )}
            </>
          )}

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
      </div>
    </header>
  );
}
