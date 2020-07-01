import React, {useEffect, useContext} from 'react'
import { useGoogleLogin } from 'react-use-googlelogin'
import { Button, Avatar, Dialog, DialogContent, DialogTitle, DialogActions, AppBar, Toolbar, Typography,useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Config from '../Config'
import {TaxCalculationContext} from '../AppContext'
export default function LoginDialog(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const { signIn, googleUser, isSignedIn } = useContext(TaxCalculationContext).googleLogin;

    useEffect(() => {
        if(isSignedIn){
            console.log("signed in:", isSignedIn);
            console.log('googleUser:', googleUser)
            props.onClose();
        }

    }, [isSignedIn])

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
                    <Button onClick={()=>signIn() }><img src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"/></Button>
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
