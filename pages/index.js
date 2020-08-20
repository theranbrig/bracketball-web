import React, { useContext, useEffect, useState } from 'react';
import Navigation from '../components/Navigation';

const index = () => {
  useEffect(() => {
    fetch(
      'http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates=20180213'
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return <Navigation />;
};

export default index;
