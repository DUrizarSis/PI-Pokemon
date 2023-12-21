import style from './SearchBar.module.css';
import search from '../../assets/busqueda.svg'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { searchPokemons } from '../../redux/actions';

function SearchBar() {

    const [name, setName] = useState('');

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setName(e.target.value);
    }
    
    const searchPoke = async () => {
        // Si no introduce ningún nombre
        if(!name) return alert('Please write a valid Pokemon name');

        try {
            await dispatch(searchPokemons(name)); 
        } catch (error) {   
            setName('');
        }
       
        setName('');
    }

    return (
        <div className={style.searchBar}>
            <input className={style.inputSearch} placeholder='search pokemon' type="text" onChange={handleChange} value={name} />
            <button className={style.btn} onClick={searchPoke}><img className={style.btnIcon} src={search} alt="search-icon"/></button>
        </div>
    )
}

export default SearchBar;