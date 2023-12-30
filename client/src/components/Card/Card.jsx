import style from './Card.module.css';
import { Link } from 'react-router-dom';


function Card({pokemon}) {

    const { id, name, image, hp, types, Types} = pokemon;
    const pokemonTypes = types || Types;

    return (
        <div className={style.container}>
            <img src={image} alt="img-pokemon" className={style.imageCard}/>
            <h3 className={style.nameCard}>{name}</h3>
            <h3 className={style.hpCard}>{hp}</h3>
            <ol className={style.typesCard}>
                {/* Verify that the array is not empty before mapping it */}
                {pokemonTypes.length > 0 && pokemonTypes.map((type, index) => (
                    <li key={index} className={`${style[type.name.toLowerCase()]}`}>{type.name}</li>
                ))}
                {/* If the array is empty, display a message */}
                {pokemonTypes.length === 0 && <li>No hay tipos disponibles</li>}
            </ol>
            <Link to={`/detail/${id}`}>
                <button className={style.btn}>Ver mas</button>
            </Link>
        </div>
    )
}

export default Card;