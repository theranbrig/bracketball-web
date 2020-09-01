import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { BsChevronLeft } from 'react-icons/bs';

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      aria-label='back'
      onClick={() => {
        router.back();
      }}>
      <BsChevronLeft color='#1d3557' size='1.5rem' />
    </button>
  );
};

export default BackButton;
