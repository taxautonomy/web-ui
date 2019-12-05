import React, { Component } from 'react';
import '../App.css';

class TaxForm extends Component {

  // state = {
  //   scheme: {},
  //   salary: 0
  // }

  componentDidMount() {
    console.log(this.props.selectedScheme)
    this.setState({ scheme: this.props.selectedScheme });
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
  raiseInputChanged() {
    this.props.inputChanged(this.state.scheme, this.state.salary);
  }
  render() {
    const { schemes } = this.props;
    if(!schemes.length){
      console.log("null");
      return null;
    }
      
    return (
      <div className="SchemeList">
        <div className="table">
          <div className="tableBody">
            <div className="tableRow">
              <div className="tableCell leftAlign">
                Tax Scheme:
              </div>
              <div className="tableCell rightAlign">
                <select name="taxScheme" onChange={this.onSchemeChange} value={this.state.scheme.assessment_year}>
                  {schemes.map(scheme => { return (<option key={scheme.assessment_year} value={scheme.assessment_year}>{scheme.assessment_year}</option>) })}
                </select>
              </div>
            </div>
            <div className="tableRow">
              <div className="tableCell leftAlign">
                Monthly Salary:
              </div>
              <div className="tableCell rightAlign">
                <input name="salary" style={{ textAlign: 'right' }} defaultValue={''} onChange={this.onSalaryChange} />
              </div>
            </div>
            <div className="tableRow">
              <div className="tableCell"></div>
              <div className="tableCell rightAlign"><button onClick={this.onSubmit}>Calculate Tax</button></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaxForm;
