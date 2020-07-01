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
  Avatar, Table, TableRow, TableCell, TableBody
} from '@material-ui/core';


export default function LogoutDialog(props) {
  const { googleUser, isSignedIn } = useContext(TaxCalculationContext).googleLogin;

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
        <Typography variant="subtitle1">Are you sure to sign out of the following account ?</Typography>
        {/* {isSignedIn && <Typography display="inline"><Avatar display="inline" alt={googleUser.profileObj.name} src={googleUser.profileObj.imageUrl}></Avatar>{googleUser.profileObj.name}</Typography>} */}
        {isSignedIn && 
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><Avatar display="inline" alt={googleUser.profileObj.email} src={googleUser.profileObj.imageUrl}/></TableCell>
              <TableCell><Typography>{googleUser.profileObj.name}&nbsp;({googleUser.profileObj.email})</Typography></TableCell>
            </TableRow>
          </TableBody>
          </Table>
          }
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClickYes()} variant="outlined" color="primary">Yes</Button>
        <Button onClick={() => props.onCancel()} variant="outlined" color="primary">No</Button>
      </DialogActions>
    </Dialog>
  );
}
