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
      <table className='w-11/12 lg:w-1/3 mx-auto border-2 border-prussian'>
        <thead className="bg-celadon text-honeydew">
          <th>Status</th>
          <th>Username</th>
        </thead>
        <tbody className=''>
          {players.map((player) => (
            <tr className='p-2 border-b border-b-powder'>
              <td
                className={` ${
                  player.status === 'READY'
                    ? 'bg-imperial text-honeydew'
                    : 'bg-powder text-prussian'
                } w-1/4 text-sm text-center p-1 m-1`}>
                {player.status}
              </td>
              <td className='text-center'>{player.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {owner == user.uid && players.length === tournament.players ? (
        <button className="bg-celadon hover:bg-celadonDark text-white active:bg-celadonDark text-base px-8 py-1 rounded-full shadow-md hover:shadow-lg outline-none focus:outline-none mx-auto block transition-button mt-8" onClick={() => updateTournamentStatus()}>Start the Draft</button>
      ) : null}
    </div>
  );
};

export default WaitingRoom;
