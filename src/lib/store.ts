import { configureStore, combineReducers, combineSlices } from "@reduxjs/toolkit"
import cartReducer from "./features/cart/cartSlice";

const rootReducer = combineReducers(cartReducer)

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>

export type AppDispatch = AppStore["dispatch"];