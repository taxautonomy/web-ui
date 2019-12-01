import React, { Component } from 'react';
import TaxForm from './components/TaxForm'

import './App.css';
import TaxTable from './components/TaxTable';
import axios from 'axios';
import Config from './Config'

class App extends Component {
  baseUrl = new Config().getApiHost();
  state = {
    schemes: ["2018-2019",
      "2019-2020"],
    selectedScheme: "",
    salary: null,
    taxInfo: null
  }

  componentDidMount() {
   }

  taxFormInputChanged = (scheme, salary) => {
    axios.get(this.baseUrl + '/api/paye/' + scheme + '/' + salary)
      .then(res => this.setState({ taxInfo: res.data }))
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <div>
          <TaxForm schemes={this.state.schemes} inputChanged={this.taxFormInputChanged} />
          {this.state.taxInfo !== null &&
            <TaxTable taxInfo={this.state.taxInfo} />
          }
        </div>
      </div>
    );
  }
}

export default App;
