
import React from 'react';
import Popper from 'popper.js';

const PreviousPickItem = ({ color, team, user }) => {
  const [tooltipShow, setTooltipShow] = React.useState(false);
  const btnRef = React.createRef();
  const tooltipRef = React.createRef();

  const openLeftTooltip = () => {
    new Popper(btnRef.current, tooltipRef.current, {
      placement: 'right',
    });
    setTooltipShow(true);
  };

  const closeLeftTooltip = () => {
    setTooltipShow(false);
  };

  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full'>
          <button
            ref={btnRef}
            onMouseEnter={openLeftTooltip}
            onMouseLeave={closeLeftTooltip}
            className='bg-powder hover:bg-powderDark rounded-md border-celadon border-2 text-prussian text-xs py-1 my-1 w-11/12 mx-auto block'
              key={team.id}>
              <p className='text-xs text-left pl-4'>
                <strong>
                  {team.pick}
                </strong>{' '}
                - {team.name} ({team.seed}{team.group})
              </p>
          </button>
          <div
            className={
              (tooltipShow ? '' : 'hidden ') +
              'bg-celadon border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg'
            }
            ref={tooltipRef}>
            <div>
              <div
                className={
                  'bg-celadon text-honeydew opacity-75 text-sm text-left p-3 mb-0 border-b border-solid border-prussian rounded-lg'
                }>
                <p>Pick: {team.ownerName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviousPickItem;
