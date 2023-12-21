import style from './LandingPage.module.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAll, getTypes } from '../../redux/actions'
import tecs from '../../assets/tecs.webp'
import arrow from '../../assets/arrow.svg'


function LandingPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getAll());
    }, [])

    return (
        <div className={style.landingPageBg}>
            <p className={style.by}>by Diego Urizar</p>
            <h1>Welcome to</h1>
            <Link to='/home'>
                <button className={style.btn}>
                    <span>Pokemon Proyect</span>
                    <img className={style.arrow} src={arrow} alt="arrowIcon"/>
                </button>
            </Link>
            <img src={tecs} alt="tecs" />
        </div>
    )
}

export default LandingPage;