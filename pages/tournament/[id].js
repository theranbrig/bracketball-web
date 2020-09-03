import React, { useContext, useEffect, useState } from 'react';

import FormTitle from '../../components/FormTitle';
import Layout from '../../components/Layout';

const tournament = ({ user, tournament, players }) => {
  console.log(players);
  return (
    <Layout user={user}>
      <div className='flex flex-col h-desktopFullBody items-center justify-start'>
        <div className='my-4 w-1/2'>
          <FormTitle title={tournament.name} />
        </div>
  <div>{players.map(player => <p>{player.username}</p>)}</div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const tournament = await fetch(
    `https://firestore.googleapis.com/v1/projects/bracketball-83683/databases/(default)/documents/tournaments/${query.id}`,
    { cors: 'no-cors' }
  ).then((res) => res.json().then((data) => data));
  const formattedTournamentData = {
    id: query.id,
    name: tournament.fields.name.stringValue.toUpperCase(),
    players: parseInt(tournament.fields.players.integerValue),
    type: tournament.fields.type.stringValue,
    owner: tournament.fields.owner.stringValue,
    date: tournament.fields.date.timestampValue,
  };
  const players = await fetch(
    `https://firestore.googleapis.com/v1/projects/bracketball-83683/databases/(default)/documents/tournaments/${query.id}/memberDetails`,
    { cors: 'no-cors' }
  ).then((res) => res.json().then((data) => data));
  const formattedPlayers = players.documents.map((player) => {
    return {
      id: player.fields.id.stringValue,
      username: player.fields.username.stringValue,
      status: player.fields.role.stringValue,
    };
  });
  console.log(formattedPlayers);
  return {
    props: {
      tournament: formattedTournamentData,
      players: formattedPlayers,
    },
  };
}

export default tournament;
