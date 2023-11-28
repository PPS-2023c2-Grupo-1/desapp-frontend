import React, { useState } from 'react';
import logo from '@assets/LogoUnahur.svg';
import {
  SubmitButton,
  LoginContainer,
  LoginField,
  LoginLayout,
  Logo,
  Title,
} from './styles';
import { Alert } from '@components';
import { useLogin } from './hooks';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';


export const LoginPage = () => {
  const {
    email,
    handleEmail,
    password,
    handlePassword,
    keyUpPressLogin,
    tryAuthenticate,
    isThereCredentialError,
    isSubmitButtonIsEnabled,
  } = useLogin();


  const [isEmailValid, setIsEmailValid] = useState(true);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };




  return (
    <LoginLayout onKeyUp={keyUpPressLogin}>
      <LoginContainer>

        <Logo src={logo} alt="logo-unahur"  />
     
        <Title>Ingresá a tu cuenta</Title>
        <LoginField
          label="Email"
          value={email}
          variant="email"
          placeholder="Ingresá tu correo"
          onChange={handleEmail}
         
        
        />
        <LoginField
          label="Contraseña"
          value={password}
          variant="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Ingresá tu contraseña"
          onChange={handlePassword}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Alert
          enable={isThereCredentialError}
          severity="error"
          text="Email o contraseña incorrectos"
        />
        <SubmitButton
          disabled={!isSubmitButtonIsEnabled}
          color="unahurGreen"
          onClick={tryAuthenticate}
          variant="contained"
          text="Ingresar"
        />
      </LoginContainer>
    </LoginLayout>
  );
};
