import React, { Component } from 'react'

export default class PokemonCard extends Component {
    state = {
      name: '',
      imageUrl: '',
      pokemonIndex: '',
    };

componentDidMount(){
    const { name, url } = this.props;
    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

    this.setState({name: name, imageUrl: imageUrl, pokemonIndex: pokemonIndex})
}

    render() {
          return (
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-2">
                <div className="bg-gray-300 px-4 py-4 m-2">
                    <h5>{ this.state.pokemonIndex }</h5>
                    <div className="bg-white font-bold text-xl mb-2 text-center">{ this.state.name }</div>
                    <p>{ this.state.imageUrl }</p>
                </div>
            </div>
        )
    }
}
