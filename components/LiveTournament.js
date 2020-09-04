import React, { useEffect, useContext, useState } from 'react';
import WaitingRoom from './WaitingRoom';

const LiveTournament = ({ currentStatus }) => {
  console.log(currentStatus);
  return <div>{currentStatus === 'WAITING' ? <WaitingRoom /> : <h1>Now Live</h1>}</div>;
};

export default LiveTournament;
