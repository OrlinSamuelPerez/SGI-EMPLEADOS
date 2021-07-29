import {authSecondary} from '../BD/conf';

export default function CorreoVerificado(){

    const verificar =(e)=>{
        e.preventDefault()
        const usuario = authSecondary.currentUser
        usuario.sendEmailVerification()
    }    
    return(
        <button onClick={verificar}>Confirmar Aqui</button>
    )
} 