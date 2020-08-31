import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
const TournamentList = ({ user }) => {
  const { getTournaments, myTournaments } = useContext(FirebaseActionContext);
  
  useEffect(() => {
    getTournaments(user.uid);
  }, []);

  return (
    <div className='flex flex-wrap'>
      {myTournaments.map((tournament) => (
        <Link href={`tournament`}>
          <div className=''>
            <p>{tournament.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TournamentList;
