import React from 'react'
import Navigation from './Navigation'

function Header(){
    return(
        <header className="bg-red-600 border-b p-3 flex justify-between items-center shadow-md">
            <span className="text-white font-bold">
                Pokédex
            </span>
            
            <Navigation />
        </header>
    )
}

export default Header