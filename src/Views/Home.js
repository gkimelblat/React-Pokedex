import React from 'react';
import { Link } from "react-router-dom";

function Home(){
    return(
        <div className="lg:w-2/4 m-auto">
            <Link to="/dashboard">
                <img to="www.google.com" src="https://user-images.githubusercontent.com/41591007/92578101-1a630500-f294-11ea-9fd9-38ed3cc1c62a.png" />    
            </Link>
       </div>   
    )
}

export default Home