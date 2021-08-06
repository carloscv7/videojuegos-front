export const catchError = (e, fLogout)=>{
    if(e.response){
        if(e.response.data.msg == "Unauthenticated"){
            fLogout();
        }
    }else{
        console.log("Hubo un error ", e)
    }
}