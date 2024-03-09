import React, { ReactNode } from 'react'
import BottomAppBar from '../bottom-app-bar'


function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className='relative min-h-screen h-fit pb-16 md:pb-16'>
            <div className=''>
                {children}
            </div>
            {/* Bottom App Bar */}
            <div className='bg-white fixed bottom-0 left-0 right-0'>
                <BottomAppBar />
            </div>
        </div>
    )
}

export default DashboardLayout