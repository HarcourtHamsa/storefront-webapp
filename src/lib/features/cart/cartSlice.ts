import { PayloadAction, createSlice, current } from "@reduxjs/toolkit"

export interface CartItemInterface {
    name: string,
    quantity: number,
    price: number,
    id?: string
}


export interface CartInterface {
    cart: CartItemInterface[]
}

export interface PayloadInterface {
    type: string
    payload: any
}

const initialState: CartInterface = {
    cart: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToItemCart: (state, action: PayloadAction<CartItemInterface>) => {
            const item = action.payload as any
            state.cart.push(item)
        },

        clearCart: (state) => {
            state.cart = []
        },

        removeItemFromCart: (state, action: PayloadAction<CartItemInterface>) => {
            const item = action.payload as unknown as CartItemInterface
            const index = state.cart.indexOf(item)
            const newState = state.cart.splice(index, 0)
            state.cart = newState
        },

        decrementItemQuantity: (state, action: PayloadAction<CartItemInterface>) => {
            const item: CartItemInterface = action.payload
            const cart = current(state.cart)

            const newCartState = cart.map((c) => {
                if (c === item) {
                    return {
                        ...c,
                        quantity: c.quantity - 1
                    }
                } else {
                    return c
                }
            })

            state.cart = newCartState
        },

        incrementItemQuantity: (state, action: PayloadAction<CartItemInterface>) => {

            const item: CartItemInterface = action.payload
            const cart = current(state.cart)

            const newCartState = cart.map((c) => {
                if (c === item) {
                    return {
                        ...c,
                        quantity: c.quantity + 1
                    }
                } else {
                    return c
                }
            })

            state.cart = newCartState
        }
    }
})

export const {
    addToItemCart,
    removeItemFromCart,
    decrementItemQuantity,
    incrementItemQuantity,
    clearCart
} = cartSlice.actions

export default cartSlice.reducer