import React, { useContext, useEffect, useState } from 'react';

import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import CurrentPicks from './CurrentPicks';
import TeamList from './TeamList';
import SelectRandom from './SelectRandom';
import PreviousPicks from './PreviousPicks';

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
    dbh.collection('tournaments').doc(tournament.id).update({ draftOrder: array, currentPick: 1 });
    const totalPicks = teams.length;
    const order = array;
    const reverseOrder = [...array].reverse();
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
      <PreviousPicks teams={teams} />
      <div className='w-5/6'>
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
          <>
            <CurrentPicks tournament={tournament} user={user} />
            <SelectRandom teams={teams} user={user} tournament={tournament} />
          </>
        )}
      </div>
      <TeamList user={user} teams={teams} />
    </div>
  );
};

export default Draft;
