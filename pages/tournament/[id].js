import { createErrorToast } from '../../utilities/toast';
import React, { useContext, useEffect, useState } from 'react';

import FormTitle from '../../components/FormTitle';
import Layout from '../../components/Layout';
import StandingsTable from '../../components/StandingsTable';
import { FirebaseActionContext } from '../../utilities/context/FirebaseActionContext';
import WaitingRoom from '../../components/WaitingRoom';
import LiveTournament from '../../components/LiveTournament';
import LoadingModal from '../../components/LoadingModal';
import { useRouter } from 'next/router';

const tournament = ({ user }) => {
  const { id } = useRouter().query;

  const [tournament, setTournament] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState(null);

  const { dbh } = useContext(FirebaseActionContext);

  const startTournament = () => {
    dbh
      .collection('tournaments')
      .doc(tournament.id)
      .update({ status: 'WAITING' })
      .then(() => {
        dbh
          .collection('tournaments')
          .doc(tournament.id)
          .collection('memberDetails')
          .doc(user.uid)
          .update({ status: 'WAITING' })
          .then(() => console.log('updated'))
          .catch((err) => console.log(createErrorToast(err.message)));
        console.log('updated');
      })
      .catch((err) => console.log(createErrorToast(err.message)));
  };

  useEffect(() => {
    dbh
      .collection('tournaments')
      .doc(id)
      .onSnapshot((querySnapshot) => {
        const { id } = querySnapshot;
        setTournament({ id, ...querySnapshot.data() });
        dbh
          .collection('tournaments')
          .doc(id)
          .collection('memberDetails')
          .onSnapshot((querySnapshot) => {
            let members = [];
            querySnapshot.docs.forEach((doc) => {
              members.push({ id: doc.id, ...doc.data() });
              if (doc.data().role === 'OWNER') {
                setOwner(doc.id);
              }
            });
            setPlayers(members);
          });
      });
  }, []);

  return (
    <Layout user={user}>
      {tournament ? (
        <div className='flex flex-col h-desktopFullBody items-center justify-start'>
          <div className='my-4 w-1/2'>
            <FormTitle title={tournament.name} />
          </div>
          {tournament.status === 'PRE' || tournament.status === 'SCORING' ? (
            <StandingsTable members={players} />
          ) : null}
          {tournament.status === 'WAITING' || tournament.status === 'LIVE' ? (
            <LiveTournament players={players} tournament={tournament} />
          ) : null}
          {tournament.status === 'PRE' ? (
            <>
              {user.uid === owner ? (
                <button onClick={() => startTournament()} className='form-button'>
                  Start Pool
                </button>
              ) : (
                <p>Waiting for Pool owner to start.</p>
              )}
            </>
          ) : (
            <h1>LIVE</h1>
          )}
        </div>
      ) : (
        <LoadingModal />
      )}
    </Layout>
  );
};

// export async function getServerSideProps({ query }) {
//   const tournament = await fetch(
//     `https://firestore.googleapis.com/v1/projects/bracketball-83683/databases/(default)/documents/tournaments/${query.id}`,
//     { cors: 'no-cors' }
//   ).then((res) => res.json().then((data) => data));
//   const formattedTournamentData = {
//     id: query.id,
//     name: tournament.fields.name.stringValue.toUpperCase(),
//     players: parseInt(tournament.fields.players.integerValue),
//     type: tournament.fields.type.stringValue,
//     owner: tournament.fields.owner.stringValue,
//     date: tournament.fields.date.timestampValue,
//     status: tournament.fields.status.stringValue,
//   };
//   const players = await fetch(
//     `https://firestore.googleapis.com/v1/projects/bracketball-83683/databases/(default)/documents/tournaments/${query.id}/memberDetails`,
//     { cors: 'no-cors' }
//   ).then((res) => res.json().then((data) => data));
//   const formattedPlayers = players.documents.map((player) => {
//     return {
//       id: player.fields.id.stringValue,
//       username: player.fields.username.stringValue,
//       role: player.fields.role.stringValue,
//       points: player.fields.points.integerValue,
//     };
//   });
//   console.log(formattedPlayers);
//   return {
//     props: {
//       tournament: formattedTournamentData,
//       players: formattedPlayers,
//     },
//   };
// }

export default tournament;
