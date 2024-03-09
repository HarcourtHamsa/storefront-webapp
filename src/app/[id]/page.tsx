'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { getStoreByID } from '../actions/store/get-store-by-id'
import { getProductsInStore } from '../actions/product/get-products-in-store'
import ProductCard from '@/components/product/product-card'
import { ProductInterface } from '../types/product'
import { GoVerified } from 'react-icons/go'
import { FaCartArrowDown } from 'react-icons/fa6'
import { HiShoppingBag } from 'react-icons/hi'
import { CgShoppingBag } from 'react-icons/cg'
import Card from '@/components/card/card'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { FaTimes } from 'react-icons/fa'
import { IoAdd, IoClose, IoRemove } from 'react-icons/io5'
import { CartInterface, CartItemInterface, clearCart, decrementItemQuantity, incrementItemQuantity } from '@/lib/features/cart/cartSlice'
import Button, { ButtonVariantEnum } from '@/components/button/button'
import { toast } from 'react-toastify'
import ToastNotification from '@/components/toast-notification'
import PaystackButton from '@/components/paystack-button/paystack'

function Store({ params }: { params: { id: string } }) {
    const [showCheckout, setShowCheckout] = useState(false)

    const cart: CartItemInterface[] = useSelector((state: RootState) => (state.cart?.cart))
    const queryClient = useQueryClient()
    const dispatch = useDispatch()


    const { isLoading: isFetchingStoreData, data: store } = useQuery({
        queryKey: ['get-store-by-id', params.id],
        queryFn: () => {
            return getStoreByID(params.id)
        }
    })

    const { isLoading: isFetchingProducts, data: products } = useQuery({
        queryKey: ['get-products', params.id],
        queryFn: () => {
            return getProductsInStore(params.id)
        }
    })

    const handleIncrementItem = (item: CartItemInterface) => {
        dispatch(incrementItemQuantity(item))
    }

    const handleClearCart = (item: CartItemInterface) => {
        dispatch(clearCart())

        toast.success("Cart cleared")
    }

    const handleDecrementItem = (item: CartItemInterface) => {
        if (item.quantity > 0) {
            dispatch(decrementItemQuantity(item))
        }
    }


    if (isFetchingStoreData && isFetchingProducts) return <p>Loading...</p>

    return (
        <div className='min-h-screen'>
            <ToastNotification />
            <main className='w-[100%] m-auto'>
                <div className='h-[80px] px-8 border-b flex items-center justify-between mb-4'>
                    {/* <span></span> */}
                    <div className='flex items-center gap-2 text-lg'>
                        <h1 className='font-semibold text-xl'>{store?.name} </h1>
                    </div>

                    <div className='relative cursor-pointer' onClick={() => setShowCheckout(true)}>
                        <CgShoppingBag size={35} />
                        <div className='w-[30px] absolute -top-2 -right-2 h-[30px] flex justify-center items-center text-white bg-red-500 rounded-full'>{cart.length}</div>
                    </div>
                </div>

                <div className='w-[80%] m-auto'>
                    <div className='mb-4'>
                        <input placeholder='Search products...' className='py-3 px-4 border outline-[#3A5E52] w-full rounded-none ' />
                    </div>

                    {/* products */}
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
                        {products?.map((product: ProductInterface) => {
                            return (
                                <Card product={product} key={product.id} />
                            )
                        })}
                    </div>
                </div>

                {
                    showCheckout && <div className="fixed bg-black/70 z-10 top-0 left-0 right-0 flex items-end bottom-0">

                        <div className="h-[95%] md:h-[100%] w-full md:w-[30%] ml-auto bg-white rounded-t-2xl md:rounded-none">
                            <div className="p-5 h-full flex flex-col justify-between">
                                <div className=''>
                                    <div className="flex justify-between items-center mb-8">
                                        <p className="text-xl">Checkout</p>
                                        <IoClose size={25} className='cursor-pointer' onClick={() => setShowCheckout(false)} />
                                    </div>

                                    <div>
                                        {cart.map((c) => {
                                            return (
                                                <div key={c.id} className='bg-gray-200 py-2 px-4 my-2 flex justify-between items-center'>
                                                    <div>
                                                        <p>{c.name}</p>
                                                        <p>NGN {c.quantity * c.price}</p>
                                                    </div>
                                                    <div className='flex gap-4 items-center'>
                                                        <IoAdd className='cursor-pointer'
                                                            onClick={() => handleIncrementItem(c)}
                                                        />
                                                        <p>{c.quantity}</p>
                                                        <IoRemove
                                                            className='cursor-pointer'
                                                            onClick={() => handleDecrementItem(c)}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className='mt-4'>
                                        <div className='flex justify-between items-center'>
                                            <p>Total </p>
                                            <p>
                                                NGN {" "}
                                                {cart.reduce(
                                                    (accumulator, currentValue) =>
                                                        accumulator + (currentValue.price * currentValue.quantity),
                                                    0
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-4'>
                                    <PaystackButton
                                        amount={
                                            cart.reduce(
                                                (accumulator, currentValue) =>
                                                    accumulator + (currentValue.price * currentValue.quantity),
                                                0
                                            ).toString()
                                        }
                                        email=''
                                        label='PAY NOW'

                                    />
                                    <Button isLoading={false} label={`Clear Cart`.toUpperCase()} onClick={handleClearCart} variant={ButtonVariantEnum.GHOST} />

                                </div>
                            </div>
                        </div>

                    </div>
                }

            </main>
        </div>
    )
}

export default Store