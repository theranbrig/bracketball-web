import React, { useContext, useEffect, useState } from 'react';

import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import { ImStarEmpty } from 'react-icons/im';
import LoadingModal from './LoadingModal';

const CurrentShowingTournament = ({ currentShowingTournament }) => {
  const [tournament, setTournament] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

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
                <form
                  className='w-1/2'
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendPoolInvitation(inviteEmail, currentShowingTournament);
                  }}>
                  <label className='input-form-label'>Email Address</label>
                  <input
                    className='input-form'
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                  <button
                    disabled={!inviteEmail}
                    className='w-button bg-powder block rounded-lg border-2 border-celadon text-prussian py-1 mx-auto'
                    type='submit'>
                    Send Invite
                  </button>
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
