import React from 'react'
import { FaImage } from 'react-icons/fa6'

function ImagePreview() {
    return (
        <div>
            <div className='min-h-[300px] md:min-h-[350px] rounded-none bg-gray-200 flex justify-center items-center'>
                <FaImage size={100} className='text-gray-400' />
            </div>
        </div>
    )
}

export default ImagePreview