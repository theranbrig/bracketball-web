import React, { useEffect, useContext, useState } from 'react';
import Rodal from 'rodal';
const ViewBracket = () => {
  const [showBracket, setShowBracket] = useState(false);

  const hide = () => {
    setShowBracket(false);
  };
  return (
    <div>
      <button
        className='bg-celadon hover:bg-celadonDark text-white active:bg-celadonDark text-base px-8 py-1 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mx-auto block transition-button'
        onClick={() => setShowBracket(!showBracket)}>
        View Bracket
      </button>
      <Rodal visible={showBracket} onClose={hide} animation='flip' width={1000} height={800}>
        <img
          src='https://www.ncaa.com/_flysystem/public-s3/images/2019-06-27/2020-NCAA-bracket-March-Madness_0.jpg'
          alt='tournament bracket'
        />
      </Rodal>
    </div>
  );
};

export default ViewBracket;
