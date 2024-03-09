'use client'

import React, { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ProductInterface } from '@/app/types/product'
import Button from '@/components/button/button'
import { toast } from 'react-toastify'
import ToastNotification from '@/components/toast-notification'
import { getProductByID } from '@/app/actions/product/get-product-in-store'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { addToItemCart } from '@/lib/features/cart/cartSlice'
import { RootState } from '@/lib/store'
import ImagePreview from '@/components/image-preview/image-preview'
import { IoAdd, IoChevronBack, IoRemove } from 'react-icons/io5'

function SingleProductPage({ params }: { params: { id: string } }) {
    const cart = useSelector((state: RootState) => (state.cart?.cart))

    const queryClient = useQueryClient()
    const router = useRouter()

    const [openModal, setOpenModal] = useState(false)
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState<string>('')

    const dispatch = useDispatch()

    const { isLoading: isFetchingProductData, data: product } = useQuery({
        queryKey: ['get-product-by-id', params.id],
        queryFn: () => {
            return getProductByID(params.id)
        },
    })


    const handleAddToCart = () => {
        dispatch(
            addToItemCart({
                quantity,
                name: (product as ProductInterface).name,
                price: (product as ProductInterface).price,
                id: params.id,
            }))

        toast.success('Added to cart')
    }


    if (isFetchingProductData) {
        return <p>Loading...</p>
    }



    return (
        <div className='relative pb-20'>
            <ToastNotification />
            <div className='h-[70px] border border-b flex items-center'>
                <div className='px-5 flex w-full justify-between items-center' onClick={() => router.back()}>
                    <div className='w-[35px] h-[35px] flex justify-center items-center rounded-xl'>
                        <IoChevronBack size={25} className='cursor-pointer text-gray-500' />
                    </div>
                    <p className='text-lg'></p>
                    <span></span>
                </div>
            </div>

            <main className='p-5 w-[90%] m-auto'>
                {/* products */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <ImagePreview />
                    <div className='flex flex-col gap-3'>
                        <h2 className='text-2xl mb-0'>{product?.name}</h2>
                        <p className='mb-8'>NGN {product?.price}</p>


                        <p className='mb-4'>{product?.description}</p>

                        <div className='flex gap-8 mt-8'>
                            <div className='flex gap-4 items-center'>
                                <IoAdd className='cursor-pointer'
                                    onClick={() => setQuantity(quantity + 1)}
                                />
                                <p>{quantity}</p>
                                <IoRemove
                                    className='cursor-pointer'
                                    onClick={() => setQuantity(quantity - 1)}
                                />
                            </div>

                            <Button 
                                isLoading={false}
                                label='Add to Cart'
                                onClick={handleAddToCart}
                            />

                          


                        </div>

                    </div>
                </div>

            </main>
        </div>
    )
}


export default SingleProductPage