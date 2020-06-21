import React from 'react';
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
export default function TaxSummaryCard(props) {
  const { taxSummary } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader}
        avatar={<Avatar size="small" aria-label="recipe" className={classes.cardAvatar}>
          Tx
        </Avatar>}
        action={<IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>}
        title={<Typography variant="h6">Tax Summary</Typography>} />
      <CardContent style={{ padding: '0' }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                  Total (LKR)
                </Typography>
                <Typography variant="body2" component="p" style={{ fontWeight: 'bold' }}>{taxSummary?taxSummary.tax_total.toFixed(2):'...'}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }}>
        <Button size="small" color="primary" onClick={props.onClickMoreInfo}>more info</Button>
      </CardActions>
    </Card>);
}
