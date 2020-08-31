import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import { motion } from 'framer-motion';
import fromUnixTime from 'date-fns/fromUnixTime';

const TournamentList = ({ user }) => {
  const { getTournaments, myTournaments, firebaseLoading } = useContext(FirebaseActionContext);

  useEffect(() => {
    getTournaments(user.uid);
  }, []);

  return (
    <div className='flex flex-wrap'>
      {!firebaseLoading ? (
        <motion.div
          exit={{ opacity: 0, scale: 0 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', ease: 'easeIn', duration: 1, mass: 0.5 }}>
          {myTournaments.map((tournament) => {
            console.log(fromUnixTime(tournament.date.seconds, { format: 'date' }));
            return (
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
            );
          })}
        </motion.div>
      ) : null}
    </div>
  );
};

export default TournamentList;
