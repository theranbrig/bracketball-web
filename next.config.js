const withImages = require('next-images');

module.exports = withImages({
  env: {
    // Prod Firebase
    apiKey: 'AIzaSyAYiNWn_X3jRoUx7ZHQMKbrRiqZ4VdVGZ0',
    authDomain: 'yzed-88819.firebaseapp.com',
    databaseURL: 'https://yzed-88819.firebaseio.com',
    projectId: 'yzed-88819',
    storageBucket: 'yzed-88819.appspot.com',
    messagingSenderId: '132184777145',
    appId: '1:132184777145:web:b78abdf732a15aea711668',
    measurementId: 'G-E3SK8D4LDM',
  },
});
