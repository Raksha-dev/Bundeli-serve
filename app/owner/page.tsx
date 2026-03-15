"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Order,
  OrderStatus,
  STATUS_LABELS,
  STATUS_COLORS,
} from "@/types/order";
import {
  CheckCircle,
  XCircle,
  Truck,
  PackageCheck,
  Clock,
  RefreshCw,
} from "lucide-react";

const OWNER_EMAIL = process.env.NEXT_PUBLIC_OWNER_EMAIL;

const STATUS_ACTIONS: Partial<
  Record<
    OrderStatus,
    { next: OrderStatus; label: string; icon: React.ReactNode; color: string }[]
  >
> = {
  pending: [
    {
      next: "confirmed",
      label: "Confirm",
      icon: <CheckCircle size={14} />,
      color: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      next: "rejected",
      label: "Reject",
      icon: <XCircle size={14} />,
      color: "bg-red-500 hover:bg-red-600 text-white",
    },
  ],
  confirmed: [
    {
      next: "out_for_delivery",
      label: "Out for Delivery",
      icon: <Truck size={14} />,
      color: "bg-purple-600 hover:bg-purple-700 text-white",
    },
  ],
  out_for_delivery: [
    {
      next: "delivered",
      label: "Mark Delivered",
      icon: <PackageCheck size={14} />,
      color: "bg-blue-600 hover:bg-blue-700 text-white",
    },
  ],
};

export default function OwnerDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [updating, setUpdating] = useState<string | null>(null);
  const [newOrderIds, setNewOrderIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Check if logged-in user is the owner
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email === OWNER_EMAIL) {
        setAuthorized(true);
        fetchOrders();
      } else {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!authorized) return;

    // Realtime subscription
    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          const newOrder = payload.new as Order;
          setOrders((prev) => [newOrder, ...prev]);
          setNewOrderIds((prev) => new Set(prev).add(newOrder.id));
          // Remove highlight after 5 seconds
          setTimeout(() => {
            setNewOrderIds((prev) => {
              const s = new Set(prev);
              s.delete(newOrder.id);
              return s;
            });
          }, 5000);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        (payload) => {
          const updated = payload.new as Order;
          setOrders((prev) =>
            prev.map((o) => (o.id === updated.id ? updated : o))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authorized]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders((data as Order[]) || []);
    setLoading(false);
  };

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    setUpdating(orderId);
    await supabase.from("orders").update({ status }).eq("id", orderId);
    setUpdating(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#D4380D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-5xl mb-4">🔒</p>
          <h2
            className="text-3xl font-bold text-[#4A2C17] mb-2"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Access Restricted
          </h2>
          <p className="text-[#8C6F5A]">
            This page is only for restaurant owners.
          </p>
        </div>
      </div>
    );
  }

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-4xl font-bold text-[#4A2C17]"
            style={{ fontFamily: "Cormorant Garamond, serif" }}
          >
            Order Dashboard
          </h1>
          <p className="text-[#8C6F5A] text-sm mt-1">
            Live updates enabled
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse" />
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 border border-amber-200 bg-white hover:bg-amber-50 text-[#4A2C17] px-4 py-2 rounded-xl text-sm transition-colors"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {(
          [
            "pending",
            "confirmed",
            "out_for_delivery",
            "delivered",
          ] as OrderStatus[]
        ).map((s) => (
          <div
            key={s}
            className={`bg-white rounded-2xl border p-4 ${
              s === "pending" && pendingCount > 0
                ? "border-amber-400 shadow-md shadow-amber-100"
                : "border-amber-100"
            }`}
          >
            <p className="text-[#8C6F5A] text-xs mb-1">{STATUS_LABELS[s]}</p>
            <p
              className="text-2xl font-bold text-[#4A2C17]"
              style={{ fontFamily: "DM Mono, monospace" }}
            >
              {orders.filter((o) => o.status === s).length}
            </p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
        {(
          [
            "all",
            "pending",
            "confirmed",
            "out_for_delivery",
            "delivered",
            "rejected",
          ] as const
        ).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
              filter === s
                ? "bg-[#D4380D] text-white border-[#D4380D]"
                : "bg-white text-[#4A2C17] border-amber-200 hover:bg-amber-50"
            }`}
          >
            {s === "all"
              ? `All (${orders.length})`
              : `${STATUS_LABELS[s]} (${
                  orders.filter((o) => o.status === s).length
                })`}
          </button>
        ))}
      </div>

      {/* Orders */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-[#8C6F5A]">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div
              key={order.id}
              className={`bg-white rounded-2xl border p-5 transition-all duration-500 ${
                newOrderIds.has(order.id)
                  ? "border-amber-400 shadow-lg shadow-amber-100 animate-fade-up"
                  : "border-amber-100"
              }`}
            >
              {newOrderIds.has(order.id) && (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-lg mb-3 inline-flex items-center gap-1.5">
                  🔔 New Order Just Arrived!
                </div>
              )}

              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Order info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="font-bold text-[#4A2C17] text-sm"
                      style={{ fontFamily: "DM Mono, monospace" }}
                    >
                      #{order.id.slice(-6).toUpperCase()}
                    </span>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                        STATUS_COLORS[order.status]
                      }`}
                    >
                      {STATUS_LABELS[order.status]}
                    </span>
                    <span className="text-xs text-[#8C6F5A]">
                      {new Date(order.created_at).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" · "}
                      {new Date(order.created_at).toLocaleDateString("en-IN")}
                    </span>
                  </div>

                  {/* Customer */}
                  <div className="flex flex-wrap gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-[#8C6F5A]">Customer</p>
                      <p className="font-medium text-[#4A2C17]">
                        {order.customer_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8C6F5A]">Phone</p>
                      <p className="font-medium text-[#4A2C17]">
                        {order.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#8C6F5A]">Total</p>
                      <p
                        className="font-bold text-[#D4380D]"
                        style={{ fontFamily: "DM Mono, monospace" }}
                      >
                        ₹{order.total}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <p className="text-xs text-[#8C6F5A] mb-3">
                    📍 {order.address}, {order.pincode}
                  </p>

                  {/* Items */}
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-[#4A2C17] text-xs px-2.5 py-1 rounded-lg"
                      >
                        <span
                          className={item.isVeg ? "veg-dot" : "non-veg-dot"}
                          style={{ width: 7, height: 7 }}
                        />
                        {item.name} × {item.quantity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                {STATUS_ACTIONS[order.status] && (
                  <div className="flex flex-col gap-2">
                    {STATUS_ACTIONS[order.status]!.map((action) => (
                      <button
                        key={action.next}
                        onClick={() => updateStatus(order.id, action.next)}
                        disabled={updating === order.id}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 ${action.color}`}
                      >
                        {updating === order.id ? (
                          <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                        ) : (
                          action.icon
                        )}
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Terminal states */}
                {(order.status === "delivered" ||
                  order.status === "rejected") && (
                  <div
                    className={`text-xs font-medium px-3 py-1.5 rounded-xl border ${
                      STATUS_COLORS[order.status]
                    }`}
                  >
                    {order.status === "delivered"
                      ? "✅ Completed"
                      : "❌ Rejected"}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
