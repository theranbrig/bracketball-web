import React, { useEffect, useContext, useState } from 'react';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import Basketball from '../public/icons/basketball.svg';
const SelectRandom = ({ tournament, teams, user }) => {
  const [currentPick, setCurrentPick] = useState(tournament.currentPick);
  const [loading, setLoading] = useState(false);
  const [randomTeamView, setRandomTeamView] = useState('');
  const { dbh, firebase } = useContext(FirebaseActionContext);

  const displayRandomTeam = () => {
    const remainingTeams = teams.filter((team) => team.owner === '');
    const randomTeamNumber = Math.floor(Math.random() * remainingTeams.length);
    setRandomTeamView(remainingTeams[randomTeamNumber].name);
  };

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

  const selectRandom = () => {
    setLoading(true);
    runDisplayTeams();
    setTimeout(() => {
      const remainingTeams = teams.filter((team) => team.owner === '');
      const randomIndex = Math.floor(Math.random() * remainingTeams.length);
      const randomTeam = remainingTeams[randomIndex];
      dbh
        .collection(`tournaments/${tournament.id}/teams`)
        .doc(randomTeam.id)
        .update({ owner: user.uid, ownerName: user.username, pick: tournament.currentPick })
        .then(() => {
          dbh
            .collection('tournaments')
            .doc(tournament.id)
            .update({ currentPick: tournament.currentPick + 1 })
            .then(() => {
              setLoading(false);
              setRandomTeamView('');
            });
        })
        .catch((err) => console.log(err));
    }, 5500);
  };

  useEffect(() => {
    setCurrentPick(tournament.picks[tournament.currentPick - 1]);
  }, [tournament]);

  return (
    <>
      {currentPick && currentPick.id === user.uid ? (
        <div className='flex flex-col justify-center items-center mt-12'>
          <div className='random-team'>
          {randomTeamView.length ?
            <h2 className="text-center text-2xl">Selecting Team...<br/><span>{randomTeamView.toUpperCase()}</span></h2>
            : null}
            </div>

          <div className='select-button bg-powder border-prussian border-4 rounded-full flex justify-center items-center'>
            <img
              className='select-button-icon animate-spin-slow duration-fiveThous'
              src={Basketball}
              alt='basketball'
            />
          </div>
          <button
            className='bg-celadon text-honeydew font-title px-8 py-2 rounded-full mt-4 border-prussian border-2 hover:bg-prussian duration-500 disabled:opacity-75'
            disabled={loading}
            onClick={() => {
              selectRandom();
            }}>
            Select Random Team
          </button>
        </div>
      ) : null}
    </>
  );
};

export default SelectRandom;
