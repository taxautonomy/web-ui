import React, { Component } from 'react';
import TaxForm from './TaxForm'

import TaxInfo from './TaxInfo';
import axios from 'axios';
import Config from '../../Config'
import TaxDifference from './TaxDifference';

class Main extends Component {
    baseUrl = new Config().getApiHost();
    state = {
        workspaces: {}
    }

    componentDidMount() {
        axios.get(this.baseUrl + '/api/paye/workspaces')
            .then(res => this.setState({ workspaces: res.data }, this.setDefaultScheme()))

    }

    setDefaultScheme() {
        this.setState({ selectedScheme1: this.state.workspaces[0], selectedScheme2: this.state.workspaces[1] });
    }

    taxFormInputChanged = (workspaces, salary) => {

        if (workspaces.length > 0) {
            axios.get(this.baseUrl + '/api/paye/workspaces/' + workspaces[0] + '/' + salary)
                .then(res => this.setState({ taxInfo1: res.data }));
            axios.get(this.baseUrl + '/api/paye/workspaces/' + workspaces[1] + '/' + salary)
                .then(res => this.setState({ taxInfo2: res.data }));
        }
    };


    render() {
        const { workspaces, scheme1, scheme2 } = this.state;
        return (
            <div className="table">
                <div className="tableRow">
                    <div className="tableCell">
                        <TaxForm workspaces={workspaces} scheme1={scheme1} scheme2={scheme2} onSubmit={this.taxFormInputChanged} />
                    </div>
                </div>
                <div className="tableRow">
                    <div className="tableCell leftAlign cellWithBorderBottom"> Tax Scheme </div>
                    <div className="tableCell rightAlign cellWithBorderBottom"> Total Tax </div>
                </div>
                <TaxInfo taxInfo={this.state.taxInfo1} />
                <TaxInfo taxInfo={this.state.taxInfo2} />
                <div className="tableRow">
                    <TaxDifference taxInfo1={this.state.taxInfo1} taxInfo2={this.state.taxInfo2} />
                </div>
            </div>
        );
    }
}

export default Main;
