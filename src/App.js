import React, { Component } from 'react';
import TaxDiff from './components/TaxDiff/Main'
import TaxCal from './components/TaxCal/Main'
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import './App.css';
import Config from './Config'

class App extends Component {
  baseUrl = new Config().getApiHost();
  state = {
    schemes: {}
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Container maxWidth="lg">
          <div className="App-header">
            <h1>Welcome to TaxAutonomy</h1>
          </div>
          <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/diff" component={TaxDiff} />
            <Route path="/cal" component={TaxCal} />
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;
