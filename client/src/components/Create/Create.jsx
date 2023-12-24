import Form from '../Form/Form';
import NavBar from '../NavBar/NavBar';
import style from './Create.module.css'

function Create() {

    return (
        <div className={style.createBg}>
            <NavBar/>
            <Form/>
        </div>
    )
}

export default Create;