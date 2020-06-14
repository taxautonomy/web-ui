import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EntityList from './EntityList';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CloseIcon from '@material-ui/icons/Close'
import {
  Typography,
  Container,
  Card,
  Grid,
  CardContent,
  Paper,
  CardActions,
  IconButton,
  Button,
  CardHeader,
  Avatar,
  Dialog,
  AppBar,
  Toolbar,
  Transition,
} from '@material-ui/core';

import {
  red
} from '@material-ui/core/colors'
import NewEntityDialog from './NewEntityDialog';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    minWidth: 275,
  },
  cardTitle: {
    fontSize: 14,
  },
  cardPos: {
    marginBottom: 12,
  },
  cardAvatar: {
    backgroundColor: theme.palette.secondary.light
  },
  cardHeader: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  entitlyListDialogAppBar: {
    position: 'relative',
  },
  entitlyListDialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function SummaryCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card} >
      <CardHeader className={classes.cardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.cardAvatar}>
            {props.title.substring(0, 2)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="body2" component="p">{props.total.toFixed(2)}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.onClickMoreInfo}>more info</Button>
        {/* <IconButton size="small"><AddIcon/></IconButton> */}
        <Button size="small" onClick={props.onClickAdd}>add {props.entityName}</Button>
      </CardActions>
    </Card>);
}

function EntityListDialog(props) {
  const classes = useStyles();

  return (
    <Dialog fullScreen open={props.open} onClose={props.onClose} TransitionComponent={Transition}>
      <AppBar className={classes.entityListDialogAppBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={props.onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.entityListDialogTitle}>
            {props.entityName}
          </Typography>
        </Toolbar>
      </AppBar>
      <EntityList list={props.list} entityName={props.entityName} onAdd={props.onAdd} showNewEntityDialog={props.showNewEntityDialog} />
    </Dialog>
  )
}
export default function Summary() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [incomeList, setIncomeList] = useState([]);
  const [qualifyingPaymentList, setQualifyingPaymentList] = useState([]);
  const [taxPaymentList, setTaxPaymentList] = useState([]);
  const [openEntityListDialog, setOpenEntityListDialog] = useState(null);
  const [openNewEntityDialog, setOpenNewEntityDialog] = useState(false);
  const totals = { income: 0, qualifyingPayment: 0, taxPayment: 0 }
  let incomeTotal = 0;
  incomeList.forEach(i => totals.income += i.amt);
  qualifyingPaymentList.forEach(i => totals.qualifyingPayment += i.amt);
  taxPaymentList.forEach(i => totals.taxPayment += i.amt);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const incomeAdded = income => {
    income.id = guid();
    console.log("new income:", income)
    const newList = incomeList.concat(income);

    setIncomeList(newList);
  }

  const qualifyingPaymentAdded = payment => {
    payment.id = guid();
    console.log("new qualifying payment:", payment)
    const newList = qualifyingPaymentList.concat(payment);

    setQualifyingPaymentList(newList);
  }

  const taxPaymentAdded = payment => {
    payment.id = guid();
    console.log("new tax payment:", payment)
    const newList = taxPaymentList.concat(payment);

    setTaxPaymentList(newList);
  }

  const showEntityListDialog = (entityType, showNewEntityDialog) => {
    setOpenEntityListDialog(entityType);
    setOpenNewEntityDialog(showNewEntityDialog);
  }

  const hideEntityListDialog = () => {
    setOpenEntityListDialog(null);
    setOpenNewEntityDialog(false);
  }
  const bull = <span className={classes.bullet}>•</span>;

  const getEntityKey = (str) => (
    str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()))

  const GridItemContent = (props) => {
    const { entityType, title, onAdd, list } = props
    const entityKey = getEntityKey(entityType);
    return (
      <React.Fragment>
        <SummaryCard title={title} entityName={entityType} total={totals[entityKey]}
          onClickMoreInfo={() => showEntityListDialog(entityKey, false)}
          onClickAdd={() => showEntityListDialog(entityKey, true)} />
        <EntityListDialog list={list} entityName={entityType}
          open={openEntityListDialog === entityKey}
          showNewEntityDialog={openNewEntityDialog}
          onClose={() => hideEntityListDialog()}
          onAdd={onAdd} />
      </React.Fragment>
    )
  }
  return (
    <Grid container style={{ marginTop: 10 }} spacing={3}>
      <Grid item xs={12} sm={12} md={4}>
        <GridItemContent entityType="Income" title="Income" onAdd={incomeAdded} list={incomeList} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <GridItemContent entityType="Qualifying Payment" title="Qualifying Payments" onAdd={qualifyingPaymentAdded} list={qualifyingPaymentList} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <GridItemContent entityType="Tax Payment" title="Tax Payments" onAdd={taxPaymentAdded} list={taxPaymentList} />
      </Grid>
    </Grid>
  );
}
