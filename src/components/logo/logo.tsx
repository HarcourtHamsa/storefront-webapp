import Link from 'next/link'
import React from 'react'

function Logo() {
    return (
        <p className='font-medium'>
            <Link href={"/"}>
                Logo
            </Link>
        </p>
    )
}

export default Logo