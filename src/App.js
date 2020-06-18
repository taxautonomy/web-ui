import React from 'react';
import TaxDiff from './components/TaxDiff/Main'
import TaxCal from './components/TaxCal/Main'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Config from './Config'
import { AppBar, Typography, Toolbar, IconButton } from '@material-ui/core';
import Summary from './components/TaxCal/Summary';
import MenuIcon from '@material-ui/icons/Menu'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors'
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const theme = createMuiTheme({
  palette:{
    //primary:blueGrey,
    //type:'dark'
  }
});

export default function App() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" >
            {Config.appTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Router>
  <Route exact path="/" component={Summary} />
          <Route exact path="/diff" component={TaxDiff} />
          <Route path="/cal" component={TaxCal} />
        </Router>
      </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
