import React, { Component } from 'react';
import TaxDiff from './components/TaxDiff/Main'
import TaxCal from './components/TaxCal/Main'
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Config from './Config'
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import Summary from './components/TaxCal/Summary';

class App extends Component {
  baseUrl = new Config().getApiHost();
  state = {
    schemes: {}
  }

  componentDidMount() {

  }


  render() {
    return (
        <React.Fragment>
        <CssBaseline />
          <AppBar position="static">
          <Toolbar>
          <Typography variant="h3" >
            TaxAutonomy
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
        </React.Fragment>
    );
  }
}

export default App;
