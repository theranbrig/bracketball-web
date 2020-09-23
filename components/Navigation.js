import React, { useContext, useEffect, useState } from 'react';

import Link from 'next/link';
import { UserContext } from '../utilities/context/UserContext';

const Navigation = ({ user }) => {
  const { logout } = useContext(UserContext);
  return (
    <nav className='flex justify-between items-center px-12 lg:px-32 border-b-4 border-celadon '>
      <Link href='/'>
        <a className='bg-prussian text-5xl text-honeydew tracking-wide pointer-cursor font-logo'>
          Bracketball
        </a>
      </Link>
      {user ? (
        <div className='flex flex-col'>
          <p className='text-honeydew font-title tracking-wide'>{user.username}</p>
          <button onClick={logout} className='text-honeydew text-xs bg-celadon rounded-md'>
            Logout
          </button>
        </div>
      ) : (
        <Link href='/login'>
          <a className='text-honeydew font-title tracking-wide'>Login</a>
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
