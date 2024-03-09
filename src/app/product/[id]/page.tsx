'use client'

import React, { useState } from 'react'
import { getStoreByID } from '@/app/actions/store/get-store-by-id'
import { StoreInterface } from '@/app/types/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FaArrowLeft, FaExclamation, FaImage, FaPlus } from 'react-icons/fa6'
import { getStores } from '@/app/actions/store/get-stores'
import { getProductsInStore } from '@/app/actions/product/get-products-in-store'
import { ProductInterface } from '@/app/types/product'
import ProductCard from '@/components/product/product-card'
import Button, { ButtonVariantEnum } from '@/components/button/button'
import { FaTimes } from 'react-icons/fa'
import CustomInput from '@/components/input/input'
import { createProduct } from '@/app/actions/product/create-product'
import { toast } from 'react-toastify'
import ToastNotification from '@/components/toast-notification'
import { getProductByID } from '@/app/actions/product/get-product-in-store'
import { useRouter } from 'next/navigation'
import { updateProduct } from '@/app/actions/product/update-product'
import Spinner from '@/components/spinner/spinner'
import { IoChevronBack } from 'react-icons/io5'
import ImagePreview from '@/components/image-preview/image-preview'

function SingleProductPage({ params }: { params: { id: string } }) {
    const queryClient = useQueryClient()
    const router = useRouter()

    const [openModal, setOpenModal] = useState(false)
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState<string>('')

    const { isLoading: isFetchingProductData, data: product } = useQuery({
        queryKey: ['get-product-by-id', params.id],
        queryFn: () => {
            return getProductByID(params.id)
        },
    })

    const { mutate: handleUpdateProduct, isPending } = useMutation({
        mutationKey: ['update-product'],
        mutationFn: () => {
            return updateProduct({
                name: name === '' ? (product as ProductInterface).name : name,
                quantity: quantity === 0 ? (product as ProductInterface).quantity : quantity,
                price: price === 0 ? (product as ProductInterface).price : price,
                description: description === '' ? (product as ProductInterface).description : description,
                id: params.id,
            })
        },
        onSuccess: async () => {
            setName('')
            setQuantity(0)
            setPrice(0)
            setDescription('')

            queryClient.invalidateQueries({ queryKey: ['get-products', params.id] })
            queryClient.invalidateQueries({ queryKey: ['get-product-by-id', params.id] })

            toast.success('Product updated')
        },
        onError: async (error) => {
            toast.error('Cannot update product')
        }
    })


    if (isFetchingProductData) {
        return <p>Loading...</p>
    }



    return (
        <div className='relative pb-20'>
            <ToastNotification />
            <div className='h-[60px] border border-b flex items-center'>
                <div className='px-5 flex w-full justify-between items-center' onClick={() => router.back()}>
                    <div className='w-[35px] h-[35px]  flex justify-center items-center rounded-xl'>
                        <IoChevronBack size={25} className='cursor-pointer text-gray-500' />
                    </div>
                    <p className='text-lg'>Edit Product</p>
                    <span></span>
                </div>
            </div>

            <main className='p-5'>
                {/* products */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <ImagePreview />
                    <div className='flex flex-col gap-3'>
                        <label className=''>Product name</label>
                        <CustomInput
                            name='name'
                            onChange={(e) => setName(e.target.value)}
                            type='text'
                            value={name === '' ? (product as ProductInterface).name : name}
                            placeholder=''
                        />

                        <div className='flex gap-4 items-center'>
                            <div>
                                <label className=''>Quantity</label>
                                <CustomInput

                                    name='quantity'
                                    onChange={(e) => setQuantity(e.target.value)}
                                    type='number'
                                    value={quantity === 0 ? (product as ProductInterface).quantity : quantity}
                                    placeholder=''
                                />
                            </div>


                            <div>
                                <label>Price</label>
                                <CustomInput
                                    name='price'
                                    onChange={(e) => setPrice(e.target.value)}
                                    type='number'
                                    value={price === 0 ? (product as ProductInterface).price : price}
                                    placeholder=''
                                />
                            </div>
                        </div>

                        <div>
                            <label>Description</label>
                            <textarea
                                placeholder='Description'
                                name='description'
                                value={description === '' ? (product as ProductInterface).description : description}
                                cols={30}
                                className='min-h-[150px] border  outline-[#0C4C3B] rounded-none block px-4 py-2 w-full'
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                    </div>
                </div>

            </main>



            <div className='gap-4 flex w-full h-[100px] px-4 fixed bottom-0 left-0 right-0 items-center bg-white'>
                <Button
                    onClick={() => setOpenModal(true)}
                    label='DELETE'
                    isLoading={false}
                    variant={ButtonVariantEnum.GHOST}
                />
                <Button
                    onClick={() => handleUpdateProduct()}
                    label=' SAVE CHANGES'
                    isLoading={isPending}
                />
            </div>

            {
                openModal && <div className="fixed bg-black/70 z-10 top-0 left-0 right-0 flex items-center bottom-0">

                    <div className="h-[50%] w-[90%] md:w-[40%] mx-auto bg-white rounded-2xl md:rounded-none">
                        <div className="p-5 h-full">
                            <div className="flex justify-between items-center">
                                <p className="text-xl"></p>
                                <FaTimes size={20} />
                            </div>

                            <div className="mt-8 h-full pb-12 flex flex-col justify-between">
                                <div>
                                    <FaExclamation size={30} className=' w-fit mx-auto mb-4' />
                                    <h1 className='text-center'>Are you sure you want to delete this product?</h1>
                                </div>

                                <div className='flex gap-4'>

                                    <Button
                                        label='Cancel'
                                        onClick={() => setOpenModal(false)}
                                        isLoading={false}
                                        variant={ButtonVariantEnum.GHOST}
                                    />

                                    <Button
                                        label='Yes, Delete'
                                        onClick={() => setOpenModal(false)}
                                        isLoading={isPending}
                                    />
                                   
                                  

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}


export default SingleProductPage