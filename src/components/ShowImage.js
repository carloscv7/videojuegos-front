import React from 'react';
//import {API} from '../config';
import './ShowImage.css';

const ShowImage = ({item, url}) => (

        <div className="product-img">
            <img 
            src={`http://localhost:3000/api/torneovideogame/photo/${item._id}`}
            alt={item.name}
            className="mb-3 img-cont"
            style={{maxHeight: "600px", maxWidth:"300px"}}
            />
        </div>
    
)

export default ShowImage; 