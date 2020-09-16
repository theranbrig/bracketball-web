import React from 'react';
import Popper from 'popper.js';

const TeamItem = ({ color, team, user }) => {
  const [tooltipShow, setTooltipShow] = React.useState(false);
  const btnRef = React.createRef();
  const tooltipRef = React.createRef();

  const openLeftTooltip = () => {
    new Popper(btnRef.current, tooltipRef.current, {
      placement: 'top',
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
              className={`border-2 border-prussian ${
                team.owner === ''
                  ? 'bg-celadon hover:bg-celadonDark'
                  : team.owner === user.uid
                  ? 'bg-green-600 hover:bg-green-800'
                  : 'bg-imperial hover:bg-imperialDark'
              } text-honeydew p-2 mx-auto my-1 rounded-lg w-11/12 text-left`}
              key={team.id}>
              <p className='text-xs'>
                <strong>
                  {team.seed}
                  {team.group}
                </strong>{' '}
                - {team.name}
              </p>
              <p className='text-xs'>{team.owner ? team.ownerName : 'UNDRAFTED'}</p>
            </button>

          <div
            className={
              (tooltipShow ? '' : 'hidden ') +
              'bg-powder border-0 mr-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg'
            }
            ref={tooltipRef}>
            <div>
              <div
                className={
                  'bg-powder text-prussian opacity-75 font-semibold p-3 mb-0 border-b border-solid border-celadon uppercase rounded-t-lg'
                }>
                 <strong>
                  {team.seed}
                  {team.group}
                - {team.name}
                </strong>
                <br/>
                ({team.details.record})
              </div>
              <div className='text-prussian p-3 text-sm'>
                <p>Next Game: {team.nextMatch}</p>
                <p>Regular Season Ranking: {team.details.ranking}</p>
                <p>Conference Record: {team.details.conferenceRecord}</p>
                <p>Non-Conference Record: {team.details.nonConferenceRecord}</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamItem;
