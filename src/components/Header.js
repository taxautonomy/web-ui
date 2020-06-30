import React, { useState, Fragment } from 'react'
import { AppBar, Typography, Toolbar, IconButton, MenuItem, Avatar, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles';
import Config from '../Config'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useGoogleLogin } from 'react-use-googlelogin'

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
  const { signIn, signOut, googleUser, isSignedIn } = useGoogleLogin({
    clientId: Config.googleClientId,
  })

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
          {isSignedIn ? (<Avatar className={classes.avatar} alt={googleUser.profileObj.name} src={googleUser.profileObj.imageUrl}></Avatar>) : (<AccountCircle />)}
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted
          open={Boolean(anchorEl)}>
          {isSignedIn ? (
            <Fragment>
            <MenuItem>Settings</MenuItem>
            <MenuItem onClick={() => { handleClose(); signOut() }}>Log Out</MenuItem>
            </Fragment>
          ) : (
              <MenuItem onClick={() => { handleClose(); signIn() }}>Log in with Google</MenuItem>
            )}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
