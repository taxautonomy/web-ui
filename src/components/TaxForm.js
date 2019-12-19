import React, { Component } from 'react';
import '../App.css';
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
    console.log('changed')
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
    var schemes = [];
    this.state.checkedSchemes.forEach((value, key )=> {
      if(value){
        schemes.push(key);
      }
    })

    console.log(schemes)
    this.props.onSubmit(schemes, this.state.salary);
  }
  raiseInputChanged() {
    this.props.onSubmit(this.state.scheme1, this.state.scheme2, this.state.salary);
  }
  render() {
    const { schemes } = this.props;
    if (!schemes.length) {
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

                <TaxSchemeList schemes={schemes} onChange={this.onSchemeSelected}/>
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
