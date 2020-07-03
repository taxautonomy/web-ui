import React , {useContext, useEffect, useState} from 'react'
import {Backdrop} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { TaxCalculationContext } from '../AppContext'
import LoginDialog from './LoginDialog';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Home() {
    const { signIn, googleUser, isSignedIn } = useContext(TaxCalculationContext).googleLogin;

    const [showLoginDialog, setShowLoginDialog] = useState(false);

    const classes = useStyles();
    const [backdropOpen, setBackdropOpen] = React.useState(true);


    useEffect(() => {
        console.log('signed in', isSignedIn)
        if (isSignedIn) {
          console.log(googleUser)
          setBackdropOpen(false)
        }
        else
        {
          setTimeout(function () {
            setBackdropOpen(false)
            setShowLoginDialog(true)
        }, 1000);

        }
    },[isSignedIn])

    useEffect(() => {

    }, [backdropOpen])

    return (
       <Container>
            <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress/>
      </Backdrop>
      <LoginDialog open={showLoginDialog}
            onSubmit={() => { setShowLoginDialog(false); signIn() }}
            onClose={() => setShowLoginDialog(false)} />
      </Container>
    )
}
