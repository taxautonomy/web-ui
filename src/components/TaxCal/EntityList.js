import React, {useState, useEffect } from 'react'

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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NewEntityDialog from './NewEntityDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function EntityList(props) {

  const classes = useStyles();
  const theme = useTheme();

  const {entityType} = props;

  const [showModal, setShowModal] = useState(props.showNewEntityDialog ? props.showNewEntityDialog : false);
  const openAddIncomeModal = () => {
    setShowModal(true);
  }

  const addEntity = (entityTypeKey, entity, keepOpen) => {
    setShowModal(keepOpen);
    props.onAdd(entityTypeKey, entity);

  }

  return (
    <React.Fragment>
      <TableContainer className={classes.root} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount (LKR)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entityType.list.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.date.toISOString().slice(0, 10)}</TableCell>
                <TableCell >{row.desc}</TableCell>
                <TableCell align="right">{row.amt.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="2"><Typography variant="h6">Total</Typography></TableCell>
              <TableCell align="right"><Typography variant="h6">{entityType.total.toFixed(2)}</Typography></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Fab variant="extended"
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={()=> openAddIncomeModal()}
      >
        <AddIcon />&nbsp;&nbsp;Add {entityType.name}
      </Fab>
      <NewEntityDialog open={showModal} onSubmit={addEntity} onCancel={() => { setShowModal(false) }} entityType={entityType} />
    </React.Fragment>
  )
}
