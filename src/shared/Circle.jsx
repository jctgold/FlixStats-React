import React from 'react';
import { motion } from 'framer-motion'
import { useStateContext } from '../context/StateContext';

const Circle = ({item, index}) => {

    const { topType, headingInfo, blur, onImageHover, onImageHoverLeave } = useStateContext();

    let size, initialXPosition, initialYPosition;

    switch(index) {
        case 0: size = 530; initialXPosition = -100; initialYPosition = -100; break;
        case 1: size = 380; initialXPosition = 100; initialYPosition = -100; break;
        case 2: size = 310; initialXPosition = 100; initialYPosition = -100; break;
        case 3: size = 280; initialXPosition = 100; initialYPosition = 100; break;
        case 4: size = 270; initialXPosition = -100; initialYPosition = 100; break;
        case 5: size = 218; initialXPosition = 100; initialYPosition = -100; break;
        case 6: size = 196; initialXPosition = 100; initialYPosition = 100; break;
        case 7: size = 187; initialXPosition = -100; initialYPosition = 100;break;
        case 8: size = 145; initialXPosition = -100; initialYPosition = 100;break;
        default: size = 128; initialXPosition = -100; initialYPosition = 100;break;
      }

    const handleOnMouseEnter = () => {
        onImageHover(item, index);
    }

    const handleOnMouseLeave = () => {
        onImageHoverLeave(index);
    }


    return (
        <motion.img 
            src={topType === "tracks" ? item.album.images[0].url : item.images[0].url} 
            whileHover={{scale: 1.1}}
            onMouseOver = {handleOnMouseEnter}
            onMouseLeave = {handleOnMouseLeave}
            width={size} 
            height={size} 
            drag={true}
            dragConstraints={{ left: 50, right: 50, top: 50, bottom: 50}}
            initial={{ opacity: 0, x: initialXPosition, y: initialYPosition}}
            animate={ {opacity: 1, x: 0, y: 0, transition: { duration: 1 }}}
            className={"item-image " + ((index !== headingInfo.rank && blur) ? "blur": "top")}
        />
    )
}


export default Circle;