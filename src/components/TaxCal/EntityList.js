import React, { useState, useContext } from 'react'

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Typography, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EntityEditDialog from './EntityEditDialog'
import EntityDeleteDialog from './EntityDeleteDialog';
import { TaxCalculationContext } from '../../AppContext'

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

export default function EntityList(props) {
  const { entityCollection, addEntity, updateEntity, deleteEntity } = useContext(TaxCalculationContext);

  const classes = useStyles();

  const { entityType } = props;
  const { list, name, total } = entityCollection[entityType];

  const emptyEntity = {
    date: new Date().toISOString().slice(0, 10),
    desc: '',
    amt: 0,
    type: entityType
  };

  const [showEntityEditDialog, setShowEntityEditDialog] = useState(props.showNewEntityDialog ? props.showNewEntityDialog : false);
  const [showEntityDeleteDialog, setShowEntityDeleteDialog] = useState(false);
  const [dialogBoxEntity, setDialogBoxEntity] = useState(emptyEntity);

  const openAddEntityDialog = () => {
    setDialogBoxEntity(emptyEntity);
    setShowEntityEditDialog(true);
  }

  const handleAddOrUpdate = (entity, keepOpen) => {
    setShowEntityEditDialog(keepOpen);
    if (entity.id)
      updateEntity(entity);
    else
      addEntity(entity);
  }

  const handleDelete = (entity) => {
    setShowEntityDeleteDialog(false);
    deleteEntity(entity);
  }

  const openEditEntityDialog = (entity) => {
    setDialogBoxEntity({
      ...entity,
      date: new Date(entity.date).toISOString().slice(0, 10)
    });
    setShowEntityEditDialog(true);
  }

  const openDeleteEntityDialog = (entity) => {
    setDialogBoxEntity({
      ...entity,
      date: new Date(entity.date).toISOString().slice(0, 10)
    });
    setShowEntityDeleteDialog(true);
  }

  return (
    <React.Fragment>
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
            {list.map((entity) => (
              <TableRow key={entity.id}>
                <TableCell component="th" scope="row">{new Date(entity.date).toISOString().slice(0, 10)}</TableCell>
                <TableCell >{entity.desc}</TableCell>
                <TableCell align="right">{entity.amt.toFixed(2)}</TableCell>
                <TableCell size="small">
                  <IconButton size="small" onClick={() => openEditEntityDialog(entity)}><EditIcon /></IconButton>
                  <IconButton size="small" onClick={() => openDeleteEntityDialog(entity)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
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

      <Fab variant="extended" color="primary" aria-label="add" className={classes.fab} onClick={() => openAddEntityDialog()}>
        <AddIcon />&nbsp;&nbsp;Add {name}
      </Fab>
      <EntityEditDialog open={showEntityEditDialog} onSubmit={handleAddOrUpdate} onCancel={() => setShowEntityEditDialog(false)} entityType={entityType} entity={dialogBoxEntity} />
      <EntityDeleteDialog open={showEntityDeleteDialog} onSubmit={handleDelete} onCancel={() => setShowEntityDeleteDialog(false)} entityType={entityType} entity={dialogBoxEntity} />
    </React.Fragment>
  )
}
