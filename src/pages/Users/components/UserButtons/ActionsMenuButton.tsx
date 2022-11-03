import React, { MouseEventHandler, useState } from "react"
import { Button, DeleteOutlined, EditOutlined, MoreVert } from "@components"
import { Menu, MenuItem } from "@mui/material"

interface actionsButtonMenuProps {
  handleUpdate?: MouseEventHandler<HTMLLIElement>,
  handleDelete?: MouseEventHandler<HTMLLIElement>,
  handleView?: MouseEventHandler<HTMLLIElement>,
}


export const ActionsMenuButton = ({
  handleUpdate,
  handleDelete,
  handleView,
}: actionsButtonMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }

  const openDelete = (event: React.MouseEvent<HTMLLIElement>) => {
    if(handleDelete) handleDelete(event)
    console.log(event)
    setAnchorEl(null)
  }

  const openUpdate = (event: React.MouseEvent<HTMLLIElement>) => {
    if(handleUpdate) handleUpdate(event)
    console.log(event)
    setAnchorEl(null)
  }

  const openView = (event: React.MouseEvent<HTMLLIElement>) => {
    if(handleView) handleView(event)
    setAnchorEl(null)
  }

  return (
    <>
    <Button
      children={<MoreVert/>}
      color='unahurBlack'
      onClick={handleClick}
      sx={{
        borderRadius: '50px',
        minHeight: 'fit-content',
        minWidth: 'fit-content',
        padding: '8px'
      }}
      title='Ver acciones'
      aria-controls={open ? 'resources-menu' : undefined}
      aria-haspopup='true'
      aria-expanded={open ? 'true' : undefined}
    />
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical:'top', horizontal:'right' }}
    >

      { handleUpdate && <MenuItem onClick={openUpdate} key='update'><EditOutlined sx={{margin: '8px'}} /> Editar</MenuItem> }
      { handleDelete && <MenuItem onClick={openDelete} key='delete'><DeleteOutlined sx={{margin: '8px'}}/> Eliminar</MenuItem> }
      { handleView && <MenuItem onClick={openView} key='more'><MoreVert sx={{margin: '8px'}}/> Ver más</MenuItem> }
    </Menu>
  </>
  )
}