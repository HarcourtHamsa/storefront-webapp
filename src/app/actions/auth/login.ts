'use server'

import axios from "@/lib/axios";
import { cookies } from 'next/headers'
import { LoginDataInterface } from "../../types/auth";
import { parseCookieString } from "@/utils/action";
import { CONNECT_SID } from "@/constants/cookie";

export const handleLogin = async (data: LoginDataInterface) => {
    try {
        const res = await axios.post('auth/login', data);

        if (res.status === 200) {
            if (res.headers && res.headers['set-cookie']) {
                res.headers['set-cookie'].forEach((cookie: string) => {
                    const parsedCookie = parseCookieString(cookie);
                    cookies().set({
                        path: parsedCookie["Path"]!,
                        name: CONNECT_SID,
                        expires: new Date(parsedCookie["Expires"]),
                        value: parsedCookie["connect.sid"],
                        sameSite: 'strict',
                        httpOnly: true,
                    })
                });
            }

            return res.data;
        }

        return res

    } catch (error) {
        throw error;
    }
};
