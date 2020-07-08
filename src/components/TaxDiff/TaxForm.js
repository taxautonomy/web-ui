import React, { Component } from 'react';
import TaxSchemeList from './TaxSchemeList';

class TaxForm extends Component {

  // state = {
  //   scheme: {},
  //   salary: 0
  // }

  state = {
    checkedSchemes: new Map()
  }
  componentDidMount() {
    //this.setState({ scheme1: this.props.scheme1, scheme2: this.props.scheme2 });
  }
  onSalaryChange = (e) => {
    this.setState({ salary: e.target.value });
  }
  onScheme1Change = (e) => {
    this.setState({ scheme1: e.target.value });
  }
  onScheme2Change = (e) => {
    this.setState({ scheme2: e.target.value });
  }

  onSchemeSelected = (e) => {
    const item = e.target.value;
    const isChecked = e.target.checked;
    this.setState(prevState => ({checkedSchemes: prevState.checkedSchemes.set(item, isChecked)}));
  }
  onSubmit = (e) => {
    var workspaces = [];
    this.state.checkedSchemes.forEach((value, key )=> {
      if(value){
        workspaces.push(key);
      }
    })

    this.props.onSubmit(workspaces, this.state.salary);
  }
  raiseInputChanged() {
    this.props.onSubmit(this.state.scheme1, this.state.scheme2, this.state.salary);
  }
  render() {
    const { workspaces } = this.props;
    if (!workspaces.length) {
      return null;
    }

    return (
      <div className="SchemeList">
        <div className="table">
          <div className="tableBody">
            <div className="tableRow">
              <div className="tableCell leftAlign">
                Monthly Salary:
              </div><div className="tableCell"></div>
              <div className="tableCell rightAlign">
                <input name="salary" style={{ textAlign: 'right' }} defaultValue={''} onChange={this.onSalaryChange} />
              </div>
            </div>
            <div className="tableRow">
            </div>
            <div className="tableRow">
              <div className="tableCell leftAlign">

                <TaxSchemeList workspaces={workspaces} onChange={this.onSchemeSelected}/>
              </div>
              <div className="tableCell rightAlign"><button onClick={this.onSubmit}>Compare Tax</button></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaxForm;
