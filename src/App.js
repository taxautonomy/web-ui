import React, { Component } from 'react';
import TaxForm from './components/TaxForm'

import './App.css';
import TaxTable from './components/TaxTable';
import TaxInfo from './components/TaxInfo';
import axios from 'axios';
import Config from './Config'
import TaxDifference from './TaxDifference';

class App extends Component {
  baseUrl = new Config().getApiHost();
  state = {
    schemes: {}
  }

  componentDidMount() {
    axios.get(this.baseUrl + '/api/paye/schemes')
      .then(res => this.setState({ schemes: res.data }, this.setDefaultScheme()))

  }

  setDefaultScheme() {
    this.setState({ selectedScheme1: this.state.schemes[0], selectedScheme2: this.state.schemes[1] });
  }

  taxFormInputChanged = (schemes, salary) => {

    if (schemes.length > 0) {
      axios.get(this.baseUrl + '/api/paye/schemes/' + schemes[0] + '/' + salary)
        .then(res => this.setState({ taxInfo1: res.data }));
      axios.get(this.baseUrl + '/api/paye/schemes/' + schemes[1] + '/' + salary)
        .then(res => this.setState({ taxInfo2: res.data }));
    }
  };


  render() {
    const { schemes, scheme1, scheme2 } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h1>Welcome to TaxAutonomy</h1>
        </div>
        <div className="table">
          <div className="tableRow">
            <div className="tableCell">
              <TaxForm schemes={schemes} scheme1={scheme1} scheme2={scheme2} onSubmit={this.taxFormInputChanged} />
            </div>
          </div>
          <div className="tableRow">
                <div className="tableCell leftAlign cellWithBorderBottom"> Tax Scheme </div>
                <div className="tableCell rightAlign cellWithBorderBottom"> Total Tax </div>
            </div>
          <TaxInfo taxInfo={this.state.taxInfo1} />
          <TaxInfo taxInfo={this.state.taxInfo2} />
          <div className="tableRow">
            <TaxDifference taxInfo1={this.state.taxInfo1} taxInfo2={this.state.taxInfo2} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
