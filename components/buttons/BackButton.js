import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { BsChevronLeft } from 'react-icons/bs';

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}>
      <BsChevronLeft />
    </button>
  );
};

export default BackButton;
