import { BsChevronLeft, BsChevronRight, BsPlusCircle } from 'react-icons/bs';
import { HiOutlineArrowCircleRight, HiOutlineInformationCircle } from 'react-icons/hi';
import React, { useContext, useEffect, useState } from 'react';
import { compareAsc, format } from 'date-fns';

import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import Link from 'next/link';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import fromUnixTime from 'date-fns/fromUnixTime';
import { motion } from 'framer-motion';

const TournamentList = ({ user, setCurrentShowingTournament }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getTournaments, myTournaments, firebaseLoading } = useContext(FirebaseActionContext);

  useEffect(() => {
    if (user) {
      getTournaments(user.uid);
      setTotalPages(Math.ceil(myTournaments.length / itemsPerPage));
    }
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
        <div className='w-full grid grid-cols-3 grid-rows-2 gap-4 justify-center items-center px-4 h-minGridHeight'>
          {!firebaseLoading
            ? myTournaments
                .slice(currentPage * itemsPerPage - itemsPerPage, currentPage * itemsPerPage)
                .map((tournament) => {
                  console.log(tournament);
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
                        height: '120px',
                      }}
                      key={tournament.id}>
                      <div className='h-gridItemHeight flex flex-col justify-between border-powder border-2 rounded-lg p-4 bg-prussian hover:bg-prussianDark text-honeydew'>
                        <div>
                          <div className='flex flex-row justify-between w-full'>
                            <div>
                              <p className='uppercase text-base'>
                                {tournament.name}
                                  {tournament.status === 'LIVE' || tournament.status === 'WAITING'
                                    ?
                                <span className="ml-4 bg-imperial p-1 rounded-md">
                                    LIVE
                                </span>
                                    : null}
                              </p>
                              <p className='capitalize text-xs'>
                                {tournament.type} Pool - {date}
                              </p>
                            </div>
                            <Link
                              href='/tournament/[id]'
                              as={`/tournament/${tournament.id}`}
                              key={tournament.id}>
                              <a>
                                <HiOutlineArrowCircleRight color='#f1faee' size='1.5rem' />
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                          <p className='text-xs mr-16'>{`${tournament.members.length} Member${
                            tournament.members.length !== 1 ? 's' : ''
                          }`}</p>
                          <button
                            aria-label='show tournament information'
                            onClick={() => {
                              setCurrentShowingTournament(tournament.id);
                            }}>
                            <HiOutlineInformationCircle color='#f1faee' size='1.5rem' />
                          </button>
                        </div>
                      </div>
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
