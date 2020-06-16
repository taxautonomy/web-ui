import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EntityList from './EntityList';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CloseIcon from '@material-ui/icons/Close'
import {
  Typography,
  Card,
  Grid,
  CardContent,
  CardActions,
  IconButton,
  Button,
  CardHeader,
  Avatar,
  Dialog,
  AppBar,
  Toolbar,
  Transition,
  useMediaQuery,
  TableCell, Table, TableRow, TableBody
} from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    minWidth: 265,
  },
  cardTitle: {
    fontSize: 14,
  },
  cardPos: {
    marginBottom: 12,
  },
  cardAvatar: {
    backgroundColor: theme.palette.secondary.dark
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.light,
    fontSize: '18px'
  },
  entityListDialogAppBar: {
    position: 'relative',
  },
  entityListDialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  entityListDialogPaper: {
    minHeight: '90vh',
    maxHeight: '90vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function SummaryCard(props) {
  const { entityType } = props;
  const classes = useStyles();

  const getLatestRecord = list => {
    if (list.length == 0)
      return null
    return list.reduce(function (a, b) { return a.date > b.date ? a : b; }, { date: new Date(0, 0, 0) });
  }

  const latestRecord = getLatestRecord(entityType.list);
  const latestRecordString = latestRecord ? `${latestRecord.date.toDateString()} - ${latestRecord.desc} - ${latestRecord.amt.toFixed(2)}` : 'no records found';
  return (
    <Card className={classes.card} >
      <CardHeader className={classes.cardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.cardAvatar}>
            {entityType.title.substring(0, 2)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6">{entityType.title}</Typography>}
      />
      <CardContent style={{ padding: '0' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                  Total (LKR)
                </Typography>
                <Typography variant="body2" component="p" style={{ fontWeight: 'bold' }}>{entityType.total.toFixed(2)}</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                  Latest Record
                </Typography>
                <Typography variant="body2" component="p">{latestRecordString}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }}>
        <Button size="small" color="primary" onClick={props.onClickMoreInfo}>more info</Button>
        <Button size="small" color="primary" onClick={props.onClickAdd}>add {entityType.name}</Button>
      </CardActions>
    </Card>);
}

function EntityListDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog fullWidth={true}
      classes={fullScreen ? {} : { paper: classes.entityListDialogPaper }}
      maxWidth="lg" 
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition} >
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            {props.entityType.title} {fullScreen ? ' - TaxAutonomy' : ''}
          </Typography>
          <IconButton color="inherit" onClick={props.onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <EntityList entityType={props.entityType} onAdd={props.onAdd} showNewEntityDialog={props.showNewEntityDialog} />
    </Dialog>
  )
}

function EntityTypeGridItem(props) {
  const { entityType, onAdd, ...other } = props
  const [openEntityListDialog, setOpenEntityListDialog] = useState(false);
  const [openNewEntityDialog, setOpenNewEntityDialog] = useState(false);

  const handleAdd = (entityTypeKey, entity) => {
    onAdd(entityTypeKey, entity);
    setOpenNewEntityDialog(false);
  }

  const showEntityListDialog = (showNewEntityDialog) => {
    setOpenEntityListDialog(true);
    setOpenNewEntityDialog(showNewEntityDialog);
  }

  const hideEntityListDialog = () => {
    setOpenEntityListDialog(false);
    setOpenNewEntityDialog(false);
  }

  return (
    <Grid item {...other}>
      <SummaryCard entityType={entityType}
        onClickMoreInfo={() => showEntityListDialog(false)}
        onClickAdd={() => showEntityListDialog(true)} />
      <EntityListDialog entityType={entityType}
        open={openEntityListDialog}
        showNewEntityDialog={openNewEntityDialog}
        onClose={() => hideEntityListDialog()}
        onAdd={handleAdd} />
    </Grid>
  )
}

const entityTypeArray = [
  { key: 'income', name: 'Income', title: 'Income', list: [], total: 0 },
  { key: 'qualifyingPayment', name: 'Qualifying Payment', title: 'Qualifying Payments', list: [], total: 0 },
  { key: 'taxPayment', name: 'Tax Payment', title: 'Tax Payments', list: [], total: 0 }]

const entityTypes = {};
entityTypeArray.forEach(i => entityTypes[i.key] = i);

export default function Summary() {
  const [entities, setEntities] = useState(entityTypes);

  const entityAdded = (entityTypeKey, newEntity) => {
    newEntity.id = guid();
    const newList = entities[entityTypeKey].list.concat(newEntity);
    updateList(entityTypeKey, newList);
    console.log(`new ${entityTypeKey} added :`, newEntity)
  }

  const updateList = (entityTypeKey, newList) => {

    let newTotal = 0;
    newList.forEach(i => newTotal += i.amt);

    setEntities({
      ...entities,
      [entityTypeKey]: {
        ...entities[entityTypeKey],
        list: newList,
        total: newTotal
      }
    })
  }

  return (
    <Grid container style={{ marginTop: 10 }} spacing={3}>
      <EntityTypeGridItem entityType={entities['income']} onAdd={entityAdded} xs={12} sm={12} md={4} />
      <EntityTypeGridItem entityType={entities['qualifyingPayment']} onAdd={entityAdded} xs={12} sm={6} md={4} />
      <EntityTypeGridItem entityType={entities['taxPayment']} onAdd={entityAdded} xs={12} sm={6} md={4} />
    </Grid>
  );
}
