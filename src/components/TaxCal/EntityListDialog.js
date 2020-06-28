import React, {useContext} from 'react';
import { useTheme } from '@material-ui/core/styles';
import EntityList from './EntityList';
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
import { TaxCalculationContext } from '../../AppContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
  },
  toolBar:{
    paddingRight:'8px'
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
}));

export default function EntityListDialog(props) {
  const {entityCollection, currentScheme} = useContext(TaxCalculationContext);
  const {title} = entityCollection[props.entityType];
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const dialogTitle = currentScheme? `${title} [${currentScheme.name}]` : title; 
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
            {dialogTitle} {fullScreen ? ' - TaxAutonomy' : ''}
          </Typography>
          <IconButton color="inherit" onClick={props.onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <EntityList entityType={props.entityType} showNewEntityDialog={props.showNewEntityDialog} />
    </Dialog>
  );
}
