'use server'

import axios from "@/lib/axios";
import { CONNECT_SID } from "@/constants/cookie";
import { cookies } from "next/headers";
import { ProductInterface } from "@/app/types/product";

export const updateProduct = async (data: Partial<ProductInterface>) => {
    try {
        const cookieStore = cookies()
        const connectSid = cookieStore.get(CONNECT_SID)

        const res = await axios.patch(`update-product?id=${data.id}`, data, {
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
