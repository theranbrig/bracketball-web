import '../styles/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'rodal/lib/rodal.css';

import { useEffect, useState } from 'react';

import App from 'next/app';
import FirebaseActionContext from '../utilities/context/FirebaseActionContext';
import Head from 'next/head';
import UserContext from '../utilities/context/UserContext';
import cookies from 'next-cookies';
import fetch from 'isomorphic-unfetch';
import { server } from '../utilities/constants';

function MyApp({ Component, pageProps, user }) {
  return (
    <>
      <Head>
        <meta property='og:image' content='apple-touch-icon.png' />
        <meta property='twitter:image' content='apple-touch-icon.png'></meta>
        <link rel='icon' type='image/x-icon' href='favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='favicon-16x16.png' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='YZED: A unique AR experience'></meta>
        <meta charSet='utf-8' />
        <meta name='theme-color' content='#0D0D0D' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://bracketball.com' />
        <meta property='og:title' content='YZED: A unique AR experience' />
        <meta property='og:description' content='YZED: Check out unique 3D and AR fashion.' />
        <meta
          property='og:image'
          content='https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/yzed-email-logo.jpg'
        />
        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://yzed.me' />
        <meta property='twitter:title' content='YZED: A unique AR experience' />
        <meta
          property='twitter:image'
          content='https://oneoone-resource.s3.ap-northeast-2.amazonaws.com/yzed/yzed-email-logo.jpg'
        />
        <meta property='twitter:description' content='YZED: Check out unique 3D and AR fashion.' />
        <link rel='manifest' href='manifest.json' />
      </Head>
      <FirebaseActionContext>
        <UserContext>
          <Component {...pageProps} user={user} />
        </UserContext>
      </FirebaseActionContext>

      <noscript>
        <iframe
          src='noscript.html'
          frameBorder='0'
          style={{ height: '100%', width: '100%' }}></iframe>
        <noframes>
          You maybe have disabled JavaScript and Frames, please enable JavaScript or frames in You
          browser. More info: <br />
          <a href='http://tutorial.com/how-to-enable-js'>How to enable JavaScript</a> <br />
          <a href='http://tutorial.com/how-to-enable-frames'>How to enable frames</a>
        </noframes>
      </noscript>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  let error;
  const appProps = await App.getInitialProps(appContext);
  const { firebaseToken } = await cookies(ctx);
  if (firebaseToken) {
    try {
      const headers = {
        'Context-Type': 'application/json',
        Authorization: JSON.stringify({ token: firebaseToken }),
      };

      const result = await fetch(`${server}/api/validate`, { headers }).then((res) => res.json());
      return { ...result, ...appProps };
    } catch (e) {
      console.log(e);
    }
  }
  return { ...appProps };
};

export default MyApp;
