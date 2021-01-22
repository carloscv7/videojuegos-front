import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import RegisterT from './pages/RegisterT';
import ShowImage from './ShowImage';


const Card = ({videogame}) => {
  const [count, setCount] = useState(videogame.count)

  return (
    
    <div>

        <div>
          <div className="row">
            <div className="col-4-lg">
                <div className="card">
                    <ShowImage item={videogame} url="videogame"/>
                    <div class="card-body">
                      <p className="card-title">{videogame.name}</p>
                      <p className="card-text">${videogame.price}</p>
                      <p className="card-text">{videogame.description}</p>   
                      <a href="/register" className="btn btn-primary">Register</a>
                    </div>
                    
                    
                    
                  </div>

              
            </div>

          </div>

        </div>
        
  
        
    </div>
   

      

    
    
  )
}

export default Card;
