import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
const TournamentList = ({ user }) => {
  const { getTournaments, myTournaments } = useContext(FirebaseActionContext);
  console.log(myTournaments);
  useEffect(() => {
    getTournaments(user.uid);
  }, []);

  return (
    <div className='flex flex-wrap'>
      {myTournaments.map((tournament) => (
        <Link href={`tournament/${tournament.id}`} key={tournament.id}>
          <div className='tournament-list-item border-powder border-2 rounded-lg p-4 flex flex-col bg-prussian text-honeydew'>
            <div className='mb-4'>
              <p className='uppercase text-base'>{tournament.name}</p>
              <p className='capitalize text-xs'>{tournament.type} Pool</p>
            </div>
            <div className='flex flex-row'>
              <p className='text-sm mr-8'>{`${tournament.users.length} Member${
                tournament.users.length !== 1 ? 's' : ''
              }`}</p>
              <p className='text-sm'>{tournament.date.seconds}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TournamentList;
