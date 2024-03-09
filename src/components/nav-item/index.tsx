import React from 'react'

function NavItem({
    icon,
    label,
    isActive,
    onClick
}: {
    icon: React.ReactNode,
    label: string,
    isActive: boolean,
    onClick: () => void
}) {
    return (
        <div className={`${isActive ? 'text-[#3A5E52]' : 'text-stone-600'} `} onClick={onClick}>
            {icon}
            <p className={`${isActive && 'font-bold'} text-sm`}>{label}</p>
        </div>
    )
}

export default NavItem