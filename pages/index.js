import React, { useContext, useEffect, useState } from 'react';

import CurrentShowingTournament from '../components/TournamentBasicInformation';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import Layout from '../components/Layout';
import Link from 'next/link';
import LoadingModal from '../components/LoadingModal';
import Scoreboard from '../components/Scoreboard';
import TournamentList from '../components/TournamentList';
import { motion } from 'framer-motion';

const index = ({ children, user }) => {
  const [currentShowingTournament, setCurrentShowingTournament] = useState('');
  const {
    getTournaments,
    myTournaments,
    firebaseLoading,
    setFirebaseLoading,
    checkInvitations,
  } = useContext(FirebaseActionContext);

  useEffect(() => {
    if (user) {
      checkInvitations(user);
    } else {
      setFirebaseLoading(false);
    }
  }, []);

  return (
    <Layout user={user}>
      <div className='relative w-full h-desktopFullBody'>
        {user ? (
          <>
            <TournamentList user={user} setCurrentShowingTournament={setCurrentShowingTournament} />
            <CurrentShowingTournament tournamentId={currentShowingTournament} />
          </>
        ) : (
          <p>No User</p>
        )}
        {firebaseLoading ? <LoadingModal /> : null}
      </div>
    </Layout>
  );
};

export default index;
