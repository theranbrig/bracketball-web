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
        dbh.collection('tournaments').doc(tournamentId).update({members: firebase.firestore.FieldValue.arrayUnion(user.uid)}).then(() => {
          userDetailRef.set({ id: user.uid, username: user.username, role: 'USER' }).then(() => {
            router.push('/');
            setLoading(false);
          });
        })
      } else {
        createErrorToast('You are already a member of this pool.');
      }
    });
  };

  const sendPoolInvitation = (email, tournamentId) => {
    let user = null;
    dbh.collection('users').where('email', '==', email).get().then(querySnapshot => {querySnapshot.forEach(doc => console.log(query))})

  }

  return (
    <FirebaseActionContext.Provider
      value={{
        createTournament,
        firebaseLoading: loading,
        getTournaments,
        myTournaments,
        joinTournament,
        dbh,
      }}>
      {children}
    </FirebaseActionContext.Provider>
  );
};

export default FirebaseActionProvider;
