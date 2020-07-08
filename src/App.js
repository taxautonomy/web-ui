import React, { useState, useReducer, useEffect, Fragment } from 'react';
import TaxCal from './components/TaxCal/Main'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider , Backdrop, CircularProgress} from '@material-ui/core'
import Summary from './components/TaxCal/Summary';
import Header from './components/Header';
import { TaxCalculationContext, InitListReducer, DataLoadReducer } from './AppContext'
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
const entityTypeArray = [
  { key: 'in', name: 'Income', title: 'Income', list: [], total: 0, isLoading: true },
  { key: 'qp', name: 'Qualifying Payment', title: 'Qualifying Payments', list: [], total: 0, isLoading: true },
  { key: 'tp', name: 'Tax Payment', title: 'Tax Payments', list: [], total: 0, isLoading: true }
];

const entityTypes = {};
entityTypeArray.forEach(i => entityTypes[i.key] = i);

export default function App() {
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [entityCollection, initList] = useReducer(InitListReducer, entityTypes);
  const [tax, setTax] = useState(null)
  const [loading, setLoading] = useReducer(DataLoadReducer, {loadingCount:0, loading:true});
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const googleLogin = useGoogleLogin({ clientId: Config.googleClientId, uxMode:"redirect", redirectUri:window.location.href })
  const { isSignedIn, googleUser } = googleLogin;
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  const classes = useStyles();

  const refreshList = (entityTypeKey) => {

    axios.get(Config.getApiHost() + '/api/ws/' + activeWorkspace.id + '/tx?type=' + entityTypeKey).then(getResponse => {
      initList({ types: [entityTypeKey], list: getResponse.data })
    })
  }

  const initSchemes = (workspaces) => {
    workspaces.forEach(scheme => {
      scheme.start_date = new Date(scheme.start_date);
      scheme.end_date = new Date(scheme.end_date);
    })

    setWorkspaces(workspaces);
  }

  const addEntity = (newEntity) => {
    axios.post(Config.getApiHost() + '/api/ws/' + activeWorkspace.id + '/tx', newEntity).then(res => {
      refreshList(newEntity.type)
    })
  }

  const updateEntity = (newEntity) => {
    axios.post(Config.getApiHost() + '/api/ws/' + activeWorkspace.id + '/tx/' + newEntity.id, newEntity).then(res => {
      refreshList(newEntity.type)
    })
  }

  const deleteEntity = (newEntity) => {
    axios.delete(Config.getApiHost() + '/api/ws/' + activeWorkspace.id + '/tx/' + newEntity.id).then(res => {
      refreshList(newEntity.type)
    })
  }

  useEffect(() => {
    if (isSignedIn) {
      axios.get(Config.getApiHost() + '/api/users?email=' + googleUser.profileObj.email).then(res => {
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
      axios.get(Config.getApiHost() + '/api/users/'+ user.id + '/ws/' + activeWorkspace.id ).then(res => {
        initList({ types: ['in', 'qp', 'tp'], list: res.data.transactions })
        setTax(res.data.tax)
        setLoading(false);
      })
    }
  }, [activeWorkspace])

  return (
    <Fragment>
      <CssBaseline />
      <TaxCalculationContext.Provider value={{
        activeWorkspace, setActiveWorkspace,
        entityCollection, addEntity, updateEntity, deleteEntity,
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
      </TaxCalculationContext.Provider>
    </Fragment>
  );
}
