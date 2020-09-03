import React, { useContext, useEffect, useState, useMemo } from 'react';

import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import { ImStarEmpty } from 'react-icons/im';
import { RiUser3Line } from 'react-icons/ri';
import LoadingModal from './LoadingModal';
import InviteUser from './InviteUser';
import StandingsTable from './StandingsTable';

const CurrentShowingTournament = ({ currentShowingTournament }) => {
  const [tournament, setTournament] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dbh, sendPoolInvitation } = useContext(FirebaseActionContext);

  useEffect(() => {
    if (currentShowingTournament) {
      setLoading(true);
      dbh
        .collection('tournaments')
        .doc(currentShowingTournament)
        .get()
        .then((doc) => {
          setTournament({ id: currentShowingTournament, ...doc.data() });
          dbh
            .collection('tournaments')
            .doc(currentShowingTournament)
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
  }, [currentShowingTournament]);

  return (
    <div className='relative flex flex-col flex-between '>
      {loading ? <LoadingModal /> : null}
      {tournament ? (
        <>
          <p>{tournament.name}</p>
          {members.map((member) => (
            <p className='flex flex-row items-center'>
              {member.role === 'OWNER' ? (
                <ImStarEmpty className='inline-block mr-2' />
              ) : (
                <RiUser3Line className='inline-block mr-2' />
              )}
              {member.username}
            </p>
          ))}
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

export default CurrentShowingTournament;
