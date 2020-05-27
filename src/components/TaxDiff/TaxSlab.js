import React, { Component } from 'react'
import NumberFormat from 'react-number-format';

export default class TaxSlab extends Component {
    render() {
        const { slab } = this.props;
        return (
            <div className="tableRow">
                <div className="tableCell rightAlign cellWithBorder">
                    <NumberFormat thousandSeparator={true} displayType={'text'} value={slab.lower_band} decimalScale={2} fixedDecimalScale={true} />
                </div>
                <div className="tableCell rightAlign cellWithBorder">
                    <NumberFormat thousandSeparator={true} displayType={'text'} value={slab.percentage} decimalScale={2} fixedDecimalScale={true} suffix={'%'} />
                </div>
                <div className="tableCell rightAlign cellWithBorder">
                    <NumberFormat thousandSeparator={true} displayType={'text'} value={slab.taxable_amount} decimalScale={2} fixedDecimalScale={true} />
                </div>
                <div className="tableCell rightAlign cellWithBorder">
                    <NumberFormat thousandSeparator={true} displayType={'text'} value={slab.tax_calculated} decimalScale={2} fixedDecimalScale={true} />
                </div>
            </div>
        )
    }
}
