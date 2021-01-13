import React, {useState, useEffect} from 'react';
import {getVideogames} from './apiCore';
import Card from './Card';


const HomeAnt = () => {
  const [videogames, setVideogames] = useState([]);
  const [error, setError] = useState(false);

  const loadVideoGames = () => {
    getVideogames().then(data => {
      if (error) {
        setError(error)  //El error esta aqui
      } else {
        setVideogames(data);
        console.log(data);
      }
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    loadVideoGames();
  },[]) //con esto solo se ejecuta una vez

  return (
    <div>
      <p>Este es el componente HomeAnt</p>
      
      
      <div className="container">
      <div className="row">
        {videogames.map((videogame, i) => (
          <div key={i} className="col-lg-4 col-md-6 col-sm-6 col-sm-6">
            <Card videogame={videogame} />
          </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default HomeAnt;