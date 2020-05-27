import React, { Component } from 'react';


export class TestSessionInfo extends Component {


  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div><h2>Test Session Info</h2> </div>
        <div className="divTable">
          <div className="divTableBody">
            <div className="divTableRow">
              <div className="divTableCell">Id: </div>
              <div className="divTableCell">{id}</div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">Name: </div>
              <div className="divTableCell">{name}</div>
            </div>
            <div className="divTableRow">
              <div className="divTableCell">Overall Result: </div>
              <div className="divTableCell">{result ? "Successful" : "Failed"}</div>
            </div>
          </div>
        </div>
        <hr />
        <div><h2>Test Runs</h2> </div>
        <div className="divTable">
          <div className="divTableHeading">
            <div className="divTableHead">Test Case Name</div>
            <div className="divTableHead">Execution Time</div>
            <div className="divTableHead">Result</div>
          </div>
          <div className="divTableBody">
            <TestRunList testRuns={this.state.testRuns} />
          </div>
        </div>
      </div>
    )
  }
}

export default TestSessionInfo;