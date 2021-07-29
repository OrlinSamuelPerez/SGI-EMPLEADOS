import Avatar from '@material-ui/core/Avatar';
import {useState, useEffect} from 'react';
import {authSecondary, db, dbSecondary} from '../../BD/conf';

export default function Cuenta(){
    const [data, setData] = useState("")
    useEffect(()=>{
      authSecondary.onAuthStateChanged(async user=>{
        if (user != null){
            await dbSecondary.collection("Usuario").doc(user.uid).get().then(async dato=>{
              if(dato.exists){
                await db.collection('Usuario').doc(dato.data().Empresa_ID).collection('BD_Usuario').doc('datos_Usuario').get().then(doc =>{
                  setData(doc.data().nombreEmpresa)
                })
              }
            })
        }
      })
    },[])
    return(
        <div>
            <Avatar>{data.substring(0,1)}</Avatar>
            <span>{data}</span>
        </div>
    )
}