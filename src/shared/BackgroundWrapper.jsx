import React, { useEffect } from 'react'
import { useStateContext } from '../context/StateContext';
import Circle from './Circle';

const BackgroundWrapper = () => {

  const { items } = useStateContext();

  return (
    <div className='background-wrapper'>
      { items?.map(
        (item, i) => (
          <Circle key={item.id} item={item} index={i}/>
        )
      )}
    </div>
  )
}

export default BackgroundWrapper