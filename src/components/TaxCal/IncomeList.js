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


export default class IncomeList extends Component {

  title = "My Income"
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

  addIncome = () => {
    let total = 0;
    const { new_date, new_desc, new_amt } = this.state;
    const newIncome = { date: new_date.toISOString().slice(0, 10), desc: new_desc, amt: parseFloat(new_amt) };
    const list = this.state.list.concat(newIncome);

    list.forEach(i => (total += i.amt));

    this.setState({ showModal: false, list: list, total: total }, () => {
      console.log("New Income Added: ", newIncome.amt)
      console.log("New Total Income: ", total)
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
        </div>
        <div style={{overflow:'overlay'}}>
          <div className="tableCell floatLeft"><span>Total for {this.title}: <b>{this.state.total}</b></span></div><div className="tableCell floatRight" ><button onClick={this.openAddIncomeModal}>Add Income</button></div>
          </div>
          
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Add Income Modal"
          appElement={document.getElementById('root')} style={{ content: { width: '400px', height: '225px', left: '20%' } }}
        >
          <div className="modalInputForm">
            <div className="modalTitle">New Income</div>
            <hr/>
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
              <button onClick={this.addIncome}>Submit</button><span />
              <button onClick={() => this.setState({ showModal: false })}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
