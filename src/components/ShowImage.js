import React from 'react';
//import {API} from '../config';
import './ShowImage.css';

const ShowImage = ({item, url}) => (

        
            
                <div>
                    <img 
                    src={`http://localhost:3000/api/torneovideogame/photo/${item._id}`}
                    alt={item.name}
                    className="card-img-top"
                    style={{maxHeight: "200px", maxWidth:"300px"}}
                    />
                </div>
       


        
)

export default ShowImage; 