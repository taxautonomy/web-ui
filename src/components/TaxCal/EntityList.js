import React, { Component, useState, useEffect } from 'react'

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Typography, Fab } from '@material-ui/core';

import NewEntityDialog from './NewEntityDialog'
export default function EntityList(props) {
  const list = props.list;
  let total = 0;
  list.forEach(i => (total += i.amt));
  const [showModal, setShowModal] = useState(props.showNewEntityDialog?props.showNewEntityDialog:false);
  const openAddIncomeModal = () => {
    setShowModal(true);
  }

  const addEntity = (entity) => {
    setShowModal(false);
    props.onAdd(entity);

  }

  useEffect(() => {
    
    console.log(`EntityList:showNewEntityDialog :${props.showNewEntityDialog}`)

  }, [])

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
                  <TableCell component="th" scope="row">{row.date.toISOString().slice(0, 10)}</TableCell>
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
      <div style={{ paddingTop: '10px' }}>
        <Fab variant="extended"
          color="primary"
          aria-label="add"
          position="fixed"
          style={{ margin: 0, top: 'auto', right: 20, bottom: 20, left: 'auto', position: 'fixed' }} onClick={openAddIncomeModal}
        >
          <AddIcon />&nbsp;&nbsp;Add {props.entityName}
        </Fab>
      </div>
      <NewEntityDialog open={showModal} onSubmit={addEntity} onCancel={()=>{setShowModal(false)}} entityName={props.entityName}/>
    </div>
  )
}
