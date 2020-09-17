import React, { useEffect, useContext, useState } from 'react';
import PreviousPickItem from './PreviousPickItem';

const PreviousPicks = ({ teams, user }) => {
  const [pickedTeams, setPickedTeams] = useState([]);
  useEffect(() => {
    console.log(teams.filter((team) => team.pick).sort((a, b) => a.pick - b.pick));
    setPickedTeams(teams.filter((team) => team.pick).sort((a, b) => a.pick - b.pick));
  }, [teams]);
  return (
    <div className='w-1/6'>
      <h3 className='text-center text-prussian'>Previous Picks</h3>
      <ul>
        {pickedTeams.map((team) => (
          <PreviousPickItem team={team} user={user} key={team.id}/>
        ))}
      </ul>
    </div>
  );
};

export default PreviousPicks;
