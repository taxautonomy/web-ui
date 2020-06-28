import React, { useContext, useEffect, useState } from 'react'
import { AppBar, Typography, Toolbar, IconButton, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles';
import Config from '../Config'
import axios from 'axios'
import { TaxCalculationContext } from '../AppContext'
import { GoogleLogin, GoogleLogout } from 'react-google-login';


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
  }
}));

const getSelectClasses = makeStyles((theme) => ({
  root: {
    color: '#dddddd',
    fontWeight: 700

  },
  icon: {
    color: '#dddddd'
  }
}));



export default function Header() {
  const classes = useStyles();
  const selectClasses = getSelectClasses();
  const { currentScheme, setCurrentScheme, user, setUser } = useContext(TaxCalculationContext);
  const [schemes, setSchemes] = useState([]);
  const setCurrentSchemeById = schemeId => setCurrentScheme(schemes.find(scheme => scheme.id === schemeId))
  const handleSchemeChange = event => setCurrentSchemeById(event.target.value)

  useEffect(() => {
    axios.get(Config.getApiHost() + '/api/schemes').then(res => {
      setSchemes(res.data);
    })
  }, [])

  useEffect(() => {
    if (schemes !== undefined)
      setCurrentScheme(schemes.find(scheme => scheme.default))
  }, [schemes])

  const handleLogIn = (response) => {
    console.log(response);
    console.log('logged in', response.Qt.Au)
    setUser(response)
  }

  const handleLogInFailure = (response) => {
    console.log(response);
    setUser(null)
  }

  const handleLogOut = (response) => {
    console.log('logging out', response);
    setUser(null);
  }

  const LoginButton = (props) => {
    if (user)
      return (
        <React.Fragment>
          {user.Qt.Au}&nbsp;&nbsp;
          <GoogleLogout
            clientId={Config.googleClientId}
            buttonText="log out"
            icon={false}
            onLogoutSuccess={handleLogOut}
          />
        </React.Fragment>
      )
    else
      return (
        <GoogleLogin
          clientId={Config.googleClientId}
          buttonText="log in"
          isSignedIn={true}
          onSuccess={handleLogIn}
          onFailure={handleLogInFailure}
          cookiePolicy={'single_host_origin'}
        />
      )
  }
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" style={{ flexGrow: 1 }} >{Config.appTitle}</Typography>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.schemeSelect} id="demo-simple-select-label">Tax Scheme: </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentScheme ? currentScheme.id : ''}
            onChange={handleSchemeChange} classes={selectClasses}> {
              schemes.map(scheme => (
                <MenuItem key={scheme.id} value={scheme.id}>{scheme.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <LoginButton />
      </Toolbar>
    </AppBar>
  )
}
