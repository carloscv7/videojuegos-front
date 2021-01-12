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
                    <ul className="cards_items">
                        <CardItemCM 
                        src="assets/torneos.jpg"
                        text="Competitive Tournaments"
                        label='eSports'
                        path='/services'
                        />

                        <CardItemCM 
                        src="assets/gamestore.jpg"
                        text="GameStore"
                        label='eShop'
                        path='/services'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CardsCM
