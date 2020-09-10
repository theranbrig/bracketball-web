import React, { useContext, useEffect, useState } from 'react';

import WaitingRoom from './WaitingRoom';

const LiveTournament = ({ tournament, players, user }) => {
  return (
    <>
      {tournament.status === 'WAITING' ? (
        <WaitingRoom players={players} tournament={tournament} user={user}/>
      ) : (
        <h1>Now Live</h1>
      )}
    </>
  );
};

export default LiveTournament;
