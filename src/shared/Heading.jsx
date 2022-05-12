import React from 'react';
import { useStateContext } from '../context/StateContext';
import { motion } from 'framer-motion';
import TextTransition, { presets } from 'react-text-transition';


const Heading = () => {

    const { topType, headingInfo } = useStateContext();

    const title = headingInfo.title;
    const subtitle = headingInfo.subtitle;
    const rank = headingInfo.rank;
    const type = topType.slice(0,-1);


    return (
        <motion.div 
            className='heading-container'
            initial={{ opacity: 0, y:20}}
            animate={{ opacity: 1, y: 0, transition: {delay: 1, duration: 0.5 }}}
        >
            { title  && 
                <>
                    <h3>
                        <TextTransition
                            text={"#" + (rank + 1) + " Top " + type}
                            springConfig={ presets.gentle  }
                        />  
                    </h3>
                    <h1>
                        <TextTransition
                            text={title}
                            springConfig={ [presets.gentle,{clamp:true}]}
                            noOverflow={true}
                        />  
                    </h1>

                    { subtitle && <h2>
                        <TextTransition
                            text={subtitle}
                            springConfig={ presets.gentle  }
                        />  
                    </h2>}
                </>
            }
            
            {/**
             * 
             * <h3>#{headingInfo.rank + 1} Top {topType.slice(0,-1)}</h3>
            <h1>{headingInfo.title}</h1>
            { headingInfo.subtitle && <h2>{headingInfo.subtitle}</h2>}
             */
            }
        </motion.div>
    )
}

export default Heading