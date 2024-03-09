'use server'

import axios from "@/lib/axios";
import { CONNECT_SID } from "@/constants/cookie";
import { cookies } from "next/headers";
import { ProductInterface } from "@/app/types/product";

export const createProduct = async (data: Partial<ProductInterface>) => {
    try {
        const cookieStore = cookies()
        const connectSid = cookieStore.get(CONNECT_SID)

        const res = await axios.post(`create-product?store=${data.store}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `${CONNECT_SID}=${connectSid?.value}`
            },
        });

        if (res.status === 200) {
            return res.data;
        }

        return res

    } catch (error) {
        throw error;
    }
};
