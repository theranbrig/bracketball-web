import React, { useContext, useEffect, useState } from 'react';

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

  return (
    <div>
      <h1 className='bg-prussian text-5xl text-powder border-b-2 border-imperial'>Bracketball</h1>
    </div>
  );
};

export default index;
