import React, { useEffect, useContext, useState } from 'react';

const TeamList = ({ teams, user }) => {
  return (
    <ul className='w-1/6 overflow-y-scroll'>
      {teams.map((team) => (
        <li className='border-2 border-prussian bg-celadon text-honeydew p-2 m-1' key={team.id}>
          <p className='text-xs'>
            <strong>
              {team.seed}
              {team.group}
            </strong>{' '}
            - {team.name}
          </p>
          <p className='text-xs'>{team.owner ? team.ownerName : 'UNDRAFTED'}</p>
        </li>
      ))}
    </ul>
  );
};

export default TeamList;
