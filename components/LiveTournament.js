import React, { useContext, useEffect, useState } from 'react';

import WaitingRoom from './WaitingRoom';

const LiveTournament = ({ tournament, players }) => {

  return <div>{tournament.status === 'WAITING' ? <WaitingRoom /> : <h1>Now Live</h1>}</div>;
};

export default LiveTournament;
