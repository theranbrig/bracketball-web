import React, { useEffect, useContext, useState } from 'react';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';

const InviteUser = ({ tournament }) => {
  const [inviteEmail, setInviteEmail] = useState('');

  const { sendPoolInvitation } = useContext(FirebaseActionContext);

  return (
    <div className='text-center'>
      <h3 className='text-2xl text-prussian'>Add Members</h3>
      <form
        className='w-11/12 lg:w-1/2 mx-auto'
        onSubmit={(e) => {
          e.preventDefault();
          sendPoolInvitation(inviteEmail, tournament.id, tournament.name);
        }}>
        <label className='input-form-label'>Email Address</label>
        <input
          id='email'
          name='email'
          type='email'
          className='input-form'
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
          required
        />
        <button
          disabled={!inviteEmail}
          className='w-button bg-powder block rounded-lg border-2 border-celadon text-prussian py-1 mx-auto'
          type='submit'>
          Send Invite
        </button>
        {/* TODO: Create loading and success */}
      </form>
    </div>
  );
};

export default InviteUser;
