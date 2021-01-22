import axios from "axios";

//valida si la aplicacion esta en produccion
const isProduction = process.env.NODE_ENV === "production";

// si la app esta ya en produccion colocara otra ruta de lo contrario usara localhost
const URL =  isProduction ? "https://wegam3rs.herokuapp.com/api" : "http://localhost:3000/";


//const URL = "https://project-back-foggy.herokuapp.com/api"
axios.defaults.withCredentials = true;

export const _axios = axios.create({
    baseURL: URL,
    timeout:10000
})