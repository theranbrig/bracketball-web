import React, { useContext, useEffect, useState } from 'react';

const LoadingModal = ({ text }) => {
  return (
    <>
      <div className=' min-w-full min-h-screen absolute top-0 left-0 flex justify-center items-center bg-celadonTransparent h-desktopFullBody'>
        <div className='flex flex-col text-center'>
          <div className='sk-cube-grid'>
            <div className='sk-cube sk-cube1'></div>
            <div className='sk-cube sk-cube2'></div>
            <div className='sk-cube sk-cube3'></div>
            <div className='sk-cube sk-cube4'></div>
            <div className='sk-cube sk-cube5'></div>
            <div className='sk-cube sk-cube6'></div>
            <div className='sk-cube sk-cube7'></div>
            <div className='sk-cube sk-cube8'></div>
            <div className='sk-cube sk-cube9'></div>
          </div>
          <h2 className='text-2xl text-prussian'>{text ?? 'Loading...'}</h2>
        </div>
      </div>
      <style jsx>{`
        .sk-cube-grid {
          width: 120px;
          height: 120px;
          margin: 0px auto 50px;
        }
        .sk-cube-grid .sk-cube {
          background-color: #a8dadc;

          -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
          animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
        }
        .sk-cube-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        .sk-cube-grid .sk-cube1 {
          -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
        }
        .sk-cube-grid .sk-cube2 {
          -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
        }
        .sk-cube-grid .sk-cube3 {
          -webkit-animation-delay: 0.4s;
          animation-delay: 0.4s;
        }
        .sk-cube-grid .sk-cube4 {
          -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s;
        }
        .sk-cube-grid .sk-cube5 {
          -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
        }
        .sk-cube-grid .sk-cube6 {
          -webkit-animation-delay: 0.3s;
          animation-delay: 0.3s;
        }
        .sk-cube-grid .sk-cube7 {
          -webkit-animation-delay: 0s;
          animation-delay: 0s;
        }
        .sk-cube-grid .sk-cube8 {
          -webkit-animation-delay: 0.1s;
          animation-delay: 0.1s;
        }
        .sk-cube-grid .sk-cube9 {
          -webkit-animation-delay: 0.2s;
          animation-delay: 0.2s;
        }

        @-webkit-keyframes sk-cubeGridScaleDelay {
          0%,
          70%,
          100% {
            -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
          }
          35% {
            -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
          }
        }

        @keyframes sk-cubeGridScaleDelay {
          0%,
          70%,
          100% {
            -webkit-transform: scale3D(1, 1, 1);
            transform: scale3D(1, 1, 1);
          }
          35% {
            -webkit-transform: scale3D(0, 0, 1);
            transform: scale3D(0, 0, 1);
          }
        }
      `}</style>
    </>
  );
};

export default LoadingModal;
