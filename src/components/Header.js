import React, { useContext, useEffect, useState } from 'react'
import { AppBar, Typography, Toolbar, IconButton, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles';
import Config from '../Config'
import axios from 'axios'
import { TaxCalculationContext } from '../AppContext'

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
  const taxCalContext = useContext(TaxCalculationContext);
  const { currentScheme, setCurrentScheme } = taxCalContext;
  console.log(taxCalContext)
  const [schemes, setSchemes] = useState([]);
  const setCurrentSchemeById = schemeId => setCurrentScheme(schemes.find(scheme => scheme.id === schemeId))
  const handleSchemeChange = event => setCurrentSchemeById(event.target.value)

  useEffect(() => {
    axios.get(Config.getApiHost() + '/api/schemes').then(response => {
      setSchemes(response.data);
      console.log(schemes)
    })
  }, [])

  useEffect(() => {
    if(schemes!=undefined)
      setCurrentScheme(schemes.find(scheme => scheme.default))
  }, [schemes])

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
            value={currentScheme?currentScheme.id:''}
            onChange={handleSchemeChange} classes={selectClasses}> {
              schemes.map(scheme => (
                <MenuItem key={scheme.id} value={scheme.id}>{scheme.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  )
}
