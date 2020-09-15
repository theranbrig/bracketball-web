import React, { useEffect, useContext, useState } from 'react';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import Basketball from '../public/icons/basketball.svg';

const SelectRandom = ({ tournament, teams, user }) => {
  const [currentPick, setCurrentPick] = useState(tournament.currentPick);
  const [remainingTeams, setRemainingTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [randomTeamView, setRandomTeamView] = useState('');
  const [timer, setTimer] = useState('');
  const [displayTimer, setDisplayTimer] = useState(false);
  const { dbh, firebase } = useContext(FirebaseActionContext);

  const displayRandomTeam = async () => {
    const randomTeamNumber = Math.floor(Math.random() * remainingTeams.length);
    setRandomTeamView(remainingTeams[randomTeamNumber].name);
  };

  const timestamp = Date.now();
  console.log(timestamp);

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

  const updatePick = (userId, username, randomTeam) => {
    setLoading(true);
    dbh
      .collection(`tournaments/${tournament.id}/teams`)
      .doc(randomTeam.id)
      .update({ owner: userId, ownerName: username, pick: tournament.currentPick })
      .then(async () => {
        const timestamp = Date.now();
        dbh
          .collection('tournaments')
          .doc(tournament.id)
          .update({ currentPick: tournament.currentPick + 1, previousPickTime: timestamp })
          .then(() => {
            setLoading(false);
            setRandomTeamView('');
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const selectRandom = async (userId, username) => {
    setLoading(true);
    const randomIndex = Math.floor(Math.random() * remainingTeams.length);
    const randomTeam = remainingTeams[randomIndex];
    console.log(randomTeam);
    if (remainingTeams.length) {
      runDisplayTeams();
      setTimeout(() => {
        updatePick(user.uid, user.username, randomTeam);
      }, 5500);
    } else {
      console.log('NO TEAMS');
    }
  };

  const runTimer = () => {
    setInterval(() => {
      const timestamp = Date.now();
      setTimer(60 - Math.floor((timestamp - tournament.previousPickTime) / 1000));
      if (60 - Math.floor((timestamp - tournament.previousPickTime) / 1000) === 0) {
        if (user.role === 'OWNER') {
          const randomIndex = Math.floor(Math.random() * remainingTeams.length);
          const randomTeam = remainingTeams[randomIndex];
          updatePick(currentPick.id, currentPick.username, randomTeam);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    setCurrentPick(tournament.picks[tournament.currentPick - 1]);
    setRemainingTeams(teams.filter((team) => team.owner === ''));
    runTimer();
  }, [tournament]);

  return (
    <>
      {timer >= 0 && timer < 90 ? <h2 className='font-number'>{timer}</h2> : null}
      {currentPick && currentPick.id === user.uid ? (
        <div className='flex flex-col justify-center items-center mt-12'>
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
              await selectRandom(user.uid, user.username );
            }}>
            Select Random Team
          </button>
        </div>
      ) : null}
    </>
  );
};

export default SelectRandom;
