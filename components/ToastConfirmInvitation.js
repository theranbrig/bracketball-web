import React, { useEffect, useContext, useState } from 'react';
import { FirebaseActionContext } from '../utilities/context/FirebaseActionContext';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const ToastConfirmInvitation = ({ tournamentId, tournamentName, user, invitationId }) => {
  const { joinTournament, removeInvitation } = useContext(FirebaseActionContext);
  return (
    <div>
      <p>You have an invitation to "{tournamentName}". Join now?</p>
      <button
        className='bg-white text-celadon border border-white rounded sm px-2 py-1 mt-2 flex justify-between items-center w-toastButton mx-auto'
        onClick={() => {
          joinTournament(user, tournamentId);
        }}>
        Yes
        <AiOutlineCheckCircle size='1.2rem' />
      </button>
      <button
        className='bg-white text-celadon border border-white rounded sm px-2 py-1 mt-2 flex justify-between items-center w-toastButton mx-auto'
        onClick={() => {
          removeInvitation(invitationId);
        }}>
        No
        <AiOutlineCloseCircle size='1.2rem' />
      </button>
    </div>
  );
};

export default ToastConfirmInvitation;
