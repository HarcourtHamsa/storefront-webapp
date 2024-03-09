'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import React, { ReactNode, useState } from "react"


export const ReactQueryConfig = ({ children }: { children: ReactNode }) => {
const [queryClient, ] = useState(new QueryClient())
    

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    )
}
