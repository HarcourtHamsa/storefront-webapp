'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMe } from "../actions/me"
import DashboardLayout from "@/components/dashboard/layout"
import Link from "next/link"
import { FaBell, FaCross, FaPlus, FaReceipt, FaStore } from "react-icons/fa6"
import { getStores } from "../actions/store/get-stores"
import { StoreInterface } from "../types/store"
import { FormEvent, useState } from "react"
import { FaTimes } from "react-icons/fa"
import CustomInput from "@/components/input/input"
import Button, { ButtonVariantEnum } from "@/components/button/button"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { createStore } from "../actions/store/create-store"
import ToastNotification from "@/components/toast-notification"
import StoresSlider from "@/components/store/stores-slider"

const Dashboard = () => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')

    const router = useRouter()
    const queryClient = useQueryClient()

    const { isLoading: isFetchingMe, data: user } = useQuery({
        queryKey: ['get-me'],
        queryFn: () => {
            return getMe()
        }
    })

    const { isLoading: isFetchingStores, data: stores } = useQuery({
        queryKey: ['get-stores'],
        queryFn: () => {
            return getStores()
        }
    })

    const mutation = useMutation({
        mutationFn: (e: FormEvent) => {
            e.preventDefault();
            return createStore({
                category,
                name,
            })
        },
        onSuccess: async () => {
            toast.success('Store created')
            queryClient.invalidateQueries({ queryKey: ['get-stores'] })
            setOpenModal(false)
        },
        onError: async (error) => {
            toast.error('Cannot create store')
        }
    })

    if (isFetchingMe && isFetchingStores) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <DashboardLayout>
                <ToastNotification />

                <div className="p-5 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl">Hi, <span className="text-xl">{user.first_name}</span></h1>
                        <p className="text-sm">{user.email_address}</p>
                    </div>
                    <div className="relative">
                        <div className="w-[10px] h-[10px] rounded-full bg-red-600 absolute right-0.5"></div>
                        <FaBell size={30} className=""/>
                    </div>
                    {/* <p>Setup guide</p> */}
                </div>

                <div className="px-4">
                    <div className="w-full h-[150px] md:h-[300px] bg-[#DCF8C2] rounded-2xl flex items-center justify-center">

                        <div className="grid grid-cols-3" onClick={() => setOpenModal(!openModal)}>
                            <div className="flex-col w-fit text-center ">
                                <div className="w-[80px] h-[80px] m-auto bg-white rounded-3xl shadow-inner flex justify-center items-center">
                                    <FaStore size={40} className="text-[#0C4C3B]" />
                                </div>
                                <p className=" mt-2 m-auto w-[100px] text-ellipsis line-clamp-1">Store</p>
                            </div>
                            <div className="flex-col w-fit text-center ">
                                <div className="w-[80px] h-[80px] m-auto bg-white rounded-3xl flex justify-center items-center">
                                    <FaReceipt size={40} className="text-[#0C4C3B]" />
                                </div>
                                <p className=" mt-2 m-auto w-[100px] text-ellipsis line-clamp-1">Invoice</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-4 px-5">

                    <div className="flex flex-row justify-between">
                        <p className="text-lg">
                            Stores
                        </p>

                        <p>
                            <Link href={'/auth/login'} className="font-medium text-[#3A5E52]">View all</Link>
                        </p>
                    </div>
                </div>

                <div className=" w-[100%] overflow-auto">
                    <StoresSlider stores={stores as StoreInterface[]} />
                </div>


                {
                    openModal && <div className="fixed bg-black/70 z-10 top-0 left-0 right-0 flex items-end bottom-0">

                        <div className="h-[70%] w-full bg-white rounded-t-2xl">
                            <div className="p-5 h-full">
                                <div className="flex justify-between items-center">
                                    <p className="text-xl">Create Store</p>
                                    <FaTimes size={20} />
                                </div>

                                <div className="mt-8 h-full pb-12 flex flex-col justify-between">
                                    <div>
                                        <div className="form-input mb-4">
                                            <label>Store name</label>
                                            <CustomInput
                                                placeholder='Name'
                                                type='text'
                                                name='name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-input mb-4">
                                            <label>Category</label>
                                            <CustomInput
                                                placeholder='Category'
                                                type='text'
                                                name='category'
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <Button
                                            label="Create store"
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
            </DashboardLayout>
        </div>
    )
}

export default Dashboard

