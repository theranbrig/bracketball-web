import React, { useEffect, useContext, useState } from 'react';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
const WaitingRoom = ({ tournament, players, user }) => {
  const { dbh } = useContext(FirebaseActionContext);
  const owner = players.filter((player) => player.role === 'OWNER')[0].id;

  const updateTournamentStatus = () => {
    const tournamentRef = dbh.collection('tournaments').doc(tournament.id);
    tournamentRef.update({ status: 'LIVE' }).then(() =>
      tournamentRef
        .collection('memberDetails')
        .get()
        .then((snapshot) => {
          const promises = [];
          snapshot.forEach((doc) => {
            promises.push(doc.ref.update({ status: 'LIVE' }));
          });
          return Promise.all(promises);
        })
        .catch((err) => {
          console.log(err);
          return null;
        })
    );
  };
  return (
    <div className='w-full flex flex-col'>
      <table className='w-11/12 lg:w-1/3 mx-auto'>
        <thead>
          <th>Status</th>
          <th>Username</th>
        </thead>
        <tbody className=''>
          {players.map((player) => (
            <tr className='p-2'>
              <td
                className={` ${
                  player.status === 'WAITING'
                    ? 'bg-imperial text-honeydew'
                    : 'bg-powder text-prussian'
                } w-1/4 text-sm text-center rounded-md`}>
                {player.status === 'WAITING' ? 'READY' : 'WAIT'}
              </td>
              <td className='text-center'>{player.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {owner == user.uid && players.length === 1 ? (
        <button onClick={() => updateTournamentStatus()}>Start the Draft</button>
      ) : null}
    </div>
  );
};

export default WaitingRoom;
