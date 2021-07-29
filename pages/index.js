import Button from '@material-ui/core/Button';
import Link from 'next/link';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import CardResult from './Components/CardResult';
import Actividad from './Components/Actividad';
import {GraficaVentaSemanal} from './Components/Graficas';
import {authSecondary, db, dbSecondary} from '../BD/conf';
import {useState, useEffect} from 'react';
export default function Home() {
  var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  const fecha= new Date()
  var totalMes=[]
  var [mesTotal, setmesTotal]=useState([])
  const ano= fecha.getFullYear() + ''


  //ID de la empresa
  const [empresaID, setEmpresaId] = useState("oniscnak")


  useEffect(()=>{
    authSecondary.onAuthStateChanged(async user=>{
      if (user != null){
          await dbSecondary.collection("Usuario").doc(user.uid).get().then(async dato=>{
            if(dato.exists){
              
                meses.forEach(async mes=>{
                    await db.collection('Usuario').doc(dato.data().Empresa_ID).collection('VentasMes').doc(ano).collection(mes).onSnapshot(Snapshot=>{
                        let total=0
                        Snapshot.forEach(datoG=>{
                            datoG.data().productosCliente.forEach(d=>{
                                total+= d.totalUnitario
                            })
                        })
                        totalMes.push(total)
                    })

                })
                    
                setmesTotal(totalMes)
              
            }
          })
      }
    })
  },[])


  const [data, setData] = useState("")
  const handleActive =()=>{
    const active = document.getElementById('active-pedido');
    active.classList.toggle('active-pedido')
  }

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
 
  const diasMes=(mes,ano)=>{
    return new Date(ano, mes, 0).getDate()
  }
  var dias = diasMes(fecha.getMonth()+1,fecha.getFullYear())
  var venta = mesTotal[fecha.getMonth()]
 var resultado=venta/(7*100)
 var result = venta/(dias*100)
  return (
    <section>
      <article className="grid-index">
        <div>
          <p className="descripcion-general">Descripcion General</p>
          <h1 className="h1-descripcion-general">Buenos dias <span className="name-index">{data}</span></h1>
          <p className="descripcion-general-p">Esto es lo que está sucediendo con tu  negocio hoy</p>
        </div>
        <div className="button-estadistica">
          <Button variant="contained" style={{background:'#5664D2',fontWeight:'bold', borderRadius:'70px'}}>
            <Link href="/Estadisticas"><a>Ver estadisticas </a></Link>
          </Button>
        </div>
      </article>
     <div className="grid-promedios">
       <div>
        <CardResult value={parseFloat(resultado).toFixed(2)} titulo="Promedio Ventas Semanales" />
       </div>
       <div>
        <CardResult value={parseFloat(result).toFixed(2)} titulo="Promedio Ventas Diarias" />
       </div>
     </div>
     <Actividad/>

     <GraficaVentaSemanal/>
    </section>
  )
}
