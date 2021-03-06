import React , {useContext} from 'react';
import { useTheme } from '@material-ui/core/styles';
import {AppContext} from '../ContextHelper'

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
  const { user } = useContext(AppContext);

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
        {user && 
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><Avatar display="inline" alt={user.email} src={user.imageUrl}/></TableCell>
              <TableCell><Typography>{user.name}&nbsp;({user.email})</Typography></TableCell>
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
