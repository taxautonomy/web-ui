import React, { Component } from 'react'
import Modal from 'react-modal';

// Material UI
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'


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
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount (LKR)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.list.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">{row.date}</TableCell>
                    <TableCell >{row.desc}</TableCell>
                    <TableCell align="right">{row.amt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan="2">Total</TableCell>
                  <TableCell align="right">{this.state.total}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
        <div style={{ overflow: 'overlay' }}>
          <div className="tableCell floatLeft"><span>Total for {this.title}: <b>{this.state.total}</b></span></div><div className="tableCell floatRight" >
            <Button variant="contained" color="primary" onClick={this.openAddIncomeModal}>Add Income</Button>
          </div>
        </div>

        <Modal
          isOpen={this.state.showModal}
          contentLabel="Add Income Modal"
          appElement={document.getElementById('root')} style={{ content: { width: '400px', height: '225px', left: '20%' } }}
        >
          <div className="modalInputForm">
            <div className="modalTitle">New Income</div>
            <hr />
            <div className="modalInputRow">
              {/* Date: <DatePicker selected={this.state.new_date} onChange={date => this.setState({ new_date: date })} /> */}

              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue="2017-05-24"
                value={this.state.new_date.toISOString().slice(0, 10)}
                onChange={(e)=>console.log(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
