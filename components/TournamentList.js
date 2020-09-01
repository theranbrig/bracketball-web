import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import { motion } from 'framer-motion';
import fromUnixTime from 'date-fns/fromUnixTime';

import { format, compareAsc } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const TournamentList = ({ user }) => {
  const { getTournaments, myTournaments, firebaseLoading } = useContext(FirebaseActionContext);

  useEffect(() => {
    getTournaments(user.uid);
  }, []);

  return (
    <div className='w-full flex flex-wrap justify-center items-center'>
      {!firebaseLoading
        ? myTournaments.map((tournament) => {
            const date = formatDistanceToNow(fromUnixTime(tournament.date.seconds));
            // TODO: Make this work with Flex Wrap properly
            return (
              <motion.div
                exit={{ opacity: 0, scale: 0 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', ease: 'easeIn', duration: 1, mass: 0.5 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '26%',
                  margin: '10px',
                  pointer: 'cursor',
                }}
                key={tournament.id}>
                <Link
                  href='/tournament/[id]'
                  as={`/tournament/${tournament.id}`}
                  key={tournament.id}>
                  <div className='border-powder border-2 rounded-lg p-4 bg-prussian text-honeydew'>
                    <div className='mb-4'>
                      <p className='uppercase text-base'>{tournament.name}</p>
                      <p className='capitalize text-xs'>{tournament.type} Pool</p>
                    </div>
                    <div className='flex flex-row justify-between'>
                      <p className='text-xs mr-16'>{`${tournament.users.length} Member${
                        tournament.users.length !== 1 ? 's' : ''
                      }`}</p>
                      <p className='text-xs'>{date}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })
        : null}
    </div>
  );
};

export default TournamentList;
