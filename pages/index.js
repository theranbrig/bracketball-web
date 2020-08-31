import React, { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Scoreboard from '../components/Scoreboard';
import TournamentList from '../components/TournamentList';
import Link from 'next/link';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';

const index = ({ children, user }) => {
  const { getTournaments, myTournaments } = useContext(FirebaseActionContext);

  return (
    <Layout user={user}>
      <h2>My Pools</h2>
      <TournamentList user={user} />
      <Link href='/tournament/create'>
        <>
          <a>Create Tournament</a>
        </>
      </Link>
    </Layout>
  );
};

export default index;
