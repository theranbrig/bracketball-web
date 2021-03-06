import React, { useContext, useEffect, useState } from 'react';

import Basketball from '../public/icons/basketball.svg';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import Timer from './Timer';
import { createErrorToast } from '../utilities/toast';

const SelectRandom = ({ tournament, teams, user }) => {
  const [currentPick, setCurrentPick] = useState(tournament.currentPick);
  const [remainingTeams, setRemainingTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomTeamView, setRandomTeamView] = useState('');

  const { dbh, firebase } = useContext(FirebaseActionContext);

  const displayRandomTeam = async () => {
    const randomTeamNumber = Math.floor(Math.random() * remainingTeams.length);
    setRandomTeamView(remainingTeams[randomTeamNumber].name);
  };

  // const timestamp = Date.now();
  // console.log(timestamp);

  const runDisplayTeams = () => {
    let count = 0;
    function display() {
      const intervalId = setInterval(() => {
        if (++count == 10) {
          clearInterval(intervalId);
        }
        displayRandomTeam();
      }, 500);
    }
    display();
  };

  const makePick = async (userId, username) => {
    setLoading(true);
    const pickableTeams = await teams.filter((team) => team.owner === '');
    const randomIndex = await Math.floor(Math.random() * pickableTeams.length);
    const randomTeam = await pickableTeams[randomIndex];
    if (pickableTeams.length) {
      await dbh
        .collection(`tournaments/${tournament.id}/teams`)
        .doc(randomTeam.id)
        .update({ owner: userId, ownerName: username, pick: tournament.currentPick })
        .then(async () => {
          const timestamp = await Date.now();
          await dbh
            .collection('tournaments')
            .doc(tournament.id)
            .update({
              currentPick: tournament.currentPick + 1,
              previousPickTime: timestamp,
              status: tournament.currentPick === tournament.picks.length ? 'SCORING' : 'LIVE',
            })
            .then(() => {
              setLoading(false);
              setRandomTeamView('');
            })
            .catch((err) => {
              createErrorToast(err.message);
              setLoading(false);
            });
        })
        .catch((err) => {
          createErrorToast(err.message);
          setLoading(false);
        });
    } else {
      console.log('NO TEAMS');
      setLoading(false);
      createErrorToast('No Teams Remaining');
    }
  };

  const selectRandomClick = async (userId, username) => {
    setLoading(true);
    runDisplayTeams();
    setTimeout(() => {
      setLoading(false);
      makePick(user.uid, user.username);
    }, 5500);
  };

  useEffect(() => {
    setCurrentPick(tournament.picks[tournament.currentPick - 1]);
    setRemainingTeams(teams.filter((team) => team.owner === ''));
  }, [tournament]);

  return (
    <div className='flex justify-center items-center flex-row mt-12'>
      {currentPick && currentPick.id === user.uid ? (
        <div className='flex flex-col justify-start items-center mr-12'>
          <div className='random-team'>
            {randomTeamView.length ? (
              <h2 className='text-center text-2xl'>
                Selecting Team...
                <br />
                <span>{randomTeamView.toUpperCase()}</span>
              </h2>
            ) : null}
          </div>
          <div className='select-button bg-powder border-prussian border-4 rounded-full flex justify-center items-center'>
            <img
              className='select-button-icon animate-spin-slow duration-fiveThous'
              src={Basketball}
              alt='basketball'
            />
          </div>
          <button
            className='bg-celadon text-honeydew font-title px-8 py-2 rounded-full mt-4 border-prussian border-2 hover:bg-celadonDark active:bg-celadonDark duration-500 disabled:opacity-75'
            onClick={async () => {
              await selectRandomClick(user.uid, user.username);
            }}>
            Select Random Team
          </button>
        </div>
      ) : null}
      <Timer
        tournament={tournament}
        currentPick={currentPick}
        user={user}
        makePick={makePick}
        loading={loading}
      />
    </div>
  );
};

export default SelectRandom;
