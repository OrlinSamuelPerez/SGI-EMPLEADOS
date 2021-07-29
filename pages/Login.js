import DraftsIcon from '@material-ui/icons/Drafts';
import LockIcon from '@material-ui/icons/Lock';
import style from '../styles/Login.module.css';
import {authSecondary } from "../BD/conf";


export default function Login(){
   
    const datosInicio=(e)=>{
        e.preventDefault()
        const correoUsuario= document.getElementById('correoInicio').value;
        const claveUsuario= document.getElementById('claveInicio').value;
        authSecondary.signInWithEmailAndPassword(correoUsuario, claveUsuario)


    } 
    return(
        <main className={style.gridLogin}>
            <div>
                <div className={style.svgLogin}>
                    <div>
                        <img src="/login-1.svg"/>
                    </div>
                </div>
            </div>
           <div>
            <img className={style.userImg} src="/user.svg"/>
            <div  className={style.containerLogin}>
            <h1 className={style.title}>Inicio de Seccion Como Empleado</h1>
            <p className={style.subTitle} >Ingresa en tu cuenta</p>
            <form className={style.formLogin}>
                <div>
                    <label>
                        <DraftsIcon style={{color:'#3C01F1', fontSize:'30px'}} />
                        <input type="email" id="correoInicio" placeholder="Ingresa tu correo aqui"/>
                    </label>
                </div>
                <div>
                    <label>
                        <LockIcon style={{color:'#3C01F1'}} />
                        <input type="password" id="claveInicio" placeholder="Ingresa tu contraseña aqui"/>
                    </label>
                </div>
                <div>
                    <button onClick={datosInicio}>Iniciar Seccion</button>
                </div>
            </form>
        </div>
           </div>
 
        </main>
    )
}
