import { LoginDataInterface } from "@/app/types/auth";
import axios from "@/lib/axios";


export const login = async (data: LoginDataInterface) => {
    const res = await axios.post('auth/login', data)

    if (res.headers && res.headers['set-cookie']) {
        res.headers['set-cookie'].forEach((cookie: string) => {
            console.log({ cookie })
        });
    }

    console.log(res)

    return res
}
