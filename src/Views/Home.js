import React from 'react';
import Howdy from '../Components/ZaWarudo';


function Home(){
    return(
        <div>
            <h1 className="font-bold text-2xl">Home</h1>

            <Howdy name="Gabriel" />
        </div>
    )
}

export default Home