import {useState, useEffect} from 'react';
import {authSecondary, db, dbSecondary} from '../../BD/conf';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import Modal from '@material-ui/core/Modal'; 
import ModalCliente from '../Components/ModalCliente';
import Link from 'next/link';
import Actividad from '../Components/Actividad';
import PaginaRestringida from "../Components/PaginaRestringida";

export default function ListaVenta(){
    const [data, setData] = useState([])
    const [check, setCheck]= useState(false)
    useEffect(()=>{
        authSecondary.onAuthStateChanged(async user=>{
          if (user != null){
              await dbSecondary.collection("Usuario").doc(user.uid).get().then(async dato=>{
                if(dato.exists){
                    setCheck(dato.data().checkVentas)
                  await db.collection('Usuario').doc(dato.data().Empresa_ID).collection('VentasClientes').onSnapshot(documents=>{
                    const dato = [];
                    documents.forEach(doc => {
                       dato.push({...doc.data(),id:doc.id})
                    });
                    setData(dato);
               })
                }
              })
          }
        })
      },[])
    const [open, setOpen] = useState(false);
    const [id, setID] = useState("");
    const handleOpen = (id) => {
      setOpen(true);
      setID(id)
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    return(
        <main>
            {
                check == true?
                <>
                    <Actividad/>
                    <div className="grid-listaVenta">
                        <div><h1>Lista de ordenes</h1></div>
                        <div><Link href="/Pedido/Clientes"><a>Hacer nueva orden</a></Link></div>
                    </div>
                    <table className="table-listaVenta">
                        <tr>
                            <th>Nombre Cliente</th>
                            <th>Ver detalles</th>
                        </tr>
                        {data.map(doc =>
                            <tr onClick={()=>handleOpen(doc.id)}>
                                <td>{doc.nombreCliente}</td>
                                <td className="icon-listaventa"><TrendingFlatIcon/></td>
                            </tr>    
                        )}
                    </table>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <ModalCliente close={handleClose} id={id}/>
                    </Modal>
                </> 
                :<PaginaRestringida/>
            }
        </main>
    )
}