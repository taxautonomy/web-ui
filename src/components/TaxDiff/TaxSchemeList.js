import React, { Component } from 'react'

export default class TaxSchemeList extends Component {
    render() {
        const { workspaces, onChange } = this.props

        return (
            <div>
                {workspaces.map(scheme => {
                    return (
                        <div key={scheme.name}><input type="checkbox" value={scheme.name} onChange={onChange}/><label>{scheme.assessment_year}</label>
                        </div>)
                })}
            </div>
        )
    }
}
