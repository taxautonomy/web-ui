import React, { useContext, useState, useEffect } from 'react';
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
  TableBody, useMediaQuery
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TaxCalculationContext } from '../../AppContext';
import Config from '../../Config';
import axios from 'axios';

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
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { currentScheme, entityCollection } = useContext(TaxCalculationContext);
  const [taxSummary, setTaxSummary] = useState(null);

  useEffect(() => {
    const i_total = entityCollection['in'].total;
    const qp_total = entityCollection['qp'].total;
    const tp_total = entityCollection['tp'].total;

    if (currentScheme) {
      axios.get(Config.getApiHost() + `/api/schemes/${currentScheme.id}/taxes?in=${i_total}&qp=${qp_total}&tp=${tp_total}`).then(
        response => {
          setTaxSummary(response.data);
        }
      )
    }
  }, [entityCollection, currentScheme])

  const AdditionalInfo = () => {
    return isSmallScreen ? (<TableCell />) : (
      <React.Fragment>
        <TableCell>
          <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
            Qualifying Payments (LKR)
        </Typography>
          <Typography variant="body2" component="p" style={{ fontWeight: 'bold' }}>{taxSummary ? taxSummary.qp_actual.toFixed(2) : '...'}</Typography>
        </TableCell>
        <TableCell>
          <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
            Taxable Income (LKR)
          </Typography>
          <Typography variant="body2" component="p" style={{ fontWeight: 'bold' }}>{taxSummary ? taxSummary.taxable_income.toFixed(2) : '...'}</Typography>
        </TableCell>
      </React.Fragment>)
  }

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader}
        avatar={<Avatar size="small" aria-label="recipe" className={classes.cardAvatar}>
          Tx
        </Avatar>}
        action={<IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>}
        title={<Typography variant="h6">Tax Summary for {currentScheme ? currentScheme.name : ''}</Typography>} />
      <CardContent style={{ padding: '0' }}>
        <Table>
          <TableBody>
            <TableRow><TableCell>
              <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                {taxSummary && taxSummary.tax_total < 0 ? 'Refund to be claimed ' : 'Balance to be paid '}(LKR)
                </Typography>
              <Typography variant="body2" component="p" style={{ fontWeight: 'bold' }}>{taxSummary ? taxSummary.tax_total.toFixed(2) : '...'}</Typography>
            </TableCell>
              <AdditionalInfo />
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions style={{ justifyContent: 'space-between' }}>
        <Button size="small" color="primary" onClick={props.onClickMoreInfo}>more info</Button>
      </CardActions>
    </Card>);
}
