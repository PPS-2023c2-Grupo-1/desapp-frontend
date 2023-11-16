import { devices } from '@src/util/breakpoints';
import styled from 'styled-components'
import { ModalDialogProps } from './props'

export const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 1300;
`

export const ModalDialog = styled.div<ModalDialogProps>`
  align-items: center;
  background-color: #00000077;
  border: 0;
  display: ${({open}) => open ? 'flex' : 'none'};
  justify-content: center;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  trasitions: 0.5s linear;
  width: 100%;
  z-index: 1300;

`;

export const FullscreenModalContainer = styled.div`
  background-color: var(--unahurWhite);
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  padding: 0 40px;
  width: 100%;
  z-index: 1301;
`

export const ModalContainer = styled(FullscreenModalContainer)`
  align-items: align-items;
  justify-content: space-evenly;
  padding: 24px;
  
  ${devices.tablet} {
    justify-content: space-between;
    border-radius: 20px;
    max-height: 90vh;
    padding: 40px;
    height: auto;
    text-align: left;
    width: fit-content;
  }
`

export const SmallModalContainer = styled(FullscreenModalContainer)`
  align-items: center;
  border-radius: 20px;
  justify-content: center;
  padding: 80px 80px 40px 80px;
  height: 400px;
  width: 800px;
`

export const SmallModalContent = styled.div`
  align-itemns: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  overflow: auto;
`

export const ModalContent = styled.div`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px 0;
  max-width: 1200px;
`

export const ModalFooter = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  justify-content: center;
  padding: 16px 0;
  width: 100%;
`

export const ModalHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
`