'use server'

import axios from "@/lib/axios";
import { cookies } from 'next/headers'
import { CONNECT_SID } from "@/constants/cookie";

export const getProductsInStore = async (id: string) => {
    try {
        const cookieStore = cookies()
        const connectSid = cookieStore.get(CONNECT_SID)

        const res = await axios.get(`store-products?store=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `${CONNECT_SID}=${connectSid?.value}`
            }
        });

        if (res.status === 200) {
            return res.data.data;
        }

        return res

    } catch (error) {
        // Handle errors here
        console.error("Error fetching store:", error);
        throw error;
    }
};
