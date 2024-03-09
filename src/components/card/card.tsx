import { ProductInterface } from '@/app/types/product'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaImage, FaProductHunt, FaTags } from 'react-icons/fa6'

function Card({ product }: { product: ProductInterface }) {
    const router = useRouter()

    const handleNavigateToProduct = () => {
        router.push(`/product/v/${product.id}`)
    }

    return (
        <div className='bg-white border mb-4 rounded-none overflow-hidden cursor-pointer' onClick={handleNavigateToProduct}>
            <div className='product__image min-h-[200px] bg-[#3A5E52] relative flex justify-start items-center'>
                <FaImage size={100} className='text-white w-full' />

                {product.quantity < 1 &&
                    <div className='absolute top-0 left-0 right-0 flex justify-center items-center bottom-0 bg-black/50'>
                        <p className='text-white font-semibold'>Out of stock</p>
                    </div>
                }
            </div>
            <div className='px-4 py-2 flex justify-between items-center'>
                <div>
                    <p className='text-lg font-semibold'>{product.name}</p>
                    <p className=''>NGN {product.price.toLocaleString()}</p>
                </div>

            </div>
        </div>
    )
}

export default Card