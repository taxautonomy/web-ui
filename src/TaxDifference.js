import React, { Component } from 'react'
import NumberFormat from 'react-number-format'

export default class TaxDifference extends Component {
  render() {
    if (this.props.taxInfo1 == null || this.props.taxInfo2 == null)
      return null;

    return (
      <div>
        <div className="tableCell">
          Tax Difference: <NumberFormat thousandSeparator={true} displayType={'text'} value={this.props.taxInfo1.tax_total - this.props.taxInfo2.tax_total} decimalScale={2} fixedDecimalScale={true} />
        </div>
      </div>
    )
  }
}
