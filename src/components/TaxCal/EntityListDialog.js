import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
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
      TransitionComponent={Transition}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            {props.entityType.title} {fullScreen ? ' - TaxAutonomy' : ''}
          </Typography>
          <IconButton color="inherit" onClick={props.onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <EntityList entityType={props.entityType} onAdd={props.onAdd} onUpdate={props.onUpdate} onDelete={props.onDelete} showNewEntityDialog={props.showNewEntityDialog} />
    </Dialog>
  );
}
