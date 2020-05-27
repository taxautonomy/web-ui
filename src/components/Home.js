import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                <a  className="listItem" href="/cal">Calculate Your Taxes</a>
                <a  className="listItem" href="/diff">Compare taxes of 2018-2019 vs 2019-2020</a>
            </div>
        )
    }
}
