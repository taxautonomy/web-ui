import React, { useContext, useEffect, useState } from 'react'
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { TaxCalculationContext } from '../AppContext'
import LoginDialog from './LoginDialog';

const splashPageDelay = 5;

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
  const [backdropOpen, setBackdropOpen] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      console.log(googleUser)
      setBackdropOpen(false)
    }
    else {
      const to = setTimeout(function () {
        setBackdropOpen(false)
        setShowLoginDialog(true)
      }, splashPageDelay * 1000);
      return () => clearTimeout(to)
    }
  }, [isSignedIn])

  return (
    <Container>
      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress />
      </Backdrop>
      <LoginDialog open={showLoginDialog}
        onSubmit={() => { setShowLoginDialog(false); signIn() }}
        onClose={() => setShowLoginDialog(false)} />
    </Container>
  )
}
