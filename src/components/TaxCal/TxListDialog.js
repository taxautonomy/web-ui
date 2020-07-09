import React, {useContext} from 'react';
import { useTheme } from '@material-ui/core/styles';
import TxList from './TxList';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  IconButton,
  Dialog,
  AppBar,
  Toolbar,
  Transition,
  useMediaQuery
} from '@material-ui/core';
import { AppContext } from '../../ContextHelper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
  },
  toolBar:{
    paddingRight:'8px'
  },

  txListDialogAppBar: {
    position: 'relative',
  },
  txListDialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  txListDialogPaper: {
    minHeight: '90vh',
    maxHeight: '90vh',
  },
}));

export default function TxListDialog(props) {
  const {txCache, activeWorkspace} = useContext(AppContext);
  const {title} = txCache[props.txType];
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const dialogTitle = activeWorkspace? `${title} [${activeWorkspace.name}]` : title; 
  return (
    <Dialog fullWidth={true}
      classes={fullScreen ? {} : { paper: classes.txListDialogPaper }}
      maxWidth="lg"
      fullScreen={fullScreen}
      open={props.open}
      onClose={props.onClose}
      TransitionComponent={Transition}>
      <AppBar position="static">
        <Toolbar classes={classes.toolbar}>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            {dialogTitle} {fullScreen ? ' - TaxAutonomy' : ''}
          </Typography>
          <IconButton color="inherit" onClick={props.onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <TxList txType={props.txType} showNewTxDialog={props.showNewTxDialog} />
    </Dialog>
  );
}
