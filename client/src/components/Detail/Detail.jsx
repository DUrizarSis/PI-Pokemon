import style from './Detail.module.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';

function Detail() {

    const [pokemon, setPokemon] = useState({})
    const { idPokemon } = useParams();

    useEffect(()=> {
        const pokemonData = async() => {
            try {
                const { data } = await axios(`http://localhost:3001/pokemons/${idPokemon}`);
                setPokemon(data);
            } catch (error) {
                console.log(error);
            }
        }
        pokemonData();
    }, [idPokemon]);

    const { id, name, image, hp, attack, defense, speed, height, weight, types, Types } = pokemon;
    const pokemonTypes = types || Types;


    return (
        <div className={style.detailBg}>
            <NavBar/>

            <div className={style.detailContainer}>
                <div>
                    <img src={image} alt="image-pokemon" className={style.imageDetail}/>
                </div>

                <div className={style.dataDetail}>
                    <div className={style.headParams}>
                        <h2 className={style.idDetail}><span className={style.labelHead}>id:</span> {id}</h2>
                        <h2 className={style.nameDetail}><span className={style.labelHead}>name:</span> {name}</h2>
                    </div>
                    <div className={style.bodyParams}>
                        <div className={style.paramsPoke}>
                            <h3 className={style.pokeParam}><span className={style.labelParam}>hp:</span> {hp}</h3>
                            <h3 className={style.pokeParam}><span className={style.labelParam}>attack:</span> {attack}</h3>
                            <h3 className={style.pokeParam}><span className={style.labelParam}>defense:</span> {defense}</h3>
                            <h3 className={style.pokeParam}><span className={style.labelParam}>speed:</span> {speed}</h3>
                            <h3 className={style.pokeParam}><span className={style.labelParam}>height:</span> {height}</h3>
                            <h3 className={style.pokeParam}><span className={style.labelParam}>weight:</span> {weight}</h3>
                        </div>
                        <div className={style.typesParams}>
                            {pokemonTypes && (
                                <ol className={style.listTypes}>
                                    {/* Verify that the array is not empty before mapping it */}
                                    {pokemonTypes.length > 0 ? (
                                    pokemonTypes.map((type, index) => (
                                        <li key={index}>{type.name}</li>
                                    ))
                                    ) : (
                                        <li>No hay tipos disponibles</li>
                                    )}
                                </ol>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Detail;