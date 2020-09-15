import React, { useEffect, useContext, useState } from 'react';

const TeamList = ({ teams, user }) => {
  const sortedTeams = teams.sort((a, b) => {
    return a.seed - b.seed || a.region - b.region;
  });
  return (
    <div className='flex flex-col w-1/6 overflow-y-scroll'>
      <h3 className='text-center text-prussian'>Previous Picks</h3>
      <ul className=''>
        {teams.map((team) => (
          <li
            className={`border-2 border-prussian ${
              team.owner === ''
                ? 'bg-celadon hover:bg-celadonDark'
                : team.owner === user.uid
                ? 'bg-green-600 hover:bg-green-800'
                : 'bg-imperial hover:bg-imperialDark'
            } text-honeydew p-2 m-1 rounded-lg`}
            key={team.id}>
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
    </div>
  );
};

export default TeamList;
