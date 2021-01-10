import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LandingImageCard from './LandingImageCard';

import places from '../statics/places';
import useWindowPosition from '../hook/useWindowPosition';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
export default function () {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <div className={classes.root} id="place-to-visit">
      <LandingImageCard place={places[1]} checked={checked} />
      <LandingImageCard place={places[0]} checked={checked} />
    </div>
  );
}