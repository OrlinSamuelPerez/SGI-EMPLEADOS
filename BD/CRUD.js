import {authSecondary, dbSecondary,db} from './conf'
import swal from 'sweetalert';
export function addBD(id,nombreBD,valores){
            authSecondary.onAuthStateChanged(async user=>{
                if (user != null){
                    await dbSecondary.collection("Usuario").doc(user.uid).get().then(async dato=>{
                      if(dato.exists){
                        
                        try{
                            if (id === ""){
                               await db.collection('Usuario').doc(dato.data().Empresa_ID).collection(nombreBD).doc().set(valores)
                               swal("Buen Trabajo", "Se ha agregado correctamente", "success");
                            }
                            else{
                                await db.collection('Usuario').doc(dato.data().Empresa_ID).collection(nombreBD).doc(id).update(valores)
                                swal("Buen Trabajo", "Se ha actualizado correctamente", "success");   
                            }
                        }
            
                        catch (error){
                            console.log(error)
                        }
                      }
                    })
                }
              })
}
export function deleteBD(nombreBD,id,valores){
    swal({
        title: "Estas seguro que lo desea eliminar?",
        text: "Si eliminas este dato queedara borrado permanentemente",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            
            authSecondary.onAuthStateChanged(async user=>{
                if (user != null){
                    await dbSecondary.collection("Usuario").doc(user.uid).get().then(async dato=>{
                      if(dato.exists){
                        
                        try{
                            await db.collection('Usuario').doc(dato.data().Empresa_ID).collection(nombreBD).doc(id).delete()
                            await db.collection('Usuario').doc(dato.data().Empresa_ID).collection(`Inactivo-${nombreBD}`).doc().set(valores)
                            swal("Buen Trabajo", "Se ha eliminado correctamente", "success");
                        }
                        catch (error){
                            console.log(error)
            
                        } 
                      }
                    })
                }
              })
        }
      });

}  


export function addBDPedido(valores,ano,mes){

    authSecondary.onAuthStateChanged(async user=>{
        if (user != null){
            await dbSecondary.collection("Usuario").doc(user.uid).get().then(async dato=>{
              if(dato.exists){
                try{
                    await db.collection('Usuario').doc(dato.data().Empresa_ID).collection('VentasClientes').doc().set(valores)
                    await db.collection('Usuario').doc(dato.data().Empresa_ID).collection('VentasMes').doc(ano).collection(mes).doc().set(valores)
                   
                    valores.productosCliente.forEach(async doc=>{
                        
                        await db.collection('Usuario').doc(dato.data().Empresa_ID).collection('Producto').doc(doc.id).update({existenciaProducto:doc.unidades, salidaProducto:doc.salida})
                     })
                    swal("Buen Trabajo", "Se ha agregado correctamente", "success");
                 
                }
                
                catch (error){ 
                 console.log(error)
                }
              }
            })
        }
      })
}
