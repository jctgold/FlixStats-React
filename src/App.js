import React, { useEffect } from "react";
import { Toaster } from 'react-hot-toast';

import './App.css';
import Wrapper from './shared/Wrapper';
import BackgroundWrapper from "./shared/BackgroundWrapper";
import MainWrapper from "./shared/MainWrapper";
import { useStateContext } from "./context/StateContext";

function App() {

  const { token, getToken, items, getItems, topType } = useStateContext();

  useEffect(() => {
    if(!token) getToken();
    if(items.length < 1 && token) getItems(topType);
  },[token]);

  return (
    <Wrapper>
      <Toaster />
      <MainWrapper />
      { token && <BackgroundWrapper /> }
    </Wrapper>
  );
}

export default App;
