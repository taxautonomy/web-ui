import React, { useState, Fragment, useContext, useEffect } from 'react'
import { AppBar, Typography, Toolbar, IconButton, MenuItem, Avatar, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles';
import Config from '../Config'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useGoogleLogin } from 'react-use-googlelogin'
import LoginDialog from './LoginDialog';
import { TaxCalculationContext } from '../AppContext'
import LogoutDialog from './LogoutDialog';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  schemeSelect: {
    color: '#dddddd',
    fontWeight: 700
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}));


export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { signOut, googleUser, isSignedIn } = useContext(TaxCalculationContext).googleLogin;

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => props.onClickMenu()}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" style={{ flexGrow: 1 }} >{Config.appTitle}</Typography>
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          {isSignedIn ? (
            <Avatar className={classes.avatar} alt={googleUser.profileObj.name} src={googleUser.profileObj.imageUrl}></Avatar>
          ):(
          <AccountCircle />
          )}
        </IconButton>
        <Menu
          anchorEl={anchorEl} keepMounted
          open={Boolean(anchorEl)}>
          {isSignedIn && (
            <MenuItem>Settings</MenuItem>
          )}
          {isSignedIn ? (
            <MenuItem onClick={() => { handleClose(); setShowLogoutDialog(true) }}>Log Out</MenuItem>
          ):(
            <MenuItem onClick={() => { handleClose(); setShowLoginDialog(true) }}>Log in</MenuItem>
          )}
        </Menu>
        <LoginDialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
        <LogoutDialog open={showLogoutDialog} onSubmit={()=> {signOut(); setShowLogoutDialog(false)}} onClose={() => setShowLogoutDialog(false)} />
      </Toolbar>
    </AppBar>
  )
}
