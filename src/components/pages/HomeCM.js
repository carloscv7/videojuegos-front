import React from 'react';
import '../../App.css';
import CardsCM from '../CardsCM';
import Footer from '../Footer';
import HeroSectionCM from '../HeroSectionCM';



function HomeCM() {

    return(
        <div>
            <HeroSectionCM />
            <CardsCM />
            <Footer />
        </div>
    )
}

export default HomeCM