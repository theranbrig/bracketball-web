import React, { useContext, useEffect, useState } from 'react';

import Navigation from './Navigation';
import Scoreboard from './Scoreboard';

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className='bg-honeydew flex flex-row h-desktopFullBody'>
        <div className='w-1/4 h-desktopFullBody overflow-scroll'>
          <Scoreboard />
        </div>
        <div className='w-3/4 h-desktopFullBody overflow-scroll'>{children}</div>
      </main>
    </>
  );
};

export default Layout;
