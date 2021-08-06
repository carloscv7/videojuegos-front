import { _axios } from './api';

export const createVideogame = (data) =>{
    return _axios.post("/videogame/create", data);
}

export const getVideoGameList = (name, pagenumber) =>{
    return _axios.get("/videogame/search/" + encodeURIComponent(name) + "/" + (pagenumber).toString());
}

export const getUserVideoGameList = (name, pagenumber) =>{
    return _axios.get("/videogame/user/search/" + encodeURIComponent(name) + "/" + (pagenumber).toString());
}

export const getVideogame = (id) =>{
    return _axios.get("/videogame/" + id);
}

export const updateVideogame = (id, data) =>{
    return _axios.patch("/videogame/" + id, data);
}

export const deleteVideogame = (id) =>{
    return _axios.delete("/videogame/" + id);
}