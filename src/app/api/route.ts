import axios from "@/lib/axios"
import { cookies } from "next/headers"

export async function GET(request: Request) {
    const cookieStore = cookies()
    const connectSid = cookieStore.get('connect.sid')

    const options = {
        headers: {
            'Set-Cookie': `connect.sid=${connectSid?.value}`,
            'Content-Type': 'application/json',
        }
    }

    const res = await axios.get('me', options)

    const data = res.data()

    console.log({ data })

    return Response.json({ data })


}