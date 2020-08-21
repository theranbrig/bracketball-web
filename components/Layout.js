import React, { useContext, useEffect, useState } from 'react';

import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main className="bg-honeydew">{children}</main>
    </>
  );
};

export default Layout;
