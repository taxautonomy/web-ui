import React, { } from 'react'
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, AppBar, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
export default function LoginDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const googleSignInButtonImage = process.env.PUBLIC_URL + '/img/google_signin_button.png'
    const DialogTitleBar = () => {

        const titleText = "Sign in to TaxAutonomy"

        const titleFullScreen = (
            <AppBar position="static" >
                <Toolbar>
                    <Typography variant="h5" style={{ flexGrow: 1 }}>
                        {titleText}
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
                <div>
                    <Button style={{width:'100%'}} onClick={() => props.onSubmit('google')}>
                        <img alt="sign in with google" src={googleSignInButtonImage} />
                    </Button>
                </div>
                <div>
                    <Button disabled={true} style={{width:'100%'}} 
                    size="large" onClick={() => props.onClose()} 
                    color="primary">Continue as a Guest</Button>
                </div>
                <div>
                </div>
            </DialogContent>
            <DialogActions>
                
            </DialogActions>
        </Dialog>
    )
}
