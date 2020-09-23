import React, { useState, useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';

const CountDown = dynamic(() => import('react-countdown-clock'), { ssr: false });
const Timer = ({ tournament, user, currentPick, makePick, loading }) => {
  const [startingTime, setStartingTime] = useState(null);
  const { dbh } = useContext(FirebaseActionContext);

  const onComplete = () => {
    const timestamp = Date.now();
    if (user.role === 'OWNER') {
      // dbh.collection('tournaments').doc(tournament.id).update({ previousPickTime: timestamp });
      makePick(currentPick.id, currentPick.username);
    }
  };

  useEffect(() => {
    const currentTimeRemaining = (90000 - (Date.now() - tournament.previousPickTime)) / 1000;
    console.log(currentTimeRemaining);
    if (currentTimeRemaining > 0) {
      console.log(true);
      setStartingTime(currentTimeRemaining);
    }
  }, [tournament.previousPickTime]);

  return (
    <div className='text-center flex flex-col items-center justify-center relative'>
      {startingTime >= 0 && !loading ? (
        <>
          <h3 className='text-2xl text-prussian mb-4'>Time Remaining</h3>
          <div className='relative block'>
            <CountDown
              key={startingTime}
              seconds={startingTime}
              color='#e63946'
              alpha={1}
              size={200}
              onComplete={onComplete}
              font='Orbitron'
              fontSize='30px'
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Timer;
