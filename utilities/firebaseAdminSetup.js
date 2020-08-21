import * as admin from 'firebase-admin';

export const firebaseAdmin = admin.initializeApp(
  {
    credential: admin.credential.cert({
      type: process.env.FIREBASE_type,
      project_id: process.env.FIREBASE_project_id,
      private_key: process.env.FIREBASE_private_key,
      client_email: process.env.FIREBASE_client_email,
      client_id: process.env.FIREBASE_client_id,
      auth_uri: process.env.FIREBASE_auth_uri,
      token_uri: process.env.FIREBASE_token_uri,
      auth_provider_x509_cert_url: process.env.FIREBASE_auth_provider_x509_cert_url,
      client_provider_x509_cert_url: process.env.FIREBASE_client_provider_x509_cert_url,
    }),
    databaseURL: 'https://yzed-88819.firebaseio.com',
  },
  `${Math.random().toString()}`
);
