import React, { useEffect, useState } from 'react';

import cookie from 'js-cookie';
import { createErrorToast } from '../errorFunctions';
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
      .add({ name, type, players, date, owner: owner.uid, members: [owner.uid] })
      .then((doc) => {
        dbh
          .collection('tournaments')
          .doc(doc.id)
          .collection('memberDetails')
          .doc(owner.uid)
          .set({ id: owner.uid, username: owner.username, status: 'OWNER' })
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
    setLoading(true);
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
    const userDetailRef = dbh
      .collection('tournaments')
      .doc(tournamentId)
      .collection('memberDetails')
      .doc(user.uid);
    userDetailRef.get().then((doc) => {
      if (!doc.exists) {
        dbh
          .collection('tournaments')
          .doc(tournamentId)
          .update({ members: firebase.firestore.FieldValue.arrayUnion(user.uid) })
          .then(() => {
            userDetailRef.set({ id: user.uid, username: user.username, role: 'USER' }).then(() => {
              router.push('/');
              setLoading(false);
            });
          });
      } else {
        createErrorToast('Already a member of this pool.');
      }
    });
  };

  const sendPoolInvitation = (email, tournamentId) => {
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
                dbh.collection('poolInvitations').where('user', '==', user.uid).where('tournamentId', '==', tournamentId).get().then(querySnapshot => {if(querySnapshot.docs.length) {
createErrorToast('Invitation to tournament already sent.')
                } else {
                  // If not in the pool or no invite then create invite
                  dbh.collection('poolInvitations').add({user: user.uid, tournamentId}).then(() => {console.log("Invitation Sent")})

                }})
              }
            });
        } else {
          createErrorToast('No user found with that email address.');
        }
      });
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
      }}>
      {children}
    </FirebaseActionContext.Provider>
  );
};

export default FirebaseActionProvider;
