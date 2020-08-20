import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import firebase from './utilities/firebaseSetup';

Enzyme.configure({ adapter: new Adapter() });

require('@testing-library/jest-dom');

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Firebase Client

jest.mock('firebase/app', () => ({
  __esModule: true,
  default: {
    initializeApp: jest.fn(),
    apps: [],
    auth: jest.fn(() => ({
      setPersistence: jest.fn(),
      signInWithEmailAndPassword: jest.fn(() => ({
        user: {
          getIdToken: jest.fn(() => '1'),
        },
      })),
      signOut: jest.fn(),
      FacebookAuthProvider: class {
        addScope = jest.fn();
      },
    })),
    messaging: jest.fn(() => ({
      hasPermission: jest.fn(() => Promise.resolve(true)),
      subscribeToTopic: jest.fn(),
      unsubscribeFromTopic: jest.fn(),
      requestPermission: jest.fn(() => Promise.resolve(true)),
      getToken: jest.fn(() => Promise.resolve('myMockToken')),
    })),
    notifications: jest.fn(() => ({
      onNotification: jest.fn(),
      onNotificationDisplayed: jest.fn(),
    })),
    analytics: jest.fn(() => ({
      logEvent: jest.fn(),
      setUserProperties: jest.fn(),
      setUserId: jest.fn(),
      setCurrentScreen: jest.fn(),
    })),
    firestore: jest.fn(),
  },
}));

firebase.auth.FacebookAuthProvider = class {
  addScope = jest.fn();
};
firebase.auth.GoogleAuthProvider = class {
  addScope = jest.fn();
};
