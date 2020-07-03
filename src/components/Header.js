import React, { useState, useContext } from 'react'
import { AppBar, Typography, Toolbar, IconButton, MenuItem, Avatar, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles';
import Config from '../Config'
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
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { signOut, googleUser } = useContext(TaxCalculationContext).googleLogin;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const AccountMenu = () => (
    <Menu onClose={handleClose}
      anchorEl={anchorEl} keepMounted
      open={Boolean(anchorEl)}>
      <MenuItem>Settings</MenuItem>
      <MenuItem onClick={() => { handleClose(); setShowLogoutDialog(true) }}>Sign Out</MenuItem>
    </Menu>);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => props.onClickMenu()}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" style={{ flexGrow: 1 }} >{Config.appTitle}</Typography>
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <Avatar className={classes.avatar} alt={googleUser.profileObj.name} src={googleUser.profileObj.imageUrl}></Avatar>
        </IconButton>
        <AccountMenu />
        <LogoutDialog open={showLogoutDialog}
          onSubmit={() => { signOut(); setShowLogoutDialog(false) }}
          onCancel={() => setShowLogoutDialog(false)} />
      </Toolbar>
    </AppBar>
  )
}
