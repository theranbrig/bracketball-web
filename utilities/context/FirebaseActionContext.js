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

  const createTournament = (name, type, players, date, creator) => {
    dbh
      .collection('tournaments')
      .set({ name, type, players, date, creator })
      .then(() => {
        console.log('TOURNAMENT CREATED');
      })
      .catch((err) => {
        createErrorToast(err.message);
      });
  };
  return <FirebaseActionContext.Provider value={{createTournament, firebaseLoading}}>{children}</FirebaseActionContext.Provider>;
};

export default FirebaseActionProvider;
