import React , {useContext} from 'react';
import { useTheme } from '@material-ui/core/styles';
import {TaxCalculationContext} from '../AppContext'

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


export default function LogoutDialog(props) {
  const { signOut, googleUser, isSignedIn } = useContext(TaxCalculationContext).googleLogin;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const DialogTitleBar = () => {

    const titleText = `Sign Out Confirmation`;

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
    props.onSubmit();
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={props.open}>
      <DialogTitleBar />
      <DialogContent>
        <Typography variant="subtitle1">Are you sure to sign out of the account '{isSignedIn && googleUser.profileObj.name}'?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClickYes()} variant="outlined" color="primary">Yes</Button>
        <Button onClick={() => props.onCancel()} variant="outlined" color="primary">No</Button>
      </DialogActions>
    </Dialog>
  );
}
