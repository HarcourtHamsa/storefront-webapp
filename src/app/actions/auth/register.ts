'use server'

import axios from "@/lib/axios";
import { RegisterDataInterface } from "../../types/auth";

export const handleRegister = async (data: RegisterDataInterface) => {
    try {
        const res = await axios.post('auth/register', data);

        if (res.status === 200){
            return res.data;
        }

        return res
    } catch (error) {
        // Handle errors here
        console.error("Error occurred during register:", error);
        throw error;
    }
};
