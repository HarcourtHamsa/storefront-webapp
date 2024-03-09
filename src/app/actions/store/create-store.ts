'use server'

import axios from "@/lib/axios";
import { StoreInterface } from "@/app/types/store";
import { CONNECT_SID } from "@/constants/cookie";
import { cookies } from "next/headers";

export const createStore = async (data: Partial<StoreInterface>) => {
    try {
        const cookieStore = cookies()
        const connectSid = cookieStore.get(CONNECT_SID)

        const res = await axios.post('create-store', data, {
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
