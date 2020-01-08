import React, { Component } from 'react'
import TaxSlab from './TaxSlab';
import NumberFormat from 'react-number-format'
import Collapsible from 'react-collapsible';

export default class TaxTable extends Component {

    render() {
        if (this.props.taxInfo == null)
            return null;
        const { scheme, salary, tax_total, slabs } = this.props.taxInfo;

        return (
            <div>
                <div className="table">
                    <div className="tableHeading">
                    <div className="tableRow">
                            <div className="tableHead leftAlign cellWithBorderBottom cellWithBorderTop">
                                Tax Scheme:
                        </div>
                            <div className="tableCell rightAlign cellWithBorderBottom cellWithBorderTop">
                                {scheme}
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
                <Collapsible trigger="calculation details ...">
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
                </Collapsible>
            </div>
        )
    }
}
