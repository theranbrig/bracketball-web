import React, { useEffect, useState } from 'react';

import cookie from 'js-cookie';
import firebase from '../firebaseSetup';
import { toast } from 'react-toastify';
import { tokenName } from '../constants';
import { createErrorToast } from '../errorFunctions';

export const FirebaseActionContext = React.createContext();

const dbh = firebase.firestore();

const FirebaseActionProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [myTournaments, setMyTournaments] = useState([]);

  const createTournament = (name, type, players, date, owner) => {
    setLoading(true);
    dbh
      .collection('tournaments')
      .add({ name, type, players, date, owner, users: [owner] })
      .then(() => {
        console.log('TOURNAMENT CREATED');
        setLoading(false);
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
      .where('users', 'array-contains', user)
      .onSnapshot((querySnapshot) => {
        let tournaments = [];
        querySnapshot.docs.forEach((doc) => {
          console.log(doc.id);
          tournaments.push({ id: doc.id, ...doc.data() });
        });
        setMyTournaments(tournaments);
        setLoading(false);
      });
  };

  return (
    <FirebaseActionContext.Provider
      value={{ createTournament, firebaseLoading: loading, getTournaments, myTournaments }}>
      {children}
    </FirebaseActionContext.Provider>
  );
};

export default FirebaseActionProvider;
