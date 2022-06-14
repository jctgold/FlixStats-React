import React from 'react';
import { useStateContext } from '../context/StateContext';

const GenCircle = ({item, index}) => {

    const { topType } = useStateContext();
    
    return (
        <img 
          src={topType === "tracks" ? item.album.images[0].url : item.images[0].url} 
          className={"item-image"}
        />
    )
}


export default GenCircle;