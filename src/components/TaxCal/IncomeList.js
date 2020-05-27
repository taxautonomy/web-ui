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

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      incomeList: [],
      newIncome_date: new Date()
    };

  }

  openAddIncomeModal = () => {
    this.setState({ showModal: true });
  }

  addIncome = () => {
    this.setState({ showModal: false });
    const { newIncome_date, newIncome_desc, newIncome_amt } = this.state;
    const newIncome = { date: newIncome_date.toISOString().slice(0, 10), desc: newIncome_desc, amt: parseFloat(newIncome_amt) };


    this.setState({ incomeList: this.state.incomeList.concat(newIncome) }, () => {
      let total = 0;
      this.state.incomeList.forEach(i => (total += i.amt));
      console.log("New Income Added: ", newIncome.amt)
      console.log("New Total Income: ", total)
      this.props.incomeChanged(total);
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
            title="Regular Income"
            columns={columns}
            data={this.state.incomeList}
          />
        </div>
        <div style={{ float: "left" }}>
          <button onClick={this.openAddIncomeModal}>Add Income</button></div>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Add Income Modal"
          appElement={document.getElementById('root') } style={{  content: { width: '400px', height: '200px', left:'20%' } }}
        >
          <div className="modalInputForm">
            <div className="modalInputRow">
              {/* Date: <input type="text" name="date" onChange={this.handleInputChange} /> */}
              Date: <DatePicker selected={this.state.newIncome_date} onChange={date => this.setState({ newIncome_date: date })} />
            </div>
            <div className="modalInputRow">
              Description: <input type="text" name="newIncome_desc" onChange={this.handleInputChange} />
            </div>
            <div className="modalInputRow">
              Amount: <input type="text" name="newIncome_amt" onChange={this.handleInputChange} />
            </div>
            <div className="modalButtonRow">
              <button onClick={this.addIncome}>Submit</button><span/>
              <button onClick={() => this.setState({ showModal: false })}>Cancel</button>
            </div>
          </div>

        </Modal>
      </div>
    )
  }
}
