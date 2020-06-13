import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EntityList from './EntityList';
import MoreVertIcon from '@material-ui/icons/MoreVert'
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
  Avatar
} from '@material-ui/core';

import {
  red
} from '@material-ui/core/colors'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const cardStyles = makeStyles((theme)=> ({
  
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    avatar: {
      backgroundColor: red[500]
    }
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
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
    <Card className={cardStyles.root} >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={cardStyles.avatar}>
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
        <Typography className={cardStyles.title} color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="body2" component="p">{props.total.toFixed(2)}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">more info</Button>
        {/* <IconButton size="small"><AddIcon/></IconButton> */}
        <Button size="small">add income</Button>
      </CardActions>
    </Card>);
}
export default function Summary() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [incomeList, setIncomeList] = useState([]);
  const [qualifyingPaymentList, setQualifyingPaymentList] = useState([]);
  const [taxPaymentList, setTaxPaymentList] = useState([]);

  let incomeTotal = 0;
  incomeList.forEach(i => incomeTotal += i.amt);

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

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Grid container style={{ marginTop: 10 }} spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <SummaryCard title="Income" total={incomeTotal} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <SummaryCard title="Qualifying Payments" total={incomeTotal} />

      </Grid>
      <Grid item xs={12} sm={12} md={4}>
        <SummaryCard title="Tax Advances" total={incomeTotal} />
      </Grid>
    </Grid>
  );
}
