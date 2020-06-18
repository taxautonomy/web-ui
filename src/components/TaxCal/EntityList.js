import React, { useState, useEffect } from 'react'

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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NewEntityDialog from './NewEntityDialog'
import EntityDeleteDialog from './EntityDeleteDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.background.paper,
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

  const { entityType } = props;

  const emptyEntity = {
    date: new Date().toISOString().slice(0, 10),
    desc: '',
    amt: 0
  };

  const [showEntityEditDialog, setShowEntityEditDialog] = useState(props.showNewEntityDialog ? props.showNewEntityDialog : false);
  const [showEntityDeleteDialog, setShowEntityDeleteDialog] = useState(false);
  const [dialogBoxEntity, setDialogBoxEntity] = useState(emptyEntity);

  const openAddEntityDialog = () => {
    setDialogBoxEntity(emptyEntity);
    setShowEntityEditDialog(true);
  }

  const handleAddOrUpdate = (entityTypeKey, entity, keepOpen) => {
    setShowEntityEditDialog(keepOpen);

    if (entity.id)
      props.onUpdate(entityTypeKey, entity);
    else
      props.onAdd(entityTypeKey, entity);

  }

  const handleDelete = (entityTypeKey, entity) => {
    setShowEntityDeleteDialog(false);
    props.onDelete(entityTypeKey, entity);

  }


  const openEditEntityDialog = (entity) => {
    console.log("openEditEntityDialog.entity: ", entity)
    //entity.date = entity.date.toISOString().slice(0,10);
    setDialogBoxEntity({
      ...entity,
      date: entity.date.toISOString().slice(0, 10)
    });
    setShowEntityEditDialog(true);
  }

  const openDeleteEntityDialog = (entity) => {
    console.log("openDeleteEntityDialog.entity: ", entity)
    //entity.date = entity.date.toISOString().slice(0,10);
    setDialogBoxEntity({
      ...entity,
      date: entity.date.toISOString().slice(0, 10)
    });
    setShowEntityDeleteDialog(true);
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
              <TableCell  size="small">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entityType.list.map((entity) => (
              <TableRow key={entity.id}>
                <TableCell component="th" scope="row">{entity.date.toISOString().slice(0, 10)}</TableCell>
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
              <TableCell align="right"><Typography variant="h6">{entityType.total.toFixed(2)}</Typography></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Fab variant="extended"
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => openAddEntityDialog()}
      >
        <AddIcon />&nbsp;&nbsp;Add {entityType.name}
      </Fab>
      <NewEntityDialog open={showEntityEditDialog} onSubmit={handleAddOrUpdate} onCancel={() => { setShowEntityEditDialog(false) }} entityType={entityType} entity={dialogBoxEntity} />
      <EntityDeleteDialog open={showEntityDeleteDialog} onSubmit={handleDelete} onCancel={()=> setShowEntityDeleteDialog(false)} entityType={entityType} entity={dialogBoxEntity}/>
    </React.Fragment>
  )
}
