import React, { useEffect, useContext, useState } from 'react';
import WaitingRoom from './WaitingRoom';

const LiveTournament = ({ tournament, players }) => {
  console.log(tournament);
  return <div>{tournament.status === 'WAITING' ? <WaitingRoom /> : <h1>Now Live</h1>}</div>;
};

export default LiveTournament;
