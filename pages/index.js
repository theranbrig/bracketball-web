import React, { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Scoreboard from '../components/Scoreboard';
import TournamentList from '../components/TournamentList';
import Link from 'next/link';
import LoadingModal from '../components/LoadingModal';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import { motion } from 'framer-motion';
import CurrentShowingTournament from '../components/CurrentShowingTournament';

const index = ({ children, user }) => {
  const [currentShowingTournament, setCurrentShowingTournament] = useState('');
  const { getTournaments, myTournaments, firebaseLoading, checkInvitations } = useContext(
    FirebaseActionContext
  );

  useEffect(() => {
    if (user) {
      checkInvitations(user);
    }
  }, []);

  return (
    <Layout user={user}>
      <div className='relative w-full h-desktopFullBody'>
        {user ? (
          <>
            <TournamentList user={user} setCurrentShowingTournament={setCurrentShowingTournament} />
            <CurrentShowingTournament currentShowingTournament={currentShowingTournament} />
          </>
        ) : null}
        {firebaseLoading ? <LoadingModal /> : null}
      </div>
    </Layout>
  );
};

export default index;
