import React, { useContext, useEffect, useState } from 'react';
import {motion} from 'framer-motion'
const Scoreboard = () => {
  const [scores, setScores] = useState(null);

  const getData = () => {
    fetch(
      'http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates=20180213'
    )
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='border-r-4 border-celadon py-6 bg-powder text-prussian'>
      {scores !== null ? (
        <>
          <div className='text-center text-prussian text-2xl'>
            <h2>{scores.leagues[0].name} Scores</h2>
            <h3>{scores.eventsDate.date.slice(0, 10)}</h3>
          </div>
          {scores.events.map((score) => {
            const [home, away] = score.competitions[0].competitors;
            const { venue, groups } = score.competitions[0];
            return (
              <motion.div
                exit={{ opacity: 0, scale: 0 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', ease: 'easeIn', duration: 1, mass: 0.5 }} key={score.id}>
                <div
                  className='px-4 py-2 m-4 text-base border-2 rounded-lg border-celadon font-normal font-body bg-honeydew tracking-wide'
                 >
                  <p className='text-xs text-center'>{score.name}</p>
                  <div className='grid grid-cols-3 justify-around items-center'>
                    <div className={` ${away.winner && 'font-bold'} mt-2`}>
                      <div className='flex flex-col justify-center items-center w-full'>
                        <img src={away.team.logo} alt={away.team.shortDisplayName} width='48px' />

                        <p>
                          <span>
                            {away.curatedRank.current < 26 && `(${away.curatedRank.current}) `}
                          </span>
                          {away.team.abbreviation}{' '}
                        </p>
                        <p className='text-xs font-normal'>
                          ({away.records[3].summary} ,{away.records[0].summary})
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                      <p className='text-2xl'>
                        <span className={away.winner ? 'font-bold' : ''}>{away.score}</span> -{' '}
                        <span className={home.winner ? 'font-bold' : ''}>{home.score}</span>
                      </p>
                      <p className='text-sm text-center text-imperial'>
                        {score.status.type.completed
                          ? 'Final'
                          : `${score.status.period} - ${score.status.displayClock}`}
                      </p>
                    </div>
                    <div className={` ${home.winner && 'font-bold'} mt-2`}>
                      <div className='flex flex-col justify-center items-center w-full'>
                        <img src={home.team.logo} alt={home.team.shortDisplayName} width='48px' />
                        <p>
                          <span>
                            {home.curatedRank.current < 26 && `(${home.curatedRank.current}) `}
                          </span>
                          {home.team.abbreviation}{' '}
                        </p>
                        <p className='text-xs font-normal'>
                          ({home.records[3].summary} ,{home.records[0].summary})
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className='text-xs text-center'>
                    {groups.shortName} - {venue.address.city}, {venue.address.state}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default Scoreboard;
