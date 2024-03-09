import React, { useState } from 'react'
import { FaGear, FaGlobe, FaHouse, FaHouseChimney, FaShapes, FaUser } from 'react-icons/fa6'
import NavItem from '../nav-item'

function BottomAppBar() {
    const [activeIndex, setActiveIndex] = useState(0)

    const NAV_ITEMS = [
        {
            id: 0,
            icon: <FaHouse size={25} className='w-fit m-auto' />,
            label: "Home"
        },
        {
            id: 1,
            icon: <FaGlobe size={25} className='w-fit m-auto' />,
            label: "Explore"
        },
        {
            id: 2,
            icon: <FaGear size={25} className='w-fit m-auto' />,
            label: "Setting"
        },
    ]
    
    return (
        <div>
            <div className='border border-t'>
                <div className="px-4 py-2 flex justify-between text-center">
                    {NAV_ITEMS.map((ITEM, index) => {
                        return (
                            <div key={ITEM.id}>
                                <NavItem
                                    icon={ITEM.icon}
                                    label={ITEM.label}
                                    isActive={activeIndex === index}
                                    onClick={() => setActiveIndex(index)}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default BottomAppBar