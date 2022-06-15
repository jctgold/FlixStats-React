import React, { useEffect, useRef } from 'react';
import Clock from 'react-live-clock'
import { motion } from 'framer-motion'
import { useStateContext } from '../context/StateContext';
import Modal from "react-modal";
import { toPng, toJpeg } from 'html-to-image';
//import html2canvas from "html2canvas";

import TopImage from './TopImage';

const customStyles = {
    content: {
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
      overlay: {
          zIndex: 100,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
      }
  };

const Footer = () => {

    useEffect(() => Modal.setAppElement('body'),[])
    const [isOpen, setIsOpen] = React.useState(false);
    const { items } = useStateContext();
    const printRef = useRef();

    const handleShare = () => {
        setIsOpen(true)
    }

    const handleDownloadImage = async () => {

        const imageDiv = document.querySelector(".generator-bg");

        // html2canvas(imageDiv).then(async (canvas) => {
        //     const date = new Date().getTime();
        //     const dataUrl = canvas.toDataURL();
        //     const blob = await (await fetch(dataUrl)).blob();
      
        //     const filesArray = [
        //       new File(
        //         [blob],
        //         `top-10${date}.png`, //name of the file
        //         {
        //           type: blob.type,
        //           lastModified: date, // date of the last change
        //         }
        //       ),
        //     ];
           
        //     const a = document.createElement("a");
        //     a.href = canvas
        //       .toDataURL("image/jpeg")
        //       .replace("image/jpeg", "image/octet-stream");
        //     a.download = `my_top_10_${date}.jpg`;
        //   });
        // };
      
        console.log(imageDiv)
    toPng(imageDiv, { useCORS: true })
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.download = 'top-10.png'
        link.href = dataUrl
        link.click()
      })
      .catch((err) => {
        console.log(err)
      }) 
    }   

    return (
        <>
            <motion.div 
                className='footer-container'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: {delay: 1, duration: 0.5 }}}
            >

                { items.length > 0 && <button type="button" className="btn primary-btn" onClick={handleShare}>Share</button>}
                <p>
                    <Clock  
                        format={"[(]MM/DD/YYYY h:mm:ss A[)]"}
                        style={{color: '#FFEB80'}}
                        ticking={true} />
                </p>
                <p>Created by Julia G</p>
            </motion.div>

            <Modal
                isOpen={isOpen}
                closeTimeoutMS={300}
                style={customStyles}
                contentLabel="Download image"
            >
                <div className='outer-generated-image-wrapper'>
                    <div className='int-generated-image-wrapper'>
                        <TopImage ref={printRef} className="generate-image" />
                    </div>
                </div>
                <div className='btns-wrapper'>
                    <button type="button" className="grey-btn" onClick={() => setIsOpen(false)}>Close</button>
                    <button type="button" className="primary-btn" onClick={handleDownloadImage}>Download</button>
                </div>
            </Modal>
        </>
    )
}

export default Footer