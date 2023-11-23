import React from 'react'
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom'
import { useAuth } from '@src/hooks/useAuth'
import { routes } from './routes'
import { selectRole } from '@src/store'

const LoginRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route {...routes.login}/>
      <Route {...routes.passwordReset}/>
      <Route path='/*' element={<Navigate to='/login' />} />
    </Routes>
  </BrowserRouter>
)

const AppRoutes = () => {
  const role = selectRole().toLocaleLowerCase()

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Navigate to='/overview' />} />
        <Route path='/' element={<Navigate to='/overview' />} />
        <Route {...routes.account} />
        <Route {...routes.home} />
        <Route {...routes.overview} />
        <Route {...routes.assignments.list} />
        <Route {...routes.assignments.stats} />
        <Route {...routes.assignments.evaluations} />
        <Route {...routes.passwordReset}/>
        {
          role === 'admin' &&
          <>
            <Route {...routes.users.admins} />
            <Route {...routes.users.jtps} />
            <Route {...routes.users.students} />
          </>
        }
      </Routes>
    </BrowserRouter>
  )
}

export const Router = () => {
  const isLogged = useAuth()

  return isLogged
    ? <AppRoutes />
    : <LoginRoutes />
}
