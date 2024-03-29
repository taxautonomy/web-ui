import React, { useContext, useEffect, useState } from 'react'
import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { AppContext } from '../ContextHelper'
import LoginDialog from './LoginDialog';

const splashPageDelay = 5;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Home(props) {
  const { user } = useContext(AppContext);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const classes = useStyles();
  const [backdropOpen, setBackdropOpen] = useState(true);
  const {isSignedIn, signIn } = props;
  useEffect(() => {
    if (isSignedIn) {
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
