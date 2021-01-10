import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import HeaderCM from './components/HeaderCM';
import PlaceToVisit from './components/PlaceToVisit';


//Codigo para Landing Page usando material CM

const useStyles = makeStyles((theme) => ({
root:{
  minHeight:"100vh",
  backgroundImage:`url(${process.env.PUBLIC_URL + '/assets/esportarena2.jpg'})`,
  backgroundRepeat: "no-repeat", 
  backgroundSize: 'cover',

},
}));

export default function Landing() {
    const classes = useStyles();
    return (
    <div className={classes.root}>
        <CssBaseline />
        <HeaderCM />
        <PlaceToVisit />
    </div>

    )
};

   
