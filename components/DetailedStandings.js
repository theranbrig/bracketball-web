import React, { useEffect, useContext, useState } from 'react';

const DetailedStandings = ({ players, tournament, teams, user }) => {
  console.log({ players, teams, tournament, user });
  return (
    <div className='w-full px-12'>
      <h2 className='text-3xl text-center text-prussian mb-4'>Detailed Standings</h2>
      <div className='grid grid-cols-4 w-full gap-4'>
        {players
          .sort((a, b) => b.points - a.points)
          .map((player) => {
            const myTeams = teams
              .filter((team) => team.owner === player.id)
              .sort((a, b) => a.pick - b.pick);
            return (
              <table className='border-2 border-prussian'>
                <thead>
                  <th
                    colspan='3'
                    className='w-full bg-celadon p-2 text-honeydew font-light text-center font-title'>
                    {player.username}
                  </th>
                </thead>
                <thead>
                  <th
                    colspan='3'
                    className='w-full bg-celadon p-2 text-honeydew font-light text-center text-lg'>
                    Total: <span className='font-number'>{player.points}</span>
                  </th>
                </thead>
                <thead>
                  <th className='bg-celadon p-2 text-honeydew font-light text-center'>Pick</th>
                  <th className='w-full bg-celadon p-2 text-honeydew font-light text-left'>Team</th>
                  <th className='w-full bg-celadon p-2 text-honeydew font-light'>Points</th>
                </thead>
                {myTeams.map((team) => (
                  <tr className='text-sm'>
                    <td className='text-center'>{team.pick}</td>
                    <td
                      className={`${
                        team.inTournament ? 'text-prussian' : 'text-imperial'
                      } pl-2 py-2 border-b border-b-celadon`}>
                      {team.name} - ({team.seed}
                      {team.group})
                    </td>
                    <td
                      className={`${
                        team.inTournament ? 'text-prussian' : 'text-imperial'
                      } text-center`}>
                      {team.points}
                    </td>
                  </tr>
                ))}
              </table>
            );
          })}
      </div>
    </div>
  );
};

export default DetailedStandings;
