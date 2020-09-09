import React, { Component } from 'react'
import axios from 'axios'

const TYPE_COLORS = {
    bug: '#C3D21F',
    dark: '#8A6653',
    dragon: '#8A76FF',
    electric: '#FEE744',
    fairy: '#FBAEFF',
    fighting: '#A45544',
    fire: '#FA5543',
    flying: '#79A4FF',
    ghost: '#7874D4',
    grass: '#8DD851',
    ground: '#ECCE5B',
    ice: '#96F1FF',
    normal: '#BAB9AD',
    poison: '#A85CA0',
    psychic: '#F965B2',
    rock: '#CEBD72',
    steel: '#C2C0D8',
    water: '#56AEFF',
}

export default class Pokemon extends Component {
    state = {
        name: '',
        pokemonIndex: '',
        imageUrl: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            atk: '',
            def: '',
            spa: '',
            spd: '',
            spe: '',
        },
        height: '',
        weight: '',
        eggGroup: '',
        abilities: '',
        genderRatioM: '',
        genderRationF: '',
        evs: '',
        hatchSteps: '',

    }

    async componentDidMount(){
        const { pokemonIndex } = this.props.match.params;

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonRes = await axios.get(pokemonUrl);
        
        const name = pokemonRes.data.name;
        const imageUrl = pokemonRes.data.sprites.front_default;

        let {hp, atk, def, spa, spd, spe } = '';

        pokemonRes.data.stats.map(stat => {
            switch(stat.stat.name){
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    atk = stat['base_stat'];
                    break;
                case 'defense':
                    def = stat['base_stat'];
                    break;
                case 'special-attack':
                    spa = stat['base_stat'];
                    break;
                case 'special-defense':
                    spd = stat['base_stat'];
                    break;
                case 'speed':
                    spe = stat['base_stat'];
                    break;
            }
        });
        const height = pokemonRes.data.height;
        const weight = pokemonRes.data.weight;
        const types = pokemonRes.data.types.map(type => type.type.name);
        const abilities = pokemonRes.data.abilities.map(ability => {
            return ability.ability.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        });
        const evs = pokemonRes.data.stats.filter(stat => {
            if (stat.effect > 0) {
                return true;
            }
            return false;
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name}`.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
        }).join(', ');

        await axios.get(pokemonSpeciesUrl).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                };
            });

            const femaleRate = res.data['gender_rate'];
            const genderRationF = 12.5 * femaleRate;
            const genderRatioM = 12.5 * (8 - femaleRate);

            const catchRate = Math.round((100/255) * res.data['capture_rate']);

            const eggGroup = res.data['egg_groups'].map(group => {
                return group.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
            }).join(', ');

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

            this.setState({
                description,
                genderRationF,
                genderRatioM,
                catchRate,
                eggGroup,
                hatchSteps,
            })
        });

        this.setState({
            imageUrl,
            pokemonIndex,
            name,
            types,
            stats: {
                hp,
                atk,
                def,
                spa,
                spd,
                spe,
            },
            height,
            weight,
            abilities,
            evs,
        });
    };
    render() {
        return (
            <div>
                <div className="bg-gray-300 rounded-lg m-2 p-1">
                    <div className="float-right">
                    {this.state.types.map(type => 
                        <span key={type} className="text-white text-sm uppercase font-semibold tracking-wide rounded-lg px-1 object-right overflow-hidden mx-1" style={{backgroundColor: `${TYPE_COLORS[type]}`}}>
                            {type}
                        </span>)}
                    </div>

                    <h5 className="bg-gray-300 rounded overflow-hidden"> { this.state.pokemonIndex } </h5>
                    <div className="bg-white p-3">
                        <div className="text-center font-bold">
                        <h2>{this.state.name.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h2>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            <img src={this.state.imageUrl} />
                        </div>
                        <div className="text-center">
                            <h4>{this.state.description.toLowerCase().split('-').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}</h4>
                        </div>
                    </div>
                    
                    <div>HP</div>
                    <div className="relative p-3">
                        <div className="overflow-hidden h-5 mb-4 text-xs flex rounded bg-teal-200">
                            <div style={{width: `${this.state.stats.hp}%`}} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500" />
                            <p>{this.state.stats.hp}</p>
                        </div> 
                    </div>

                    <div>Attack</div>
                    <div className="relative p-3">
                        <div className="overflow-hidden h-5 mb-4 text-xs flex rounded bg-teal-200">
                            <div style={{width: `${this.state.stats.atk}%`}} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500" />
                            <p>{this.state.stats.atk}</p>
                        </div> 
                    </div>

                    <div>Defense</div>
                    <div className="relative p-3">
                        <div className="overflow-hidden h-5 mb-4 text-xs flex rounded bg-teal-200">
                            <div style={{width: `${this.state.stats.def}%`}} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500" />
                            <p>{this.state.stats.def}</p>
                        </div> 
                    </div>

                    <div>Special Attack</div>
                    <div className="relative p-3">
                        <div className="overflow-hidden h-5 mb-4 text-xs flex rounded bg-teal-200">
                            <div style={{width: `${this.state.stats.spa}%`}} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500" />
                            <p>{this.state.stats.spa}</p>
                        </div> 
                    </div>

                    <div>Special Defense</div>
                    <div className="relative p-3">
                        <div className="overflow-hidden h-5 mb-4 text-xs flex rounded bg-teal-200">
                            <div style={{width: `${this.state.stats.spd}%`}} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500" />
                            <p>{this.state.stats.spd}</p>
                        </div> 
                    </div>

                    <div>Speed</div>
                    <div className="relative p-3">
                        <div className="overflow-hidden h-5 mb-4 text-xs flex rounded bg-teal-200">
                            <div style={{width: `${this.state.stats.spe}%`}} class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500" />
                            <p>{this.state.stats.spe}</p>
                        </div> 
                    </div>


                </div>
            </div>
        )
    }
}
