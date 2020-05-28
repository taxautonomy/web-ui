import React, { Component } from 'react'
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const columns = [
  {
    name: 'Date',
    selector: 'date',
    sortable: true
  },
  {
    name: 'Description',
    selector: 'desc',
    sortable: true,
  },
  {
    name: 'Amount',
    selector: 'amt',
    sortable: true,
    right: true,
  },
];


export default class TaxAdvanceList extends Component {

  title = "Tax Advance Payments";

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      list: [],
      new_date: new Date()
    };

  }

  openAddIncomeModal = () => {
    this.setState({ showModal: true });
  }

  addTaxAdvance = () => {
    let total = 0;
    const { new_date, new_desc, new_amt } = this.state;
    const newIncome = { date: new_date.toISOString().slice(0, 10), desc: new_desc, amt: parseFloat(new_amt) };
    const list = this.state.list.concat(newIncome);

    list.forEach(i => (total += i.amt));

    this.setState({ showModal: false, list: list, total: total }, () => {
      console.log("New Tax Advance Added: ", newIncome.amt)
      console.log("New Total Tax Advance: ", total)
      this.props.totalChanged(total);
    })
  }



  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = name === 'schedule' ? !target.checked : target.value;

    console.log(`handling the onChange event of ${name} changing to ${value}`);
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <div>
        <div>
          <DataTable
            title={this.title}
            columns={columns}
            data={this.state.list}
          />
          <div>Total of {this.title}: {this.state.total}</div>
        </div>
        <div style={{ float: "left" }}>
          <button onClick={this.openAddIncomeModal}>Add Tax Advance</button></div>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Add Tax Advance"
          appElement={document.getElementById('root')} style={{ content: { width: '400px', height: '200px', left: '20%' } }}
        >
          <div className="modalInputForm">
            <div className="modalInputRow">
              Date: <DatePicker selected={this.state.new_date} onChange={date => this.setState({ new_date: date })} />
            </div>
            <div className="modalInputRow">
              Description: <input type="text" name="new_desc" onChange={this.handleInputChange} />
            </div>
            <div className="modalInputRow">
              Amount: <input type="text" name="new_amt" onChange={this.handleInputChange} />
            </div>
            <div className="modalButtonRow">
              <button onClick={this.addTaxAdvance}>Submit</button><span />
              <button onClick={() => this.setState({ showModal: false })}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
