import React, { Component } from 'react'
import spinner from '../pokemon/pokeball.gif'
import { Link } from 'react-router-dom'

export default class PokemonCard extends Component {
    state = {
      name: '',
      imageUrl: '',
      pokemonIndex: '',
      imageLoading: true,
      tooManyRequests: false,
    };

componentDidMount(){
    const { name, url } = this.props;
    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

    this.setState({name: name, imageUrl: imageUrl, pokemonIndex: pokemonIndex})
}

    render() {
          return (
            <div 
                className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-teal-600 hover:shadow-lg bg-red-600 max-w-sm rounded-lg overflow-hidden m-2 shadow-md"
                style={{ userSelect: "none" }} 
            >
                <Link to={`pokemon/${this.state.pokemonIndex}`}>
                <div className="bg-gray-500 rounded m-2">
                    <h5 className="bg-gray-300 rounded overflow-hidden">{ this.state.pokemonIndex }</h5>
                    { this.state.imageLoading ? (
                        <div className="flex flex-wrap justify-center">
                            <img src={ spinner } style={{ width: '5em', height: '5em' }} />
                        </div>    
                    ) : null }
                    <div className="flex flex-wrap justify-center">
                        <img onLoad={() => this.setState({ imageLoading: false })} onError={() => this.setState({ tooManyRequests: true })} className="" src={this.state.imageUrl} style={ this.state.tooManyRequests ? {display: "none"} : this.state.imageLoading ? null : {display: "block"}} />
                    </div>
                    { this.state.tooManyRequests ? (<h6 className=" bg-red-700 text-white text-center font-bold">
                        Too Many Requests
                    </h6>) : null}
                    <div className="font-bold text-xl mb-2 text-center">
                        { this.state.name
                            .toLowerCase()
                            .split(' ')
                            .map(
                                letter => letter.charAt(0).toUpperCase() + letter.substring(1)
                                )
                            .join(' ')
                        }
                    </div>
                </div>
                </Link>
            </div>
        )
    }
}
