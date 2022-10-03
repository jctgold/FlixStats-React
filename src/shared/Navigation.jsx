import React from 'react';
import { motion } from 'framer-motion';

import { useStateContext } from '../context/StateContext';
import { toast } from 'react-hot-toast';

const Navigation = () => {
  const { logOut, token, topType, setTopType, getItems } = useStateContext();

  const handleLogout = () => {
    logOut();
  };

  const handleTopTracks = async () => {
    if (topType === 'tracks') return;

    await getItems('tracks');
    await setTopType(() => 'tracks');
  };

  const handleTopArtists = async () => {
    if (topType === 'artists') return;

    await getItems('artists');
    await setTopType(() => 'artists');
  };

  const handleTopGenres = async () => {
    toast('Oops! Still working on it!', {
      icon: '😰',
      style: {
        borderRadius: '10px',
        background: '#2A2A3E',
        color: '#FFFFFF',
        boxShadow: '0px 0px 10px #191927',
      },
    });
  };

  return (
    <motion.div
      className="nav-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0, duration: 1 } }}
    >
      <div className="title">FlixStats</div>

      {token && (
        <>
          <div className="navbar-nav">
            <ul>
              <li
                onClick={handleTopTracks}
                className={topType === 'tracks' ? 'active' : ''}
              >
                Top Tracks
              </li>
              <li
                onClick={handleTopArtists}
                className={topType === 'artists' ? 'active' : ''}
              >
                Top Artists
              </li>
              <li onClick={handleTopGenres}>Top Genres</li>
            </ul>
          </div>

          <div className="navbar-settings">
            <button type="button" className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Navigation;
