import React from "react";
import { useStateContext } from '../context/StateContext';

import Footer from './Footer';
import Heading from './Heading';
import Navigation from './Navigation';
import Login from './Login';

const MainWrapper = () => {

  const { token } = useStateContext();

  return (
    <div className='main-wrapper'>
      <Navigation />
      { token ? <Heading /> : <Login />}
      <Footer />
    </div>
  )
}

export default MainWrapper