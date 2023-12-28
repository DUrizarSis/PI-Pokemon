import style from './About.module.css';
import NavBar from '../NavBar/NavBar';
import linkedin from '../../assets/linkedin.svg'
import profile from '../../assets/pf4.png'

function About() {
    return (
        <div className={style.aboutBg}>
            <NavBar/>

            <div className={style.containerAbout}>
                <div>
                    <img src={profile} alt="profile-img" className={style.profile} />
                </div>
                <div className={style.textAbout}>
                    <h3 className={style.nameAbout}>I'm Diego Urizar</h3>
                    <p className={style.textBody}>Discover the result of my exciting programming journey intertwined with a love for Pokémon. Originating from a programming bootcamp, this project signifies more than a task; it embodies extensive learning, persistent problem-solving, and an unyielding commitment to refining my developer skills. Every code line mirrors the Pokémon world's essence while navigating programming intricacies.</p>
                    <p className={style.textBody}>Explore this space where creativity and learning unite to celebrate both the captivating Pokémon universe and my evolving path in software development.</p>
                    <button className={style.btn} onClick={() => window.open("https://www.linkedin.com/in/diego-urizar-a6237a25b/", '_blank')}> <img className={style.icon} src={linkedin} alt="linkedin-logo"/>Contact me!</button>
                </div>
            </div>
        </div>
    )
}

export default About;