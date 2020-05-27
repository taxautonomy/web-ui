import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Test from './Test'
import IncomeList from './IncomeList'

export default class Main extends Component {

    incomeChanged = (total) =>{
        console.log("total in main:", total)
    }
    render() {
        return (
            <div>
                Calculate
                <IncomeList incomeChanged={this.incomeChanged}/>
                <Router>
          <Route path="/cal/test" component={ Test } />
          </Router>
            </div>
        )
    }
}
