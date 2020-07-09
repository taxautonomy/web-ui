import React, { useState, useReducer, useEffect, Fragment } from 'react';
import TaxCal from './components/TaxCal/Main'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider, Backdrop, CircularProgress } from '@material-ui/core'
import Summary from './components/TaxCal/Summary';
import Header from './components/Header';
import { AppContext, TxCacheReducer, DataLoadReducer } from './ContextHelper'
import LeftNav from './components/LeftNav';
import Config from './Config'
import axios from 'axios'
import { useGoogleLogin } from 'react-use-googlelogin'
import Home from './components/Home';
import { makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    //primary:blueGrey,
    //type:'dark'
  }
});


const useStyles = makeStyles((theme) => ({

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));
const txTypeArray = [
  { key: 'in', name: 'Income', title: 'Income', list: [], total: 0 },
  { key: 'qp', name: 'Qualifying Payment', title: 'Qualifying Payments', list: [], total: 0 },
  { key: 'tp', name: 'Tax Payment', title: 'Tax Payments', list: [], total: 0 }
];

const txTypes = {};
txTypeArray.forEach(i => txTypes[i.key] = i);

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [txCache, modifyTxCache] = useReducer(TxCacheReducer, txTypes);
  const [tax, setTax] = useState(null)
  const [loading, setLoading] = useReducer(DataLoadReducer, { loadingCount: 0, loading: true });
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const googleLogin = useGoogleLogin({ clientId: Config.googleClientId, uxMode: "redirect", redirectUri: window.location.href })
  const { isSignedIn, googleUser } = googleLogin;
  const [user, setUser] = useState(null);
  const apiHost = Config.getApiHost();
  const classes = useStyles();

  // const refreshList = (txTypeKey) => {

  //   axios.get(Config.getApiHost() + '/api/ws/' + activeWorkspace.id + '/tx?type=' + txTypeKey).then(getResponse => {
  //     modifyTxCache({ action: 'refresh', types: [txTypeKey], list: getResponse.data })
  //   })
  // }

  const buildTxFromJson = json => {
    return { ...json, date: new Date(json.date) }
  }
  const initSchemes = (workspaces) => {
    workspaces.forEach(scheme => {
      scheme.start_date = new Date(scheme.start_date);
      scheme.end_date = new Date(scheme.end_date);
    })

    setWorkspaces(workspaces);
  }

  const apiRequestOptions = () => ({
    headers:{
      'Authorization': 'bearer ' + user.id
    }
  })

  const addTx = (newTx) => {
    axios.post(apiHost + '/api/ws/' + activeWorkspace.id + '/tx', newTx, apiRequestOptions()).then(res => {
      modifyTxCache({ action: 'add', tx: buildTxFromJson(res.data) })
    })
  }

  const updateTx = (newTx) => {
    axios.post(apiHost + '/api/ws/' + activeWorkspace.id + '/tx/' + newTx.id, newTx, apiRequestOptions()).then(res => {
      modifyTxCache({ action: 'update', tx: buildTxFromJson(res.data) })
    })
  }

  const deleteTx = (newTx) => {
    axios.delete(apiHost + '/api/ws/' + activeWorkspace.id + '/tx/' + newTx.id, apiRequestOptions()).then(res => {
      modifyTxCache({ action: 'delete', tx: newTx })
    })
  }

  useEffect(() => {
    if (isSignedIn) {
      axios.get(apiHost + '/api/users?email=' + googleUser.profileObj.email).then(res => {
        setUser(res.data)
        initSchemes(res.data.workspaces)
      })
    }

  }, [isSignedIn])

  useEffect(() => {
    setActiveWorkspace(workspaces.find(scheme => scheme.is_default))
  }, [workspaces])

  useEffect(() => {
    if (activeWorkspace && isSignedIn) {
      setLoading(true);
      axios.get(apiHost + '/api/ws/' + activeWorkspace.id, apiRequestOptions()).then(res => {
        modifyTxCache({ action: 'init', types: ['in', 'qp', 'tp'], list: res.data.transactions })
        setTax(res.data.tax)
        setLoading(false);
      })
    }
  }, [activeWorkspace])

  return (
    <Fragment>
      <CssBaseline />
      <AppContext.Provider value={{
        activeWorkspace, setActiveWorkspace,
        txCache, addTx, updateTx, deleteTx,
        googleLogin,
        workspaces, setWorkspaces,
        user,
        loading, setLoading,
        tax
      }} >
        <ThemeProvider theme={theme}>
          <Backdrop className={classes.backdrop} open={loading.loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
          {googleLogin.isSignedIn ? (
            <Fragment>
              <Header onClickMenu={() => setShowLeftNav(true)} />
              <LeftNav open={showLeftNav} onClickHide={() => setShowLeftNav(false)} />
              <Container maxWidth="lg">
                <Router>
                  <Route exact path="/" component={Summary} />
                  <Route path="/cal" component={TaxCal} />
                </Router>
              </Container>
            </Fragment>
          ) : (
              <Home />
            )}

        </ThemeProvider>
      </AppContext.Provider>
    </Fragment>
  );
}
