'use server'

import axios from "@/lib/axios";
import { cookies } from 'next/headers'
import { CONNECT_SID } from "@/constants/cookie";

export const getMe = async () => {
    try {
        const cookieStore = cookies()
        const connectSid = cookieStore.get(CONNECT_SID)

        const res = await axios.get('me', {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `${CONNECT_SID}=${connectSid?.value}`
            }
        });

        return res.data.data;
    } catch (error) {
        // Handle errors here
        console.error("Error occurred during login:", error);
        throw error;
    }
};
