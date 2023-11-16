import React from 'react'
import { AddOutlined, Button, ButtonProps, CheckOutlined } from '@components'

export const DeleteButton = (props: ButtonProps) => (
  <Button
    color='unahurRed'
    title='Eliminar'
    text='Eliminar'
    variant='contained'
    {...props}
  />
)

export const UpdateButton = (props: ButtonProps) => (
  <Button
 style={{ width: '100%' }} 
    color='unahurGreen'
    startIcon={<CheckOutlined />}
    text='Confirmar'
    title='Editar JTP'
    variant='contained'
    {...props}
  />
)

export const OpenCreateButton = (props: ButtonProps) => (
  <Button
    color='unahurGreen'
    startIcon={<AddOutlined />}
    variant='contained'
    text='Agregar'
    title='Agregar'
    {...props}
  />
)

export const CreateButton = (props: ButtonProps) => (
  <Button
    color='unahurGreen'
    startIcon={<CheckOutlined />}
    text='Confirmar'
    title='Confirmar'
    variant='contained'
    {...props}
  />
)