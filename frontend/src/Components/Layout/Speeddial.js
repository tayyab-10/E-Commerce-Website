import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Dashboard, ExitToAppRounded, ListAltRounded, Person2Rounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { LogoutUser } from '../../Actions/UserAction';
import { useDispatch } from 'react-redux';
import { Backdrop } from '@mui/material';

export default function UserOptions({ user }) {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  
  const options = [
    { icon: <ListAltRounded />, name: 'Orders', func: orders },
    { icon: <Person2Rounded />, name: 'Profile', func: profile },
    { icon: <ExitToAppRounded />, name: 'Logout', func: logout },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function profile() {
    navigate("/account");
  }

  function logout() {
    dispatch(LogoutUser());
    alert.success("Logout Successfully");
  }

  return (
    <>
      <Backdrop 
        open={open} 
        sx={{ 
          zIndex: 10, 
          color: '#fff', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)' // Adjust backdrop color and opacity
        }}
      />
      <SpeedDial
        ariaLabel="User SpeedDial"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        sx={{ 
          position: 'fixed', 
          top: '3vmax', 
          right: '3vmax', 
          zIndex: 11,
        }}
        direction="down"
        open={open}
        icon={
          user.avatar && user.avatar.url ? 
            <img 
              src={user.avatar.url} 
              alt="User Avatar" 
              style={{ width: '100%', height: '100%', borderRadius: '50%' }} 
            /> 
            : <SpeedDialIcon />
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
    </>
  );
}
