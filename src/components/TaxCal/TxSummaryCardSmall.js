import {
  Button, Card,
  CardActions, CardContent, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 265,
  },
  cardTitle: {
    fontSize: 14,
    flexGrow: 1,
    display: 'inline-block'
  }
}));

export default function TxSummaryCardSmall(props) {
  const { txType } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.cardTitle} color="textSecondary">
          {txType.title}
        </Typography>
        <Typography variant="body2" component="p" style={{ fontWeight: 'bold', float: "right" }}>{txType.total.toFixed(2)}</Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }}>
        <Button size="small" color="primary" onClick={props.onClickMoreInfo}>more info</Button>
        <Button size="small" color="primary" onClick={props.onClickAdd}>add {txType.name}</Button>
      </CardActions>
    </Card>);
}
