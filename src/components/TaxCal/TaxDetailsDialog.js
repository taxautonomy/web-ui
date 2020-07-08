import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  IconButton,
  Dialog,
  AppBar,
  Toolbar,
  Transition,
  useMediaQuery,
  Container,
  Grid, Card, CardContent, CardHeader, Avatar
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
  },
  toolBar: {
    paddingRight: '8px'
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

export default function TaxDetailsDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { taxSummary } = props;
  return (
    <Dialog fullWidth={true}
      classes={fullScreen ? {} : { paper: classes.entityListDialogPaper }}
      maxWidth="lg"
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}>
      <AppBar position="static">
        <Toolbar classes={classes.toolbar}>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            Tax Calculation Details{fullScreen ? ' - TaxAutonomy' : ''}
          </Typography>
          <IconButton color="inherit" onClick={props.onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Grid container spacing={3} style={{ marginTop: '10px' }}>
          <Grid item className={classes.card} xs={12} md={4}>
            <Card>
              <CardHeader className={classes.cardHeader}
                avatar={<Avatar size="small" aria-label="recipe" className={classes.cardAvatar}> B
                </Avatar>}
                title={<Typography variant="h6">{taxSummary && taxSummary.tax_total < 0 ? 'Refund to be claimed ' : 'Balance to be paid '}
                </Typography>} />
              <CardContent>
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>{taxSummary ? taxSummary.tax_total.toFixed(2) : '...'}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item className={classes.card} xs={12} md={4}>
            <Card>
              <CardHeader className={classes.cardHeader}
                avatar={<Avatar size="small" aria-label="recipe" className={classes.cardAvatar}> B
                </Avatar>}
                title={<Typography variant="h6">Taxable Income
                </Typography>} />
              <CardContent>
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>{taxSummary ? taxSummary.taxable_income.toFixed(2) : '...'}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
              Taxable Income (LKR)
            </Typography>
            <Typography variant="body2" component="p" style={{ fontWeight: 'bold' }}>{taxSummary ? taxSummary.taxable_income.toFixed(2) : '...'}</Typography>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}