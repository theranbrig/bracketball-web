import React, { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import { motion } from 'framer-motion';
import fromUnixTime from 'date-fns/fromUnixTime';
import { BsChevronRight, BsChevronLeft, BsPlusCircle } from 'react-icons/bs';
import { format, compareAsc } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const TournamentList = ({ user }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getTournaments, myTournaments, firebaseLoading } = useContext(FirebaseActionContext);

  useEffect(() => {
    getTournaments(user.uid);
    setTotalPages(Math.ceil(myTournaments.length / itemsPerPage));
  }, []);

  const handleChange = (page) => {
    setTotalPages(Math.ceil(myTournaments.length / itemsPerPage));
    if (currentPage > 0 || currentPage < totalPages) {
      setCurrentPage(currentPage + page);
    }
  };

  return (
    <>
      <div className='border-b-2 border-celadon py-4'>
        <div className='flex flex-row justify-between items-center w-full px-4 mb-4'>
          <Link href='/tournament/create'>
            <a className='flex flex-row text-title items-center text-prussian font-title'>
              <BsPlusCircle color='#1d3557' size='2rem' className='mr-2' /> Add Pool
            </a>
          </Link>
          <h2 className='text-prussian text-2xl'>My Pools</h2>
          <div>
            <button
              aria-label='show fewer pools'
              disabled={currentPage === 1}
              onClick={() => handleChange(-1)}>
              <BsChevronLeft color='#1d3557' size='2rem' />
            </button>
            <button
              aria-label='show more pools'
              disabled={currentPage === totalPages}
              onClick={() => handleChange(1)}>
              <BsChevronRight color='#1d3557' size='2rem' />
            </button>
          </div>
        </div>
        <div className='w-full grid grid-cols-3 grid-rows-2 gap-4 justify-center items-center px-4  h-minGridHeight'>
          {!firebaseLoading
            ? myTournaments
                .slice(currentPage * itemsPerPage - itemsPerPage, currentPage * itemsPerPage)
                .map((tournament) => {
                  const date = formatDistanceToNow(fromUnixTime(tournament.date.seconds));
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', ease: 'easeIn', duration: 1, mass: 0.5 }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
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

      </div>
    </>
  );
};

export default TournamentList;
