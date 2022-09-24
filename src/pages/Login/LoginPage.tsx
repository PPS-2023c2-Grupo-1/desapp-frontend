import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import logo from '@assets/LogoUnahur.svg'
import { requestLogin } from '@store/auth'
import {
  Error,
  LoginConfirmButton,
  LoginContainer,
  LoginField,
  LoginLayout,
  LoginLogo,
  LoginTitle,
} from './styles'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disableConfirm, setDisableConfirm] = useState(false)
  const [credentialError, setCredentialError] = useState(false)

  useEffect(
    () => { setDisableConfirm(email == '' || password == '') },
    [email, password]
  )

  const emailListener = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(event.currentTarget.value)
  const passwordListener = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(event.currentTarget.value)
  const handleLogin = () => {
    dispatch(requestLogin({ email, password }))
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
    setEmail('')
    setPassword('')
    setCredentialError(true)
  }

  return (
    <LoginLayout onKeyUp={(e) => { if (!disableConfirm && e.key == 'Enter') handleLogin()}} >
      <LoginContainer>
        <LoginLogo src={logo} alt="logo-unahur"/>
        <LoginTitle>Ingresá a tu cuenta</LoginTitle>
        <LoginField
          label='Email'
          value={email}
          variant='email'
          placeholder='Ingresá tu correo'
          onChange={emailListener}
          />
        <LoginField
          label='Contraseña'
          value={password}
          variant='password'
          placeholder='Ingresá tu contraseña'
          onChange={passwordListener}
          />
          { credentialError && <Error>Email o contraseña incorrectos</Error> }
        <LoginConfirmButton
          disabled={disableConfirm}
          color='unahurGreen'
          onClick={handleLogin}
          variant='contained'
          text='Ingresar'
        />
      </LoginContainer>
    </LoginLayout>
  )
}