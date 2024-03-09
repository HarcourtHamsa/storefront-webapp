import { StoreInterface } from '@/app/types/store'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaPlus, FaStore } from 'react-icons/fa6'

function StoresSlider({ stores }: { stores: StoreInterface[] }) {
    const router = useRouter()

    const handleNavigateToStore = (id: string) => {
        router.push(`/store/${id}`)
    }
    
    return (
        <div className="my-4 flex-nowrap flex gap-3 w-[100%] overflow-auto pl-4">
            {
                stores?.length ?
                    stores.map((store: StoreInterface) => {
                        return (
                            <div key={store?.id} className="flex-col w-fit text-center " onClick={() => handleNavigateToStore(store.id!)}>
                                <div className="w-[80px] h-[80px] m-auto bg-[#3A5E52] rounded-3xl flex justify-center items-center">
                                    <FaStore size={40} className="text-white" />
                                </div>
                                <p className="text-sm mt-2 m-auto w-[100px] text-ellipsis line-clamp-1">{store.name}</p>
                            </div>
                        )
                    }) :
                    <div className="flex-col w-fit text-center cursor-pointer">
                        <div className="w-[80px] h-[80px] m-auto bg-stone-100 border-2 border-stone-200 border-dashed rounded-3xl flex justify-center items-center">
                            <FaPlus size={40} className="text-stone-300" />
                        </div>
                        <p className="text-sm mt-2 m-auto w-[100px] text-ellipsis line-clamp-1">Create Store</p>
                    </div>

            }

        </div>
    )
}

export default StoresSlider