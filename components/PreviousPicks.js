import React, { useEffect, useContext, useState } from 'react';

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
          <li
            className='bg-powder hover:bg-powderDark m-2 rounded-md py-1 px-2 border-celadon border-2 text-prussian text-xs'
            key={team.id}>
            {team.pick} - {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousPicks;
