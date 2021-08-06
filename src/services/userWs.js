import { _axios } from './api';



export const login = (data)=>{

    return _axios.post("/user/login",data);
}

export const signup = (data)=>{
    
    return _axios.post("/user/signup",data);
}

export const verifyToken = () =>{
    return _axios.get("/user/verifyToken");
}

export const deleteAccount = (data) =>{
    return _axios.delete("/user/deleteAccount", {data});
}

export const changeUser = (data)=>{
    return _axios.patch("/user/update", data);
}

export const logout = () => {

    return _axios.post("/user/logout");
}