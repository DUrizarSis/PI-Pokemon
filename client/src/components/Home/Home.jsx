import style from './Home.module.css';
import NavBar from '../NavBar/NavBar.jsx';
import Filters from '../Filters/Filters.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, getTypes } from '../../redux/actions.js';
import { useEffect } from 'react';
import Cards from '../Cards/Cards.jsx';

function Home() {

    const allPokemons = useSelector(state => state.pokemons);
    const types = useSelector(state => state.types);

    const dispatch = useDispatch();

    useEffect(()=> {
        if(allPokemons.length < 1 || types.length < 1) {
            dispatch(getAll());
            dispatch(getTypes());
        }
    }, [])


    return (
        <div className={style.homeBg}>
            <NavBar/>

            <div className={style.container}>
                <div> <Filters/> </div>
                <div className={style.cardsPage}> <Cards/> </div>
            </div>
                
            
        </div>
    )
}

export default Home;