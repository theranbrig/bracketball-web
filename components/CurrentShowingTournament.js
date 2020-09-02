import React, { useEffect, useContext, useState } from 'react';

import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import LoadingModal from './LoadingModal';
import { ImStarEmpty } from 'react-icons/im';

const CurrentShowingTournament = ({ currentShowingTournament }) => {
  const [tournament, setTournament] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { dbh } = useContext(FirebaseActionContext);
  useEffect(() => {
    if (currentShowingTournament) {
      setLoading(true);
      dbh
        .collection('tournaments')
        .doc(currentShowingTournament)
        .get()
        .then((doc) => {
          console.log(doc.data());
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
    <div className='relative'>
      {loading ? <LoadingModal /> : null}
      {tournament ? (
        <>
          <p>{tournament.name}</p>
          {members.map((member) => (
            <p className='flex flex-row items-center'>
              {member.status === 'OWNER' ? <ImStarEmpty className='inline-block mr-2' /> : null}
              {member.username}
            </p>
          ))}
          <div>
            {members.length < tournament.players ? (
              <>
                <h3>Add Members</h3>
                <form className='w-1/2'>
                  <label className='input-form-label'>Email Address</label>
                  <input className='input-form' />
                </form>
              </>
            ) : (
              <h3>Membership full</h3>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CurrentShowingTournament;
