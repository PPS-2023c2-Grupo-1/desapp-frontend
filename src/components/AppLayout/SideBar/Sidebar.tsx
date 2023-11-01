import React from 'react'
import { isologo, logo } from '@assets'
import { Link } from 'react-router-dom'; // Importa Link desde React Router
import { selectSidebar } from '@store'
import { SidebarContainer } from './styles'
import { Navigation } from './Navigation'
import { ToggleSidebar } from './ToggleSidebar'
import { LogoutButton } from './LogoutButton'
import { CrossButton } from './Cross'

const Isologo = () => (
  <Link to="/overview"> {/* Agrega el enlace a la página principal "overview" */}
    <img style={{ height: '32px', marginBottom: '40px' }} src={isologo} alt="unahur" />
  </Link>
);



const Logo = () => (
  <Link to="/overview"> {/* Agrega el enlace a la página principal "overview" */}
    <img style={{ height: '32px', marginBottom: '40px' }} src={logo} alt="unahur" />
  </Link>
);
export const Sidebar = () => {
  const isSidebarOpen: boolean = selectSidebar()
  
  return (
    <SidebarContainer>
      <CrossButton />
      <ToggleSidebar />
      { isSidebarOpen ? <Isologo /> : <Logo /> }
      <Navigation />
      <LogoutButton />
    </SidebarContainer>
  )
}