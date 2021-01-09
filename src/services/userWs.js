import { _axios } from './api';



export const login = (data)=>{

    return _axios.post("/user/login",data);
}

export const signup = (data)=>{
    
    return _axios.post("/user/signup",data);
}

export const logout = () => {

    return _axios.post("/user/logout");
}