import React, { useContext, useEffect, useState } from 'react';

import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';

const Draft = ({ tournament, user, players, teams }) => {
  const { dbh } = useContext(FirebaseActionContext);
  console.log({ players, user, teams, tournament });

  const selectDraftOrder = (array) => {
    var currentIndex = array.length,
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
    console.log({ array });
    dbh.collection('tournaments').doc(tournament.id).update({ draftOrder: array, currentPick: 1 });
    const totalPicks = teams.length;
    const order = array;
    const reverseOrder = array.reverse();
    let tempPicks = [];
    let round = 1;
    while (tempPicks.length < totalPicks) {
      if (round % 2 === 0) {
        tempPicks.push(...reverseOrder);
      } else {
        tempPicks.push(...order);
      }
      round++;
    }

    dbh.collection('tournaments').doc(tournament.id).update({ picks: tempPicks });
  };

  return (
    <div className='w-full flex flex-row'>
      <div className='w-5/6'>
        <button
          onClick={() => {
            selectDraftOrder(tournament.memberInfo);
          }}>
          START DRAFT ORDER SELECTION
        </button>
        {!tournament.draftOrder ? (
          user.role === 'OWNER' ? (
            <button
              onClick={() => {
                selectDraftOrder(tournament.members);
              }}>
              START DRAFT ORDER SELECTION
            </button>
          ) : (
            <h2>Selecting Draft Order</h2>
          )
        ) : (
          <div>
            <h2 className='text-center text-prussian'>Next Picks</h2>
            <ul className='list-style-none grid grid-cols-3 gap-4 justify-around mx-auto px-8'>
              {tournament.picks
                .map((pick, idx) => ({ ...pick, number: idx + 1 }))
                .slice(tournament.currentPick - 1, tournament.currentPick + 2)
                .map((pick, idx) => (
                  <li
                    className='bg-powder text-prussian border-2 border-celadon p-2 w-full'
                    key={pick.uid}>
                    {pick.number} - {pick.username}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
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
            <p className='text-xs'>{team.owner ? team.ownerUsername : 'UNDRAFTED'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Draft;
