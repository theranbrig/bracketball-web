import React, { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { UserContext } from '../utilities/context/UserContext';

const login = ({ user }) => {
  console.log(user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { emailLogin } = useContext(UserContext);
  return (
    <Layout user={user}>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          emailLogin(email, password);
        }}>
        <input
          type='text'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type='submit'>Send</button>
      </form>
    </Layout>
  );
};

export default login;
