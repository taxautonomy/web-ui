import React, { Component, useState } from 'react'
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
import AddIcon from '@material-ui/icons/Add';
import { Typography, Fab } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EntityList(props) {
  const list = props.list;
  let total = 0;
  list.forEach(i => (total += i.amt));
  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().slice(0,10),
    desc: '',
    amt: 0
  });

  console.log(newEntry);

  const openAddIncomeModal = () => {
    setShowModal(true);
  }

  const addEntry = () => {
    var income = {
      date: new Date(newEntry.date),
      desc: newEntry.desc,
      amt: parseInt(newEntry.amt)
    };

    setShowModal(false);
    props.onAdd(income);

  }

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = name === 'schedule' ? !target.checked : target.value;

    console.log(`handling the onChange event of ${name} changing to ${value}`);
    setNewEntry({
      ...newEntry,
      [name]: value
    });

    console.log(newEntry)
  }

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
              {list.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">{row.date.toISOString().slice(0,10)}</TableCell>
                  <TableCell >{row.desc}</TableCell>
                  <TableCell align="right">{row.amt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan="2"><Typography variant="h6">Total</Typography></TableCell>
                <TableCell align="right"><Typography variant="h6">{total}</Typography></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <div style={{paddingTop:'10px'}}>
      <Fab variant="extended" color="primary" aria-label="add" position="fixed" style={{ float: 'right' }} onClick={openAddIncomeModal}>
        <AddIcon /> Add {props.entityName}
      </Fab>
      </div>
      <Dialog open={showModal} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New {props.entityName}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText> */}
          <div className="modalInputRow">
            <TextField
              id="date"
              label="Date"
              type="date"
              name="date"
              value={newEntry.date}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

          </div>
          <div className="modalInputRow">
          <TextField
              id="desc"
              label="Description"
              type="text"
              name="desc"
              value={newEntry.desc}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="modalInputRow">
          <TextField
              id="amt"
              label="Amount"
              type="text"
              name="amt"
              value={newEntry.amt}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={addEntry} color="primary">
            Submit
          </Button>
          <Button onClick={() => setShowModal(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
