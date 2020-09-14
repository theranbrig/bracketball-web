import React, { useEffect, useContext, useState } from 'react';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
const SelectRandom = ({ tournament, teams, user }) => {
  const [currentPick, setCurrentPick] = useState(tournament.currentPick);
  const [loading, setLoading] = useState(false);
  const { dbh, firebase } = useContext(FirebaseActionContext);
  const selectRandom = () => {
    setLoading(true);
    console.log(teams);
    const remainingTeams = teams.filter((team) => team.owner === '');
    const randomIndex = Math.floor(Math.random() * remainingTeams.length);
    const randomTeam = remainingTeams[randomIndex];
    dbh
      .collection(`tournaments/${tournament.id}/teams`)
      .doc(randomTeam.id)
      .update({ owner: user.uid, ownerName: user.username })
      .then(() => {
        dbh
          .collection('tournaments')
          .doc(tournament.id)
          .update({ currentPick: tournament.currentPick + 1 })
          .then(() => setLoading(false));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setCurrentPick(tournament.picks[tournament.currentPick - 1]);
  }, [tournament]);

  return (
    <>
      {currentPick && currentPick.id === user.uid ? (
        <button
          disabled={loading}
          onClick={() => {
            selectRandom();
          }}>
          Select Random Team
        </button>
      ) : null}
    </>
  );
};

export default SelectRandom;
