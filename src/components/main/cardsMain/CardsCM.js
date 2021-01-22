import React from 'react';
import {Link} from 'react-router-dom';
import CardItemCM from './CardItemCM';
import './CardsCM.css'

function CardsCM() {
    return (
        <div className="cards">
            <h1>Check out these EPIC Oportunities!</h1>
            <div className="cards_container">
                <div className="cards__wrapper">
                <ul className='cards__items'>
                        <CardItemCM
                        src='assets/torneos.jpg'
                        text='Explore the availible tournaments to play with friends or alone!!!'
                        label='Tournaments'
                        path='/tournaments'
                        />
                        <CardItemCM
                        src='assets/eshop.png'
                        text='Buy amazing products and accesories to play like a real PRO player'
                        label='eShop'
                        path='/products'
                        />
                        
                    </ul>
                    
                </div>
            </div>
        </div>
    )
}

export default CardsCM
