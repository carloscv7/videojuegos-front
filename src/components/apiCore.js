//import { API } from '../config'

export const getVideogames = () => {
    return fetch(
        `http://localhost:3000/api/torneovideogame/torneovideogames`,
        {
            method: 'GET'
        }
    )
        .then(response => { 
            console.log(response)
            return response.json()
        })
        .catch(err => console.log('este es el error',err))
}