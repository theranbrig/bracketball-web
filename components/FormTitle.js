import React, { useEffect, useContext, useState } from 'react';

import BackButton from './buttons/BackButton';
const FormTitle = ({ title, showBackButton = true }) => {
  return (
    <>
      <div className='flex flex-row justify-between items-center w-full mb-8'>
        <div className='holder flex items-center'>{showBackButton ? <BackButton /> : null}</div>
        <h2 className='text-celadon text-3xl font-title'>{title}</h2>
        <div className='holder' />
      </div>
      <style jsx>{`
        .holder {
          width: 30px;
        }
      `}</style>
    </>
  );
};

export default FormTitle;
