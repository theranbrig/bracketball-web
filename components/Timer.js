import React, { useState, useEffect } from 'react';

const Timer = ({ tournament, user, currentPick, makePick }) => {
  const [currentCount, setCount] = useState(60);
  const [loading, setLoading] = useState(false);

  const timer = () => {
    const timestamp = Date.now();
    setCount(60 - Math.floor((timestamp - tournament.previousPickTime) / 1000));
  };

  useEffect(() => {
    console.log(tournament);
    if (currentCount === 0) {
      if (user.role !== 'OWNER' && tournament.currentPick <= tournament.picks.length && !loading) {
        console.log('CALLED');
        makePick(currentPick.id, currentPick.username, setLoading);
        const id = setInterval(timer, 1000);
        return () => clearInterval(id);
      } else {
        return;
      }
    }
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [currentCount, tournament.previousPickTime]);

  return <div>{currentCount}</div>;
};

export default Timer;
