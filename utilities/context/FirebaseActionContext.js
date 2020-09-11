import React, { useEffect, useState } from 'react';
import { createErrorToast, createInvitationToast } from '../toast';

import cookie from 'js-cookie';
import firebase from '../firebaseSetup';
import { toast } from 'react-toastify';
import { tokenName } from '../constants';
import { useRouter } from 'next/router';

export const FirebaseActionContext = React.createContext();

const dbh = firebase.firestore();

const FirebaseActionProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [myTournaments, setMyTournaments] = useState([]);

  const router = useRouter();
  const createTournament = (name, type, players, date, owner) => {
    setLoading(true);
    dbh
      .collection('tournaments')
      .add({
        name,
        type,
        players,
        date,
        owner: owner.uid,
        members: [owner.uid],
        memberInfo: [{ id: owner.uid, username: owner.username }],
        status: 'PRE',
      })
      .then((doc) => {
        dbh
          .collection('tournaments')
          .doc(doc.id)
          .collection('memberDetails')
          .doc(owner.uid)
          .set({ id: owner.uid, username: owner.username, role: 'OWNER', points: 0 })
          .then(() => {
            router.push('/');
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            createErrorToast(err.message);
            setLoading(false);
          });
      })
      .catch((err) => {
        createErrorToast(err.message);
        setLoading(false);
      });
  };

  const getTournaments = (user) => {
    dbh
      .collection('tournaments')
      .where('members', 'array-contains', user)
      .onSnapshot((querySnapshot) => {
        let tournaments = [];
        querySnapshot.docs.forEach((doc) => {
          tournaments.push({ id: doc.id, ...doc.data() });
        });
        setMyTournaments(tournaments);
        setLoading(false);
      });
  };

  const joinTournament = (user, tournamentId) => {
    setLoading(true);
    // Check if Tournament Exists
    dbh
      .collection('tournaments')
      .doc(tournamentId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Check if User is in tournament
          dbh
            .collection('tournaments')
            .doc(tournamentId)
            .collection('memberDetails')
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (!doc.exists) {
                // If user exists add to members list and create userDetails
                dbh
                  .collection('tournaments')
                  .doc(tournamentId)
                  .update({
                    members: firebase.firestore.FieldValue.arrayUnion(user.uid),
                    memberInfo: firebase.firestore.FieldValue.arrayUnion({ id: user.uid, username: user.username }),
                  })
                  .then(() => {
                    dbh
                      .collection('tournaments')
                      .doc(tournamentId)
                      .collection('memberDetails')
                      .doc(user.uid)
                      .set({ id: user.uid, username: user.username, role: 'USER', points: 0 })
                      .then(() => {
                        // Delete any invitations with this user and tournament
                        dbh
                          .collection('poolInvitations')
                          .where('user', '==', user.uid)
                          .where('tournamentId', '==', tournamentId)
                          .get()
                          .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                              const { id } = doc;
                              removeInvitation(id);
                            });
                            setLoading(false);
                          });
                      })
                      .catch(() =>
                        createErrorToast(
                          'Something went wrong. Check that you have the correct id.'
                        )
                      );
                  });
              } else {
                createErrorToast('Already a member of this pool.');
              }
            })
            .catch(() =>
              createErrorToast('Something went wrong. Check that you have the correct id.')
            );
        } else {
          createErrorToast('Something went wrong. Check that you have the correct id.');
        }
      });
  };

  const sendPoolInvitation = (email, tournamentId, tournamentName, successCallback) => {
    let user = null;
    dbh
      .collection('users')
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length) {
          const user = { uid: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
          // Check if user is a part of the pool
          console.log(user);
          dbh
            .collection('tournaments')
            .doc(tournamentId)
            .collection('memberDetails')
            .doc(user.uid)
            .get()
            .then((doc) => {
              // If part of the pool set error
              if (doc.exists) {
                createErrorToast('User is already in pool.');
              } else {
                // Check if invitation exists
                dbh
                  .collection('poolInvitations')
                  .where('user', '==', user.uid)
                  .where('tournamentId', '==', tournamentId)
                  .get()
                  .then((querySnapshot) => {
                    if (querySnapshot.docs.length) {
                      createErrorToast('Invitation to tournament already sent.');
                    } else {
                      // If not in the pool or no invite then create invite
                      dbh
                        .collection('poolInvitations')
                        .add({ user: user.uid, tournamentId, tournamentName })
                        .then(() => {
                          console.log('Invitation Sent');
                          // TODO: Add in successCallback(true);
                        });
                    }
                  });
              }
            });
        } else {
          createErrorToast('No user found with that email address.');
        }
      });
  };

  const checkInvitations = (user) => {
    dbh
      .collection('poolInvitations')
      .where('user', '==', user.uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          console.log(doc.data());
          const invitationId = doc.id;
          const { tournamentId, tournamentName } = doc.data();
          createInvitationToast(tournamentId, tournamentName, user, invitationId);
        });
      });
  };

  const updateMemberStatus = (tournamentId, userId, status) => {
    dbh
      .collection('tournaments')
      .doc(tournamentId)
      .collection('memberDetails')
      .doc(userId)
      .update({ status })
      .then(() => console.log('updated'))
      .catch((err) => {
        console.log(err);
        createErrorToast(err.message);
      });
  };

  const removeInvitation = (invitationId) => {
    dbh.collection('poolInvitations').doc(invitationId).delete();
  };

  return (
    <FirebaseActionContext.Provider
      value={{
        createTournament,
        firebaseLoading: loading,
        getTournaments,
        myTournaments,
        joinTournament,
        dbh,
        sendPoolInvitation,
        checkInvitations,
        removeInvitation,
        setFirebaseLoading: setLoading,
        updateMemberStatus,
      }}>
      {children}
    </FirebaseActionContext.Provider>
  );
};

export default FirebaseActionProvider;
