import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className='flex justify-between items-center px-12 lg:px-32 border-b-4 border-powder '>
      <Link href='/'>
        <h1 className='bg-prussian text-5xl text-honeydew tracking-wide pointer-cursor'>
          Bracketball
        </h1>
      </Link>
      <Link href='/login'>
        <a className='text-honeydew font-title tracking-wide'>Login</a>
      </Link>
    </nav>
  );
};

export default Navigation;
