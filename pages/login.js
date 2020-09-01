import React, { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Link from 'next/link';
import LoadingModal from '../components/LoadingModal';
import { UserContext } from '../utilities/context/UserContext';
import FormTitle from '../components/FormTitle';

const login = ({ user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { emailLogin, userLoading, userError } = useContext(UserContext);
  return (
    <>
      <Layout user={user}>
        <div className='h-desktopFullBody flex flex-col justify-center items-center'>
          <div className='w-1/3 flex flex-col justify-center items-center mx-auto'>
            <FormTitle title='Login' />
            <form
              className='w-full'
              onSubmit={(e) => {
                e.preventDefault();
                emailLogin(email, password);
              }}>
              <label className='input-form-label'>Email Address</label>
              <input
                className='input-form'
                id='email'
                type='text'
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <label className='input-form-label'>Password</label>
              <input
                className='input-form'
                id='password'
                type='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button
                disabled={!email.length || !password.length}
                className='form-button'
                type='submit'>
                {userLoading ? 'Sending' : 'Send'}
              </button>
            </form>
            <Link href='/signup'>
              <a>Not yet a member?</a>
            </Link>
          </div>
        </div>
      </Layout>

      {userLoading ? <LoadingModal /> : null}
    </>
  );
};

export default login;
