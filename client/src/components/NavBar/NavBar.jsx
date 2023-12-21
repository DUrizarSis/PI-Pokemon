import style from './NavBar.module.css';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar.jsx';
import addImg from '../../assets/agregar.svg';

function NavBar() {

    return (
        <div className={style.container}>
            <div>
                <SearchBar/>
            </div>
            <div>
                <Link to='/home'><button className={`${style.btnNav} ${style.btn1}`}>Home</button></Link>
                <Link to='/about'><button className={`${style.btnNav} ${style.btn2}`}>About</button></Link>
                <Link to='/create'><button className={`${style.btnNav} ${style.btn3}`}>Create <img className={style.btnImg} src={addImg}/></button></Link>
            </div>
        </div>
    )

}

export default NavBar;