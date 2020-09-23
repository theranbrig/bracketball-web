import React, { useEffect, useContext, useState } from 'react';

import { motion } from 'framer-motion';

const DetailedStandings = ({ players, tournament, teams, user }) => {
  console.log(teams);
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', ease: 'easeIn', duration: 1, mass: 0.5 }}>
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
                <table key={player.id} className='border-2 border-prussian'>
                  <thead>
                    <tr>
                      <th
                        colSpan='3'
                        className='w-full bg-celadon p-2 text-honeydew font-light text-center font-title'>
                        {player.username}
                      </th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th
                        colSpan='3'
                        className='w-full bg-celadon p-2 text-honeydew font-light text-center text-lg'>
                        Total: <span className='font-number'>{player.points}</span>
                      </th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th className='bg-celadon p-2 text-honeydew font-light text-center'>Pick</th>
                      <th className='w-full bg-celadon p-2 text-honeydew font-light text-left'>
                        Team
                      </th>
                      <th className='w-full bg-celadon p-2 text-honeydew font-light'>Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myTeams.map((team) => (
                      <tr key={team.id} className='text-sm'>
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
                  </tbody>
                </table>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};

export default DetailedStandings;
