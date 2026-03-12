import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  restaurantId: string
  restaurantName: string
  isVeg: boolean
  imageUrl: string
}

type CartState = {
  items: CartItem[]
  restaurantId: string | null
  restaurantName: string | null
}

const initialState: CartState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
        state.restaurantId = action.payload.restaurantId
        state.restaurantName = action.payload.restaurantName
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const existing = state.items.find(i => i.id === action.payload)
      if (existing) {
        if (existing.quantity === 1) {
          state.items = state.items.filter(i => i.id !== action.payload)
          if (state.items.length === 0) {
            state.restaurantId = null
            state.restaurantName = null
          }
        } else {
          existing.quantity -= 1
        }
      }
    },
    clearCart(state) {
      state.items = []
      state.restaurantId = null
      state.restaurantName = null
    },
  },
})

export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer

export const selectCartItems = (state: { cart: CartState }) => state.cart.items
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
export const selectItemQuantity = (id: string) => (state: { cart: CartState }) =>
  state.cart.items.find(i => i.id === id)?.quantity ?? 0
export const selectCartRestaurantId = (state: { cart: CartState }) => state.cart.restaurantId
