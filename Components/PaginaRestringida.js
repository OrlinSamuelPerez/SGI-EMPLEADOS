import LockIcon from '@material-ui/icons/Lock';
export default function PaginaRestringida(){
    return(
        <div className="acceso-denegado">
            <div>
                 <LockIcon style={{color:'#3d485a9d', fontSize:"300px"}} />

            </div>
            <div>
                <h1>Lo siento no tienes acesso, a esta pagina</h1>
            </div>
        </div>
    )
} 