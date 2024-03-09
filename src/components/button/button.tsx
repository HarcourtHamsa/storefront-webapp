import React from 'react'
import Spinner from '../spinner/spinner'

export enum ButtonVariantEnum {
    GHOST = 'ghost',
    SOLID = 'solid'
}

interface ButtonInterface {
    label: string;
    isLoading: boolean;
    onClick: any;
    variant?: ButtonVariantEnum
}

function Button({ label, isLoading, onClick, variant = ButtonVariantEnum.SOLID }: ButtonInterface) {

    return (
        <button
            type="button"
            onClick={onClick}
            className={`
            w-full py-3 font-medium ${variant === ButtonVariantEnum.SOLID ? 'bg-[#0C4C3B]' : 'bg-[#0C4C3B]/50'} gap-4
             text-white rounded-none flex justify-center 
             items-center`}>
            {isLoading && <Spinner />}

            {label}
        </button>
    )
}

export default Button