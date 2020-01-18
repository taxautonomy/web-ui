import React, { Component } from 'react'
import TaxSlab from './TaxSlab';
import NumberFormat from 'react-number-format'
import Collapsible from 'react-collapsible';

export default class TaxInfo extends Component {

    render() {
        if (this.props.taxInfo == null)
            return null;
        const { scheme, salary, tax_total, slabs } = this.props.taxInfo;

        return (

            <div className="tableRow">
                <div className="tableCell leftAlign cellWithBorderBottom">
                    <Collapsible trigger={scheme}>
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
                    </Collapsible>                </div>
                <div className="tableCell rightAlign cellWithBorderBottom">
                    <NumberFormat thousandSeparator={true} displayType={'text'} value={tax_total} decimalScale={2} fixedDecimalScale={true} />
                </div>
            </div>
        )
    }
}
