import React, { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Scoreboard from '../components/Scoreboard';
import Link from 'next/link';

const index = ({ children, user }) => {
  console.log(user);
  useEffect(() => {
    fetch(
      'http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates=20180213'
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <Layout user={user}>
      <h2>Hello</h2>
      <Link href='/tournament/create'>
        <a>Create Tournament</a>
      </Link>
    </Layout>
  );
};

export default index;
