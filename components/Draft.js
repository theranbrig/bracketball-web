import React, { useContext, useEffect, useState } from 'react';

const Draft = ({ tournament, user, players, teams }) => {
  console.log(teams);
  return (
    <div className='w-full flex flex-row'>
      <div className='w-5/6'></div>
      <ul className='w-1/6 overflow-y-scroll'>
        {teams.map((team) => (
          <li className='border-2 border-prussian bg-celadon text-honeydew p-2 m-1' key={team.id}>
            <p className='text-xs'>
              <strong>
                {team.seed}
                {team.region}
              </strong>{' '}
              - {team.name}
            </p>
            <p className='text-xs'>{team.owner ? team.ownerUsername : 'UNDRAFTED'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Draft;
