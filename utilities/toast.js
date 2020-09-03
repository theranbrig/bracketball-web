import { toast } from 'react-toastify';
import ToastConfirmInvitation from '../components/ToastConfirmInvitation';

export const createErrorToast = (text) => {
  toast.error(text, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const createInvitationToast = (tournamentId, tournamentName, user, invitationId) => {
  toast.info(
    <ToastConfirmInvitation tournamentId={tournamentId} tournamentName={tournamentName} user={user} invitationId={invitationId}/>,
    {
      position: 'bottom-right',
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  );
};
