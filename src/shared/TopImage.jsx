import React from 'react';

import { useStateContext } from '../context/StateContext';

import GenCircle from './GenCircle';

const TopImage = ({ className }) => {

  const { items, topType } = useStateContext();

  return (
    <div className={`generator-bg ${className}`} >
      <div className='texts-wrapper'>
        <p className='gen-image-title'>Your<br />Top {topType === "tracks" ? "Tracks" : "Artists"}</p>
        <p className='gen-image-footer'>FLIXSTATS</p>
      </div>
      <div className='background-wrapper'>
        { items?.map(
          (item, i) => (
            <GenCircle key={item.id} item={item} index={i}/>
          )
          )}
      </div>
    </div>
  )
};

export default TopImage