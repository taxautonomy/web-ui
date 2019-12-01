import React, { Component } from 'react'

export default class TaxTable extends Component {

    render() {
        const { salary, tax_total, slabs } = this.props.taxInfo;

        return (
            <div className="table">
                <div className="tableHeading">
                    <div className="tableRow">
                        <div className="tableHead">
                            Monthly Salary:
                        </div>
                        <div className="tableCell">
                            {salary}
                        </div>
                    </div>
                    <div className="tableRow">
                        <div className="tableHead">
                            Total Tax:
                        </div>
                        <div className="tableCell">
                            {tax_total}
                        </div>
                    </div>
                </div>
                <div className="tableBody">
                    <div className="tableRow">
                        <div className="tableHead">Lower Band</div>
                        <div className="tableHead">Percentage</div>
                        <div className="tableHead">Taxable Amount</div>
                        <div className="tableHead">Tax</div>
                    </div>
                    {slabs.map((slab) => (
                        <div className="tableRow">
                            <div className="tableCell">{slab.lower_band}</div>
                            <div className="tableCell">{slab.percentage}</div>
                            <div className="tableCell">{slab.taxable_amount}</div>
                            <div className="tableCell">{slab.tax_calculated}</div>
                        </div>
                    ))}</div>
            </div>
        )
    }
}
