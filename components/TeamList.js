import React, { useEffect, useContext, useState } from 'react';
import TeamItem from './TeamItem';

const TeamList = ({ teams, user, tournament }) => {
  const sortedTeams = teams.sort((a, b) => {
    return a.seed - b.seed || a.region - b.region;
  });
  return (
    <div className='flex flex-col w-1/6 overflow-y-scroll'>
      <h3 className='text-center text-prussian'>Pool Teams</h3>
      {tournament.groups.map(group => {
        const groupTeams = teams.filter(team => team.group === group).sort((a,b) => a.seed - b.seed)
        return(
          <>
            <h4>{group}</h4>
            <ul className=''>
            {groupTeams.map((team) => (
              <TeamItem color="pink" team={team} user={user} key={team.id}/>
            ))}
            </ul>
          </>
        )
      })}
    </div>
  );
};

export default TeamList;
