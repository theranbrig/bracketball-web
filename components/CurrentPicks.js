import React, { useEffect, useContext, useState } from 'react';

const CurrentPicks = ({ tournament, user }) => {
  return (
    <div>
      <div className='mb-4'>
        <h2 className='text-center text-prussian mb-1 text-xl'>On the Clock</h2>
        {tournament.picks
          .map((pick, idx) => ({ ...pick, number: idx + 1 }))
          .slice(tournament.currentPick - 1, tournament.currentPick)
          .map((pick) => (
            <p
              className={`mx-8 bg-prussian text-honeydew text-xl p-2 text-center border-2 ${
                pick.id === user.id ? 'border-imperial' : 'border-celadon'
              } rounded-lg`}
              key={pick.uid}>
              {pick.number} - {pick.username}
            </p>
          ))}
      </div>
      <div>
        <h2 className='text-center text-prussian mb-1 text-xl'>Next Picks</h2>
        <ul className='list-style-none grid grid-cols-3 gap-4 justify-around mx-auto px-8'>
          {tournament.picks
            .map((pick, idx) => ({ ...pick, number: idx + 1 }))
            .slice(tournament.currentPick, tournament.currentPick + 3)
            .map((pick, idx) => (
              <li
                className={`bg-powder text-prussian border-2 ${
                  pick.id === user.id ? 'border-imperial' : 'border-celadon'
                } p-2 w-full text-center rounded-lg`}
                key={pick.uid}>
                {pick.number} - {pick.username}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrentPicks;
