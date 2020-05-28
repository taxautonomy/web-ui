import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Test from './Test'
import IncomeList from './IncomeList'
import TaxAdvanceList from './TaxAdvanceList'
import QualifyingPaymentList from './QualifyingPaymentList'

export default class Main extends Component {

    constructor(props){
        super(props)
    }

    incomeChanged = total => {
        this.setState({incomeTotal: total})
        console.log("incomeTotal:", total)
    }

    taxAdvanceChanged = total => {
        this.setState({taxAdvanceTotal: total})
        console.log("taxAdvanceTotal:", total)       
    }

    qualifyingPaymentsChanged = total => {
        this.setState({qualifyingPaymentsTotal: total})
        console.log("qualifyingPaymentsTotal:", total)       
    }

    render() {
        return (
            <div>
                Calculate
                <IncomeList totalChanged={this.incomeChanged}/><br/>
                <hr/>
                <QualifyingPaymentList totalChanged={this.qualifyingPaymentsChanged}/><br/>
                <hr/>
                <TaxAdvanceList totalChanged={this.taxAdvanceChanged}/><br/>
                <hr/>
                <Router>
          <Route path="/cal/test" component={ Test } />
          </Router>
            </div>
        )
    }
}
