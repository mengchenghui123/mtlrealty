import React from 'react'
import {Avatar, Menu} from '@mantine/core'

export const ProfileMenu = ({user, logout}) => {
  return (
    <Menu>
        <Menu.Target>
            <Avatar 
            src={user?.picture} 
            alt='user image' 
            size="lg"
            radius = {"xs"}
            sx={{ width: '50px !important', height: '50px !important', borderRadius: '50% !important', border: '2px solid #000 !important' }}            />
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Item>
                Favourites
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
  )
}

export default ProfileMenu
