import React, { useContext, useEffect, useState } from 'react';

import WaitingRoom from './WaitingRoom';
import Draft from './Draft';

const LiveTournament = ({ tournament, players, user, teams }) => {
  return (
    <>
      {tournament.status === 'WAITING' ? (
        <WaitingRoom players={players} tournament={tournament} user={user} />
      ) : (
        <Draft players={players} tournament={tournament} user={user} teams={teams}/>
      )}
    </>
  );
};

export default LiveTournament;
