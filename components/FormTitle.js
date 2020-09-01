import React, { useEffect, useContext, useState } from 'react';

import BackButton from './buttons/BackButton';
const FormTitle = ({ title }) => {
  return (
    <div className='flex flex-row justify-between w-full'>
      <BackButton />
      <h2>{title}</h2>
      <div />
    </div>
  );
};

export default FormTitle;
