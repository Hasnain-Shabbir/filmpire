import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import {
  NavBar,
  Actors,
  Profile,
  Movies,
  MovieInformation,
} from './components';
import useStyles from './styles';
import useAlan from './Alan';

const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();
  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route path='/' element={<Movies />} />
          <Route path='/approved' element={<Movies />} />
          <Route path='/movie/:id' element={<MovieInformation />} />
          <Route path='actors/:id' element={<Actors />} />
          <Route path='profile/:id' element={<Profile />} />
        </Routes>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
};

export default App;
