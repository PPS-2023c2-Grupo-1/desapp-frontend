import {
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
} from "@mui/material"
import React from "react"
import styled from 'styled-components'




export const StyledAlert = styled(MuiAlert)`
  align-items: center;
  border-radius: 10px;
  justify-content: center;
`

interface alertProps extends MuiAlertProps {
  text?: string,
  enable?: boolean,
}

export const Alert = ({
  text,
  children,
  enable,
  ...props
}: alertProps) => {
  return enable
    ? (
      <StyledAlert {...props}>
        
        { children || text }
      </StyledAlert>
    ) : <></>
}
