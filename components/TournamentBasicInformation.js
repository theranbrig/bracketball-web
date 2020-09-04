import React, { useContext, useEffect, useState, useMemo } from 'react';

import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import { ImStarEmpty } from 'react-icons/im';
import { RiUser3Line } from 'react-icons/ri';
import LoadingModal from './LoadingModal';
import InviteUser from './InviteUser';
import StandingsTable from './StandingsTable';
import Link from 'next/link';

const tournamentId = ({ tournamentId }) => {
  const [tournament, setTournament] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dbh, sendPoolInvitation } = useContext(FirebaseActionContext);

  useEffect(() => {
    if (tournamentId) {
      setLoading(true);
      dbh
        .collection('tournaments')
        .doc(tournamentId)
        .get()
        .then((doc) => {
          setTournament({ id: tournamentId, ...doc.data() });
          dbh
            .collection('tournaments')
            .doc(tournamentId)
            .collection('memberDetails')
            .onSnapshot((querySnapshot) => {
              let players = [];
              querySnapshot.forEach((snapshot) => {
                players.push({ id: snapshot.id, ...snapshot.data() });
              });
              setMembers(players);

              setLoading(false);
            });
        });
    }
  }, [tournamentId]);

  return (
    <div className='relative flex flex-col flex-between '>
      {loading ? <LoadingModal /> : null}
      {tournament ? (
        <>
          <Link href='/tournament/[id]' as={`/tournament/${tournamentId}`}>
            <a className='text-3xl my-3 text-prussian text-center cursor-pointer'>
              {tournament.name}
            </a>
          </Link>
          {members.length ? <StandingsTable members={members} /> : null}
          <div>
            {members.length < tournament.players ? (
              <InviteUser tournament={tournament} />
            ) : (
              <h3 className='text-2xl text-prussian text-center'>Membership full</h3>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default tournamentId;
