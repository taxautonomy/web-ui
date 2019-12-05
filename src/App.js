import React, { Component } from 'react';
import TaxForm from './components/TaxForm'

import './App.css';
import TaxTable from './components/TaxTable';
import axios from 'axios';
import Config from './Config'

class App extends Component {
  baseUrl = new Config().getApiHost();
  state = {
    schemes: {},
    selectedScheme: "",
    salary: null,
    taxInfo: null
  }

  componentDidMount() {
    axios.get(this.baseUrl + '/api/paye/schemes')
    .then(res => this.setState({ schemes: res.data }, this.setDefaultScheme() ))
    
   }

   setDefaultScheme(){
      this.setState({selectedScheme:this.state.schemes[0]});
   }
  taxFormInputChanged = (scheme, salary) => {
    axios.get(this.baseUrl + '/api/paye/schemes/' + scheme + '/' + salary)
      .then(res => this.setState({ taxInfo: res.data }))
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome to TaxAutonomy</h1>
        </div>
        <div>
          <TaxForm schemes={this.state.schemes} selectedScheme={this.state.selectedScheme} inputChanged={this.taxFormInputChanged} />
          {this.state.taxInfo !== null &&
            <TaxTable taxInfo={this.state.taxInfo} />
          }
        </div>
      </div>
    );
  }
}

export default App;
