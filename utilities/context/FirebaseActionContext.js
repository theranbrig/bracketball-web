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

  const createTournament = (name, type, players, date, owner) => {
    setLoading(true);
    dbh
      .collection('tournaments')
      .add({ name, type.value, players, date, owner, users: [owner] })
      .then(() => {
        console.log('TOURNAMENT CREATED');
        setLoading(false);
      })
      .catch((err) => {
        createErrorToast(err.message);
        setLoading(false);
      });
  };
  return (
    <FirebaseActionContext.Provider value={{ createTournament, firebaseLoading: loading }}>
      {children}
    </FirebaseActionContext.Provider>
  );
};

export default FirebaseActionProvider;
