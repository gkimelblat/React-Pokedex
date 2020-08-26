import React from 'react'

class Howdy extends React.Component{
    render(){
        return(
            <h1 className="p-3"> Howdy, {this.props.name}! </h1>
        )
    }
}

export default Howdy;