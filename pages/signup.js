import React, { useContext, useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { UserContext } from '../utilities/context/UserContext';

const signup = ({ user }) => {
  console.log(user);
  const { emailSignup } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  return (
    <Layout>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          emailSignup(email, password, username);
        }}>
        <input
          type='text'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <input
          type='text'
          name='username'
          onChange={(e) => setUsername(e.target.value)}
          value={username}
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

export default signup;
