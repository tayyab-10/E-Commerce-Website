import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Dashboard, ExitToAppRounded, ListAltRounded, Person2Rounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { LogoutUser } from '../../Actions/UserAction';
import { useDispatch } from 'react-redux';

const Useroptions=({user})=> {

    const navigate=useNavigate();
    const alert=useAlert();
    const dispatch=useDispatch();

    const options = [
      { icon: <ListAltRounded />, name: 'Orders',func:orders },
      { icon: <Person2Rounded />, name: 'Profile' ,func:profile},
      { icon: <ExitToAppRounded />, name: 'Logout' ,func:logout},
    ];


   if (user && user.role === "admin") {
        options.unshift({
            icon: <Dashboard />,
            name: "Dashboard",
            func: dashboard
        });
    }

   function dashboard(){
    navigate("/dashboard")
   }

   function orders(){
    navigate("/orders")
   }

   function profile(){
    navigate("/profile")
   }
   
   function logout(){
    dispatch(LogoutUser());
    alert.success("Logout Successfully")
    navigate("/login")
   }

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={
            user.avatar && user.avatar.url ? <img src={user.avatar.url} alt="User Avatar" /> : <SpeedDialIcon />       
        }
      >
        {options.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default Useroptions;