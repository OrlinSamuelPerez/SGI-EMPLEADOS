import {auth,db} from './conf'
import swal from 'sweetalert';
export function addBD(id,nombreBD,valores){

    auth.onAuthStateChanged(async user=>{
        if (user!=null){
            try{
                if (id === ""){
                   await db.collection('Usuario').doc(user.uid).collection(nombreBD).doc().set(valores)
                   swal("Buen Trabajo", "Se ha agregado correctamente", "success");
                }
                else{
                    await db.collection('Usuario').doc(user.uid).collection(nombreBD).doc(id).update(valores)
                    swal("Buen Trabajo", "Se ha actualizado correctamente", "success");   
                }
            }

            catch (error){
                console.log(error)
            }

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
            auth.onAuthStateChanged(async user=>{
                if (user!=null){
                    try{
                        await db.collection('Usuario').doc(user.uid).collection(nombreBD).doc(id).delete()
                        await db.collection('Usuario').doc(user.uid).collection(`Inactivo-${nombreBD}`).doc().set(valores)
                        swal("Buen Trabajo", "Se ha eliminado correctamente", "success");
                    }
                    catch (error){
                        console.log(error)
        
                    }
                }
            })
        }
      });

}        
     