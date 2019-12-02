import React, { Component } from 'react';
import '../App.css';

class TaxForm extends Component {

  state = {
    scheme: "2019-2020",
    salary: 0
  }

  onSalaryChange = (e) => {
    this.setState({ salary: e.target.value });
  }
  onSchemeChange = (e) => {
    this.setState({ scheme: e.target.value });
  }
  onSubmit = (e) => {
    this.props.inputChanged(this.state.scheme, this.state.salary);
  }
  raiseInputChanged(){
    this.props.inputChanged(this.state.scheme, this.state.salary);
  }
  render() {
    return (
      <div className="SchemeList">
        <div className="table">
          <div className="tableBody">
            <div className="tableRow">
              <div className="tableCell">
                Tax Scheme:
              </div>
              <div className="tableCell">
                <select name="taxScheme" onChange={this.onSchemeChange} value={this.state.scheme}>
                  {this.props.schemes.map(scheme => { return (<option key={scheme} value={scheme}>{scheme}</option>) })}
                </select>
              </div>
            </div>
            <div className="tableRow">
              <div className="tableCell">
                Monthly Salary:
              </div>
              <div className="tableCell">
                <input name="salary" value={this.state.salary} onChange={this.onSalaryChange} />
              </div>
            </div>
            <div className="tableRow">
              <div className="tableCell"></div>
              <div className="tableCell"><button onClick={this.onSubmit}>Calculate Tax</button></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaxForm;
