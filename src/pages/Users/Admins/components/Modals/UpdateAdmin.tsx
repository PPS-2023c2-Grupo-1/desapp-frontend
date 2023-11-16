import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast'
import { Alert, Modal } from '@components'
import {
  EmailField,
  FirstnameField,
  LastnameField,
  UpdateButton,
} from '@pages/Users/components'
import { useUpdateAdmin } from '@pages/Users/Admins/hooks'
import { AdminContext, ModalContext } from '../../context'
import { PasswordResetButton } from "../PasswordResetButton"
import styled from 'styled-components'

interface modalProps {
  clearSearchFilter: Function
}

export const UpdateAdminModal = ({ clearSearchFilter }: modalProps) => {
  const { isOpenUpdate } = useContext(ModalContext)
  const {
    email, handleEmail,
    firstname, handleFirstname,
    lastname, handleLastname,
    isFormUncompleted,
  } = useContext(AdminContext)

  const {
    handleClose,
    handleUpdate,
  } = useUpdateAdmin()

  const ContenedorBotones = styled.div`
  display: flex;
  justify-content: center;
  align-items: justify; 
  width: 100%;
  
`;
  


  return (
    <>
      <Toaster toastOptions={{ duration: 3000 }} />
      <Modal
      
        className='modalEditAdmin'
        onClose={handleClose}
        open={isOpenUpdate}
        title='Editar administrador'
        footer={
          <ContenedorBotones>
          <PasswordResetButton />
        <UpdateButton disabled={isFormUncompleted} onClick={() => { clearSearchFilter(); handleUpdate(); }} />
        </ContenedorBotones>
        }
      >
        <FirstnameField
          required
          error={!firstname}
          onChange={handleFirstname}
          value={firstname}
        />
        <LastnameField
          error={!lastname}
          onChange={handleLastname}
          value={lastname}
        />
        <EmailField
          error={!email.includes('@')}
          onChange={handleEmail}
          value={email}
        />
      
        <Alert severity='error' enable={isFormUncompleted}>Completa todos los campos</Alert>
      </Modal>
    </>
  )
}
