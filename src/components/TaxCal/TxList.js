import React, { useState, useContext, Fragment } from 'react'

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter, IconButton, ListItemText, List, ListItem, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Typography, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TxEditDialog from './TxEditDialog'
import TxDeleteDialog from './TxDeleteDialog';
import { AppContext } from '../../ContextHelper'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function TxList(props) {
  const { txCache, addTx, updateTx, deleteTx } = useContext(AppContext);

  const classes = useStyles();

  const { txType } = props;
  const { list, name, total } = txCache[txType];

  const emptyTx = {
    date: new Date().toISOString().slice(0, 10),
    desc: '',
    amt: 0,
    type: txType
  };

  const [showTxEditDialog, setShowTxEditDialog] = useState(props.showNewTxDialog ? props.showNewTxDialog : false);
  const [showTxDeleteDialog, setShowTxDeleteDialog] = useState(false);
  const [dialogBoxTx, setDialogBoxTx] = useState(emptyTx);

  const openAddTxDialog = () => {
    setDialogBoxTx(emptyTx);
    setShowTxEditDialog(true);
  }

  const handleAddOrUpdate = (tx, keepOpen) => {
    setShowTxEditDialog(keepOpen);
    if (tx.id)
      updateTx(tx);
    else
      addTx(tx);
  }

  const handleDelete = (tx) => {
    setShowTxDeleteDialog(false);
    deleteTx(tx);
  }

  const openEditTxDialog = (tx) => {
    setDialogBoxTx({
      ...tx,
      date: tx.date.toISOString().slice(0, 10)
    });
    setShowTxEditDialog(true);
  }

  const openDeleteTxDialog = (tx) => {
    setDialogBoxTx({
      ...tx,
      date: tx.date.toISOString().slice(0, 10)
    });
    setShowTxDeleteDialog(true);
  }

  return (
    <Fragment>
      <TableContainer className={classes.root} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '125px' }}>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount (LKR)</TableCell>
              <TableCell size="small" style={{ width: '100px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((tx) => (
              <Fragment key={tx.id}>
                <TableRow key={tx.id}>
                  <TableCell component="th" scope="row">{tx.date.toISOString().slice(0, 10)}</TableCell>
                  <TableCell >{tx.desc}</TableCell>
                  <TableCell align="right">{tx.amt.toFixed(2)}</TableCell>
                  <TableCell size="small">
                    <IconButton size="small" onClick={() => openEditTxDialog(tx)}><EditIcon /></IconButton>
                    <IconButton size="small" onClick={() => openDeleteTxDialog(tx)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              </Fragment>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="2"><Typography variant="h6">Total</Typography></TableCell>
              <TableCell align="right"><Typography variant="h6">{total.toFixed(2)}</Typography></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {/* <List className={classes.root}>
        {list.map(tx=> (
          <Fragment>
          <ListItem alignItems="flex-start">
            <ListItemText primary={tx.date.toISOString().slice(0,10)} secondary={tx.desc}/>
            <ListItemText alignItems="right" primary={tx.amt.toFixed(2)} />
          </ListItem>
          <Divider variant="fullwidth" component="li"/>
          </Fragment>
        ))}
      </List> */}
      <Fab variant="extended" color="primary" aria-label="add" className={classes.fab}
        onClick={() => openAddTxDialog()}>
        <AddIcon />&nbsp;&nbsp;Add {name}
      </Fab>
      <TxEditDialog open={showTxEditDialog}
        onSubmit={handleAddOrUpdate} onCancel={() => setShowTxEditDialog(false)}
        txType={txType} tx={dialogBoxTx} />
      <TxDeleteDialog open={showTxDeleteDialog}
        onSubmit={handleDelete} onCancel={() => setShowTxDeleteDialog(false)}
        txType={txType} tx={dialogBoxTx} />
    </Fragment>
  )
}
