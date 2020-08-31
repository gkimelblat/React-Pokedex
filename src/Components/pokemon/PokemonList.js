import React, { Component } from 'react'
import PokemonCard from './PokemonCard'
import axios from 'axios'

export default class PokemonList extends Component {
    state = {
        url: "https://pokeapi.co/api/v2/pokemon/",
        pokemon: null
    };

    async componentDidMount(){
        const res = await axios.get(this.state.url, {params: {limit: 60}});
        this.setState({ pokemon: res.data['results'] })
    }

    render() {
        return (
        <React.Fragment>
            { this.state.pokemon ? (
            <div>
                <div class="grid md:grid-cols-3 lg:grid-cols-4">
                { this.state.pokemon.map(pokemon => (
                 <PokemonCard
                  key = { pokemon.name }
                  name = { pokemon.name }
                  url = { pokemon.url }
                  />
                )) }
                </div>
            </div>
            ) : ( 
            <h1>Loading Pokémon..</h1>
            )}
        </React.Fragment>
        );
    }
}
