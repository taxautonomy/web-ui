import React,{useContext} from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
  CardHeader,
  Avatar,
  TableCell, 
  Table, 
  TableRow, 
  TableBody
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TaxCalculationContext } from '../../AppContext'

const useStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[100] : theme.palette.grey[700],
    fontSize: '18px',
    padding: '5px'
  }
}));
export default function EntitySummaryCard(props) {
  const { entityCollection} = useContext(TaxCalculationContext);

  const { entityType } = props;
  const {name, title, list, total} = entityCollection[entityType];
  const classes = useStyles();

  const getLatestRecord = list => {
    if (list.length === 0)
      return null;
    return list.reduce(function (a, b) { return a.date > b.date ? a : b; }, { date: new Date(0, 0, 0) });
  };

  const latestRecord = getLatestRecord(list);
  const latestRecordString = latestRecord ? `${latestRecord.date.toDateString()} - ${latestRecord.desc} - ${latestRecord.amt.toFixed(2)}` : 'no records found';
  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader}
        avatar={<Avatar size="small" aria-label="recipe" className={classes.cardAvatar}>
          {title.substring(0, 2)}
        </Avatar>}
        action={<IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>}
        title={<Typography variant="h6">{title}</Typography>} />
      <CardContent style={{ padding: '0' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                  Total (LKR)
                </Typography>
                <Typography variant="body2" component="p" style={{ fontWeight: 'bold' }}>{total.toFixed(2)}</Typography>
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
        <Button size="small" color="primary" onClick={props.onClickAdd}>add {name}</Button>
      </CardActions>
    </Card>);
}
