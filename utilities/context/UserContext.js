import React, { useEffect, useState } from 'react';

import cookie from 'js-cookie';
import firebase from '../firebaseSetup';
import { tokenName } from '../constants';
import { toast } from 'react-toastify';

export const UserContext = React.createContext();

const dbh = firebase.firestore();

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createErrorToast = (text) => {
    toast(text, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'rounded-lg',
      style: {
        borderRadius: '10px',
      },
    });
  };
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
        createErrorToast(err.message);
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
        createErrorToast(err.message);
        setLoading(false);
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
