//import { API } from '../config'


//Metodo para Obtener videogames
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

// export const read = (videogameId) => {
//     return fetch(`${API}/videogame/${videogameId}`, {
//       method: "GET"
//     }).then(response => {
//       return response.json();
//     })
//       .catch(err => console.log(err))
//   }
  

  //Metodo Para Login
  export const loginya = user => {
    return fetch(`http://localhost:3000/api/authCM/loginya`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user) // user: 
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      })
  };
  
  //Metodo Para Sign Up
  export const signup = user => {
    return fetch(`http://localhost:3000/api/authCM/signup`, { 
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      })
  };
  
  //Metodo para validar si esta Logeado
  export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(data));
      next();
    }
  }
  
  //Metodo para Sign out
  export const signout = (next) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      next();
      return fetch(`http://localhost:3000/api/authCM/signout`, {
        method: 'GET',
      })
        .then(response => {
            console.log('signout',response);
        })
        .catch( err => console.log(err));
    }
  }
  
 //Metodo para validar si esta autenticado y obtener el JWT
  export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'));
      // return localStorage.getItem('jwt')
    }
      return false;
  }
  
  //  add this to route later
  //Metodo para Crear categorias en Base de Datos
  export const createCategory = (userId, token, category) => {
    return fetch(`http://localhost:3000/api/category/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(category)
    })
      .then(response => {
        return response.json()
      })
      .catch(err => {
        console.log(err)
      })
  }
  
 //metodo para obtener categorias 
  export const getCategories = () => {
    return fetch(`http://localhost:3000/api/category/categories`, {
      method: 'GET'
    })
      .then(response => {
        return response.json()
      })
      .catch(err => {
        console.log(err)
      })
  }
  //${userId}

//Metodo para crear videogames
  export const createVideogame = (userId, token, videogame) => {
    return fetch(`http://localhost:3000/api/torneovideogame/torneocreate/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: videogame
    })
      .then(response => {
        return response.json()
      })
      .catch(err => {
        console.log(err)
      })
  }