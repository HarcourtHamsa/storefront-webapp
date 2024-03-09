'use client'

import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa6";


type InputType = 'email' | 'password' | 'text' | 'number'

interface InputProps {
    placeholder: string;
    name: string;
    value: string | number;
    type: InputType;
    onChange: (e: any) => void
}

function CustomInput({
    placeholder,
    type,
    name,
    value,
    onChange }: InputProps) {
    const [isVisible, setIsVisible] = useState(false);

    function dislayIcon() {
        if (type === 'password') {
            if (isVisible) {
                return <FaEye />
            } else {
                return <FaEyeSlash />
            }
        }
    }

    function toggle() {
        setIsVisible(!isVisible)
    }
    return (
        <div className='relative'>
            <input
                placeholder={placeholder}
                type={isVisible ? "text" : type}
                name={name}
                value={value}
                onChange={onChange}
                className='w-full bg-white px-4 py-3 border rounded-none outline-[#0C4C3B] border-gray-200'
            />

            {type === "password" &&
                <div className='absolute top-[20%] right-[2%] cursor-pointer' onClick={toggle}>
                    <div className='bg-gray-100 w-[30px] h-[30px] flex items-center justify-center rounded'>
                        {dislayIcon()}
                    </div>

                </div>
            }

        </div>
    )
}

export default CustomInput