import React, { useEffect, useState } from 'react';

import cookie from 'js-cookie';
import firebase from '../firebaseSetup';
import { tokenName } from '../constants';

export const UserContext = React.createContext();

const dbh = firebase.firestore();

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const emailSignup = async (email, password, username) => {
    setLoading(true);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (user) => {
        if (user) {
          console.log(user);
          const userID = user.user.uid;
          const emailVerified = user.user.emailVerified;
          dbh
            .collection('users')
            .doc(userID)
            .set({ email, username })
            .then(() => setLoading(false))
            .catch((err) => setError(err));
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const emailLogin = async (email, password, redirectPath) => {
    setLoading(true);
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('USER SIGNED IN');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const onAuthStateChange = () => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        cookie.set(tokenName, token, { expires: 14 });
      } else {
        cookie.remove(tokenName);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ userLoading: loading, emailSignup, emailLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
