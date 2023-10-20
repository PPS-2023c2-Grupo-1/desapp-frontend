import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  SmallModal,
} from '@components';
import { logout, setLogoutModal, selectLogoutModal } from '@store';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const LogoutModal = () => {
  const dispatch = useDispatch();
  const isLogoutModalOpen: boolean = selectLogoutModal();
  const closeModal = () => {
    dispatch(setLogoutModal(false));
  };

  const handleLogout = () => {
    dispatch(logout());
    location.reload();
  };

  return (
    <SmallModal
      className='modalDeleteJtp'
      onClose={closeModal}
      open={isLogoutModalOpen}
      title={`¿ Estás seguro de querer cerrar sesión ?`} 
      footer={
        <Button
          children='Sí, Cerrar'
          color='unahurRed'
          onClick={handleLogout}
          variant='contained'
          title='Eliminar'
        />
      }
    >
      <ErrorOutlineIcon style={{ fontSize: '78px' }} /> 
    </SmallModal>
  );
};
