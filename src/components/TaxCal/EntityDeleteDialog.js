import React from 'react';
import { useTheme } from '@material-ui/core/styles';

import {
  Typography,
  Dialog,
  AppBar,
  Toolbar,
  useMediaQuery,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent
} from '@material-ui/core';


export default function EntityDeleteDialog(props) {
  const { entity, entityType } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const DialogTitleBar = () => {

    const titleText = `Delete ${props.entityType.name} Confirmation`;

    const titleFullScreen = (
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            {titleText} - TaxAutonomy
		      </Typography>
        </Toolbar>
      </AppBar>
    );

    const titleNormal = (
      <DialogTitle id="form-dialog-title">{titleText}</DialogTitle>
    );

    return (fullScreen ? titleFullScreen : titleNormal)
  };

  const handleClickYes = () => {
    props.onSubmit(entity);
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}>
      <DialogTitleBar />
      <DialogContent>
        <Typography variant="subtitle1">Are you sure to delete the following {entityType.name} ?</Typography>
        <Card>
          <CardContent>
            <Typography>Date: {entity.date}</Typography>
            <Typography>Description: {entity.desc}</Typography>
            <Typography>Amount: {entity.amt.toFixed(2)}</Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClickYes()} variant="outlined" color="primary">Yes</Button>
        <Button onClick={() => props.onCancel()} variant="outlined" color="primary">No</Button>
      </DialogActions>
    </Dialog>
  );
}
