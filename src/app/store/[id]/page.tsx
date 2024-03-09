'use client'

import React, { useState } from 'react'
import { getStoreByID } from '@/app/actions/store/get-store-by-id'
import { StoreInterface } from '@/app/types/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FaArrowLeft, FaEllipsisVertical, FaPlus } from 'react-icons/fa6'
import { getStores } from '@/app/actions/store/get-stores'
import { getProductsInStore } from '@/app/actions/product/get-products-in-store'
import { ProductInterface } from '@/app/types/product'
import ProductCard from '@/components/product/product-card'
import Button, { ButtonVariantEnum } from '@/components/button/button'
import { FaExternalLinkAlt, FaGripHorizontal, FaTimes } from 'react-icons/fa'
import CustomInput from '@/components/input/input'
import { createProduct } from '@/app/actions/product/create-product'
import { toast } from 'react-toastify'
import ToastNotification from '@/components/toast-notification'
import { useRouter } from 'next/navigation'
import { baseUrl } from '@/utils/url'
import { IoChevronBack } from 'react-icons/io5'

function StoreLandingPage({ params }: { params: { id: string } }) {
    const [openModal, setOpenModal] = useState(false)
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [showDropdown, setShowDropdown] = useState(false)

    const queryClient = useQueryClient()
    const router = useRouter()


    const { isLoading: isFetchingStoreData, data: store } = useQuery({
        queryKey: ['get-store-by-id', params.id],
        queryFn: () => {
            return getStoreByID(params.id)
        }
    })

    const handleCopyToClipboard = async () => {
        try {
            const env = process.env.NODE_ENV || "development"

            const storeUrl = `${baseUrl[env]}/${params.id}`
            await navigator.clipboard.writeText(storeUrl)
            // setShowDropdown(false)
            toast.success("Copied to clipboard")
        } catch (error) {
            throw error
        }
    }

    const { isLoading: isFetchingProducts, data: products } = useQuery({
        queryKey: ['get-products', params.id],
        queryFn: () => {
            return getProductsInStore(params.id)
        }
    })


    const mutation = useMutation({
        mutationKey: ['create-product'],
        mutationFn: () => {
            return createProduct({
                name,
                quantity,
                price,
                description,
                store: params.id
            })
        },
        onSuccess: async () => {
            setOpenModal(false)
            setName('')
            setQuantity(0)
            setPrice(0)
            setDescription('')

            queryClient.invalidateQueries({ queryKey: ['get-products', params.id] })
            toast.success('Product created successfully')
        },
        onError: async (error) => {
            toast.error('Cannot create product')
        }
    })


    if (isFetchingStoreData && isFetchingProducts) return <p>Loading...</p>


    return (
        <div className='relative'>
            <ToastNotification />
            <div className='h-[60px] border border-b flex items-center'>
                <div className='px-5 flex w-full justify-between items-center' >
                    <div onClick={() => router.back()} className='w-[35px] h-[35px]  flex justify-center items-center rounded-xl'>
                        <IoChevronBack size={25} className='cursor-pointer text-gray-500' />
                    </div>
                    <p className='text-lg'>{(store as StoreInterface).name}</p>
                    <div onClick={() => setShowDropdown(!showDropdown)} className='cursor-pointer'>
                        <FaEllipsisVertical />
                    </div>
                </div>
            </div>

            {showDropdown &&
                <div className='w-[50%] md:w-[300px] py-4 absolute right-0 top-14 bg-white border shadow-lg cursor-pointer rounded-lg'>
                    <ul className='divide-y-2'>
                        <li className='px-4 py-2 flex items-center gap-2' onClick={() => {}}>Visit store <FaExternalLinkAlt /> </li>
                        <li className='px-4 py-2' onClick={handleCopyToClipboard}>Copy store link</li>
                    </ul>
                </div>
            }

            <main className='p-5'>

                {/* products */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
                    {products?.map((product: ProductInterface) => {
                        return (
                            <ProductCard product={product} key={product.id} />
                        )
                    })}
                </div>

            </main>

            <div
                className='cursor-pointer shadow-2xl h-[60px] w-[60px] fixed flex items-center justify-center rounded-full right-4 bottom-14 bg-gray-200 backdrop-blur-xl'
                onClick={() => setOpenModal(true)}
            >
                <FaPlus size={25} className='text-gray-400' />
            </div>

            {
                openModal && <div className="fixed bg-black/70 z-10 top-0 left-0 right-0 flex items-end bottom-0">

                    <div className="h-[90%] w-full bg-white rounded-t-2xl">
                        <div className="p-5 h-full">
                            <div className="flex justify-between items-center">
                                <p className="text-xl">Create Product</p>
                                <FaTimes size={20} />
                            </div>

                            <div className="mt-8 h-full pb-12 flex flex-col justify-between">
                                <div>
                                    <div className="form-input mb-4">
                                        <label>Product name</label>
                                        <CustomInput
                                            placeholder='Name'
                                            type='text'
                                            name='name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className='flex gap-4'>
                                        <div className="form-input mb-4">
                                            <label>Quantity</label>
                                            <CustomInput
                                                placeholder='Quantity'
                                                type='number'
                                                name='quantity'
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-input mb-4">
                                            <label>Price</label>
                                            <CustomInput
                                                placeholder='Price'
                                                type='number'
                                                name='price'
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-input mb-4">
                                        <label>Description</label>
                                        <textarea
                                            placeholder='Description'
                                            name='description'
                                            value={description}
                                            cols={30}
                                            className='min-h-[100px] border  outline-[#0C4C3B] rounded-xl block px-4 py-2 w-full'
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Button
                                        label="Create Product"
                                        isLoading={mutation.isPending}
                                        onClick={mutation.mutate}
                                    />

                                    <Button
                                        label="Close"
                                        isLoading={false}
                                        onClick={() => setOpenModal(false)}
                                        variant={ButtonVariantEnum.GHOST}
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


export default StoreLandingPage