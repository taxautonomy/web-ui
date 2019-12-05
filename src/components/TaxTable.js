import React, { Component } from 'react'
import TaxSlab from './TaxSlab';
import NumberFormat from 'react-number-format'

export default class TaxTable extends Component {

    render() {
        const { salary, tax_total, slabs } = this.props.taxInfo;

        return (
            <div>
                <div className="table">
                    <div className="tableHeading">
                        <div className="tableRow">
                            <div className="tableHead leftAlign cellWithBorderBottom cellWithBorderTop">
                                Monthly Salary:
                        </div>
                            <div className="tableCell rightAlign cellWithBorderBottom cellWithBorderTop">
                                <NumberFormat thousandSeparator={true} displayType={'text'} value={salary} decimalScale={2} fixedDecimalScale={true} />
                            </div>
                        </div>
                        <div className="tableRow">
                            <div className="tableHead leftAlign cellWithBorderBottom">
                                Total Tax:
                        </div>
                            <div className="tableCell rightAlign cellWithBorderBottom">
                                <NumberFormat thousandSeparator={true} displayType={'text'} value={tax_total} decimalScale={2} fixedDecimalScale={true} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table">
                    <div className="tableBody">
                        <div className="tableRow">
                            <div className="tableHead rightAlign cellWithBorder">Lower Band</div>
                            <div className="tableHead rightAlign cellWithBorder">Percentage</div>
                            <div className="tableHead rightAlign cellWithBorder">Taxable Amount</div>
                            <div className="tableHead rightAlign cellWithBorder">Tax</div>
                        </div>
                        {slabs.map((slab) => (
                            <TaxSlab slab={slab} key={slab.lower_band} />
                        ))}</div>
                </div>
            </div>
        )
    }
}
