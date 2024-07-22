import React from 'react'
import {Avatar, Menu} from '@mantine/core';
import { useNavigate } from 'react-router-dom'


export const ProfileMenu = ({user, logout}) => {
  const navigate = useNavigate();
  return (
    <Menu>
        <Menu.Target>
          <div role="button" aria-haspopup="menu" aria-expanded="false">
          <Avatar src={user?.picture} alt='user image' radius={"lg"}/>
          </div>
        </Menu.Target>
        
        <Menu.Dropdown role="menu">
            <Menu.Item role="menuitem">
                Favourites
            </Menu.Item>

            <Menu.Item role="menuitem">
                Bookings
            </Menu.Item>

            <Menu.Item role="menuitem" onClick={()=>{
              localStorage.clear();
              logout()
            }}>
                Logout
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
  )
  
}
export default ProfileMenu
