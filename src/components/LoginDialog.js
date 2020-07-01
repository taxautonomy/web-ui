import React, {} from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, AppBar, Toolbar, Typography,useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
export default function LoginDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const DialogTitleBar = () => {

        const titleText = "Sign in"

        const titleFullScreen = (
            <AppBar position="static" >
                <Toolbar>
                    <Typography variant="h5" style={{ flexGrow: 1 }}>
                        {titleText} - TaxAutonomy
              </Typography>
                </Toolbar>
            </AppBar>
        );

        const titleNormal = (<DialogTitle id="form-dialog-title">{titleText}</DialogTitle>);

        return (fullScreen ? titleFullScreen : titleNormal)
    };

    return (
        <Dialog open={props.open} fullScreen={fullScreen} aria-labelledby="form-dialog-title">
            <DialogTitleBar />
            <DialogContent>
                <div className="modalInputRow">
                    <Button onClick={() => props.onSubmit('google') }><img alt="sign in with google" src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"/></Button>
                </div>
                <div className="modalInputRow">
                </div>
                <div className="modalInputRow">
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.onClose()} variant="outlined" color="primary">Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
