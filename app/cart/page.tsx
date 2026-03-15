"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  removeItem,
  addItem,
  clearCart,
} from "@/store/cartSlice";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { selectUser } from "@/store/authSlice";

const DELIVERY_FEE = 30;

export default function CartPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const grandTotal = total + DELIVERY_FEE;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(phone))
      e.phone = "Enter a valid 10-digit mobile number";
    if (!address.trim() || address.trim().length < 10)
      e.address = "Enter a complete address";
    if (!/^\d{6}$/.test(pincode)) e.pincode = "Enter a valid 6-digit pincode";
    return e;
  };

  const handlePlaceOrder = () => {
    if (!user) {
      router.push("/auth?redirect=/cart");
      return;
    }
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    dispatch(clearCart());
    router.push("/order-confirmed");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-24 text-center">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={32} className="text-[#8C6F5A]" />
        </div>
        <h2
          className="text-3xl font-bold text-[#4A2C17] mb-2"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Your cart is empty
        </h2>
        <p className="text-[#8C6F5A] mb-8">
          Add some delicious food before checking out.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#D4380D] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#B83209] transition-colors"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1
        className="text-4xl font-bold text-[#4A2C17] mb-8"
        style={{ fontFamily: "Cormorant Garamond, serif" }}
      >
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Items */}
        <div className="lg:col-span-3 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-amber-100 p-4 flex items-center gap-4 animate-fade-up"
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className={item.isVeg ? "veg-dot" : "non-veg-dot"}
                    style={{ width: 8, height: 8 }}
                  />
                  <h4 className="text-[#4A2C17] font-medium text-sm truncate">
                    {item.name}
                  </h4>
                </div>
                <p className="text-[#8C6F5A] text-xs">{item.restaurantName}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0 border border-amber-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="w-8 h-8 flex items-center justify-center text-[#D4380D] hover:bg-amber-50 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-[#4A2C17] text-sm font-semibold w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(addItem({ ...item }))}
                    className="w-8 h-8 flex items-center justify-center text-[#D4380D] hover:bg-amber-50 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <span
                  className="font-semibold text-[#4A2C17] text-sm min-w-[52px] text-right"
                  style={{ fontFamily: "DM Mono, monospace" }}
                >
                  ₹{item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
          <button
            onClick={() => dispatch(clearCart())}
            className="flex items-center gap-1.5 text-xs text-[#8C6F5A] hover:text-red-600 transition-colors mt-2"
          >
            <Trash2 size={12} /> Clear cart
          </button>
        </div>

        {/* Summary + Checkout */}
        <div className="lg:col-span-2 space-y-5">
          {/* Bill */}
          <div className="bg-white rounded-2xl border border-amber-100 p-5">
            <h3
              className="text-[#4A2C17] font-semibold text-lg mb-4"
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              Bill Summary
            </h3>
            <div className="space-y-2 text-sm text-[#8C6F5A]">
              <div className="flex justify-between">
                <span>Item total</span>
                <span
                  className="font-medium text-[#4A2C17]"
                  style={{ fontFamily: "DM Mono, monospace" }}
                >
                  ₹{total}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery fee</span>
                <span
                  className="font-medium text-[#4A2C17]"
                  style={{ fontFamily: "DM Mono, monospace" }}
                >
                  ₹{DELIVERY_FEE}
                </span>
              </div>
              <div className="border-t border-amber-100 mt-3 pt-3 flex justify-between">
                <span className="font-semibold text-[#4A2C17]">
                  Grand Total
                </span>
                <span
                  className="font-bold text-[#4A2C17] text-base"
                  style={{ fontFamily: "DM Mono, monospace" }}
                >
                  ₹{grandTotal}
                </span>
              </div>
            </div>
            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-xs text-[#8C6F5A]">
              💵 Cash on Delivery — pay when your order arrives.
            </div>
          </div>

          {/* Login prompt OR address form */}
          {!user ? (
            <div className="bg-white rounded-2xl border border-amber-100 p-5 text-center">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <LogIn size={20} className="text-[#D4380D]" />
              </div>
              <h3
                className="text-[#4A2C17] font-semibold text-base mb-1"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Login to place your order
              </h3>
              <p className="text-[#8C6F5A] text-xs mb-4">
                Sign in or create a free account to complete your order.
              </p>
              <Link
                href="/auth?redirect=/cart"
                className="block w-full bg-[#D4380D] hover:bg-[#B83209] text-white py-3 rounded-xl text-sm font-semibold transition-colors text-center"
              >
                Login / Sign Up
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-amber-100 p-5">
              <h3
                className="text-[#4A2C17] font-semibold text-lg mb-4"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                Delivery Details
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Full Name",
                    key: "name",
                    value: name,
                    set: setName,
                    placeholder: "Your name",
                    type: "text",
                  },
                  {
                    label: "Phone Number",
                    key: "phone",
                    value: phone,
                    set: setPhone,
                    placeholder: "10-digit mobile",
                    type: "tel",
                  },
                  {
                    label: "Pincode",
                    key: "pincode",
                    value: pincode,
                    set: setPincode,
                    placeholder: "6-digit pincode",
                    type: "text",
                  },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-xs font-medium text-[#4A2C17] mb-1">
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={f.value}
                      onChange={(e) => {
                        f.set(e.target.value);
                        setErrors((er) => ({ ...er, [f.key]: "" }));
                      }}
                      className={`w-full border rounded-xl px-3 py-2.5 text-sm text-[#4A2C17] placeholder-[#C4A882] focus:outline-none focus:ring-2 focus:ring-[#D4380D]/30 transition-all ${
                        errors[f.key] ? "border-red-400" : "border-amber-200"
                      }`}
                    />
                    {errors[f.key] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[f.key]}
                      </p>
                    )}
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-medium text-[#4A2C17] mb-1">
                    Full Address
                  </label>
                  <textarea
                    placeholder="House no, Street, Locality, City..."
                    value={address}
                    rows={3}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setErrors((er) => ({ ...er, address: "" }));
                    }}
                    className={`w-full border rounded-xl px-3 py-2.5 text-sm text-[#4A2C17] placeholder-[#C4A882] focus:outline-none focus:ring-2 focus:ring-[#D4380D]/30 resize-none transition-all ${
                      errors.address ? "border-red-400" : "border-amber-200"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-[#D4380D] hover:bg-[#B83209] active:scale-[0.98] text-white py-4 rounded-2xl font-semibold text-base shadow-lg shadow-red-200 transition-all duration-200"
          >
            {user ? `Place Order · ₹${grandTotal}` : "Login to Place Order"}
          </button>
          {user && (
            <p className="text-center text-xs text-[#8C6F5A]">
              Cash on delivery — no advance payment needed
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
