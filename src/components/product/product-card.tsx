import { ProductInterface } from '@/app/types/product'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaImage, FaProductHunt, FaTags } from 'react-icons/fa6'

function ProductCard({ product }: { product: ProductInterface }) {
    const router = useRouter()

    const handleNavigateToProduct = () => {
        router.push(`/product/${product.id}`)
    }

    return (
        <div className='bg-white border mb-4 rounded-none overflow-hidden cursor-pointer' onClick={handleNavigateToProduct}>
            <div className='product__image min-h-[200px] bg-[#3A5E52] flex justify-start items-center'>
                <FaImage size={100} className='text-white w-full' />
            </div>
            <div className='px-4 py-2 flex flex-col justify-between'>
                <div>
                    <p className='text-lg'>{product.name}</p>
                    <p className=''>NGN {product.price.toLocaleString()}</p>
                </div>
                <div>
                    <p className='w-fit mt-4 rounded-2xl'><b>{product.quantity}</b> in store</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard