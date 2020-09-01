import React, { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import Link from 'next/link';
import { UserContext } from '../utilities/context/UserContext';
import FormTitle from '../components/FormTitle';

const signup = ({ user }) => {
  console.log(user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { emailSignup } = useContext(UserContext);
  return (
    <Layout user={user}>
      <div className='h-desktopFullBody flex flex-col justify-center items-center'>
        <div className='w-1/3 flex flex-col justify-center items-center mx-auto'>
          <FormTitle title='Create Account' />
          <form
            className='w-full'
            onSubmit={(e) => {
              e.preventDefault();
              emailSignup(email, password, username);
            }}>
            <label className='font-title text-prussian mb-2 text-lg'>Email Address</label>
            <input
              className='input-form'
              id='email'
              type='text'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label className='font-title text-prussian mb-2 text-lg'>Username</label>
            <input
              className='input-form'
              id='username'
              type='text'
              name='username'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <label className='font-title text-prussian mb-2 text-lg'>Password</label>
            <input
              className='input-form'
              id='password'
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <label className='font-title text-prussian mb-2 text-lg'>Confirm Password</label>
            <input
              className='input-form'
              id='confirm password'
              type='password'
              name='confirm password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
            <button type='submit'>Send</button>
          </form>
          <Link href='/login'>
            <a>Already a member?</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default signup;
