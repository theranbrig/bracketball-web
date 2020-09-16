import React, { useEffect, useContext, useState } from 'react';
import TeamItem from './TeamItem';

const TeamList = ({ teams, user }) => {
  const sortedTeams = teams.sort((a, b) => {
    return a.seed - b.seed || a.region - b.region;
  });
  return (
    <div className='flex flex-col w-1/6 overflow-y-scroll'>
      <h3 className='text-center text-prussian'>Previous Picks</h3>
      <ul className=''>
        {teams.map((team) => (
          <TeamItem color="pink" team={team} user={user} key={team.id}/>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
