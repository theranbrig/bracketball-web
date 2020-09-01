import React, { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Scoreboard from '../components/Scoreboard';
import TournamentList from '../components/TournamentList';
import Link from 'next/link';
import LoadingModal from '../components/LoadingModal';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import { motion } from 'framer-motion';

const index = ({ children, user }) => {
  const { getTournaments, myTournaments, firebaseLoading } = useContext(FirebaseActionContext);

  return (
    <Layout user={user}>
      {user ? <TournamentList user={user} /> : null}
      {firebaseLoading ? <LoadingModal /> : null}
    </Layout>
  );
};

export default index;
