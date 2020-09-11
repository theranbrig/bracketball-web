import React, { useContext, useEffect, useState } from 'react';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';

const Draft = ({ tournament, user, players, teams }) => {
  const { dbh } = useContext(FirebaseActionContext);

  const selectDraftOrder = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    dbh.collection('tournaments').doc(tournament.id).update({ draftOrder: array });
    const totalPicks = teams.length;
    

  };

  return (
    <div className='w-full flex flex-row'>
      <div className='w-5/6'>
        {!tournament.draftOrder ? (
          user.role === 'OWNER' ? (
            <h1>DRAFT</h1>
          ) : null
        ) : (
          <button
            onClick={() => {
              selectDraftOrder(tournament.members);
            }}>
            START DRAFT ORDER SELECTION
          </button>
        )}
      </div>
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
