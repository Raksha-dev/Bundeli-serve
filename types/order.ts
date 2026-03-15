export type OrderStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "out_for_delivery"
  | "delivered";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
};

export type Order = {
  id: string;
  user_id: string;
  user_email: string;
  restaurant_id: string;
  restaurant_name: string;
  items: OrderItem[];
  customer_name: string;
  phone: string;
  address: string;
  pincode: string;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: OrderStatus;
  created_at: string;
};

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  rejected: "Rejected",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
  out_for_delivery: "bg-purple-50 text-purple-700 border-purple-200",
  delivered: "bg-green-50 text-green-700 border-green-200",
};
