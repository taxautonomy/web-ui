import React, { useState, useReducer, useEffect, Fragment } from 'react';
import TaxCal from './components/TaxCal/Main'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Summary from './components/TaxCal/Summary';
import Header from './components/Header';
import { TaxCalculationContext, InitListReducer } from './AppContext'
import LeftNav from './components/LeftNav';
import Config from './Config'
import axios from 'axios'
import { useGoogleLogin } from 'react-use-googlelogin'
import Home from './components/Home';

const theme = createMuiTheme({
  palette: {
    //primary:blueGrey,
    //type:'dark'
  }
});

const entityTypeArray = [
  { key: 'in', name: 'Income', title: 'Income', list: [], total: 0 },
  { key: 'qp', name: 'Qualifying Payment', title: 'Qualifying Payments', list: [], total: 0 },
  { key: 'tp', name: 'Tax Payment', title: 'Tax Payments', list: [], total: 0 }
];

const entityTypes = {};
entityTypeArray.forEach(i => entityTypes[i.key] = i);

export default function App() {
  const [currentScheme, setCurrentScheme] = useState(null);
  const [entityCollection, initList] = useReducer(InitListReducer, entityTypes);
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const googleLogin = useGoogleLogin({
    clientId: Config.googleClientId,
  })
  const { isSignedIn, googleUser } = googleLogin;
  const [user, setUser] = useState(null);

  const refreshList = (entityTypeKey) => {
    axios.get(Config.getApiHost() + '/api/ws/' + currentScheme.id + '/tx?type=' + entityTypeKey).then(getResponse => {
      initList({types:[entityTypeKey], list: getResponse.data})
    })
  }

  const addEntity = (newEntity) => {
    axios.post(Config.getApiHost() + '/api/ws/' + currentScheme.id + '/tx', newEntity).then(res => {
      refreshList(newEntity.type)
    })
  }

  const updateEntity = (newEntity) => {
    axios.post(Config.getApiHost() + '/api/ws/' + currentScheme.id + '/tx/' + newEntity.id, newEntity).then(res => {
      refreshList(newEntity.type)
    })
  }
  const deleteEntity = (newEntity) => {
    axios.delete(Config.getApiHost() + '/api/ws/' + currentScheme.id + '/tx/' + newEntity.id).then(res => {
      refreshList(newEntity.type)
    })
  }

  useEffect(() => {
    if (isSignedIn) {
      axios.get(Config.getApiHost() + '/api/users?email=' + googleUser.profileObj.email).then(res => {
        setUser(res.data)
      })
    }

  }, [isSignedIn])

  useEffect(() => {
    if (user) {
      axios.get(Config.getApiHost() + '/api/users/' + user.id + '/ws').then(res => {
        setSchemes(res.data)
      })
    }
  }, [user])

  useEffect(() => {
    setCurrentScheme(schemes.find(scheme => scheme.is_default))
  }, [schemes])

  useEffect(() => {
    if (currentScheme && isSignedIn) {
      axios.get(Config.getApiHost() + '/api/ws/' + currentScheme.id + '/tx').then(res => {
          initList({ types: ['in','qp', 'tp'], list: res.data })
      })
    }
  }, [currentScheme])


  return (
    <React.Fragment>
      <CssBaseline />
      <TaxCalculationContext.Provider value={{
        currentScheme, setCurrentScheme,
        entityCollection, addEntity, updateEntity, deleteEntity,
        googleLogin,
        schemes, setSchemes,
        user
      }} >
        <ThemeProvider theme={theme}>
          {googleLogin.isSignedIn ? (
            <Fragment>
              <Header onClickMenu={() => setShowLeftNav(true)} />
              <LeftNav open={showLeftNav} onClickHide={() => setShowLeftNav(false)} onBlur={() => alert('test')} />
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
    </React.Fragment>
  );
}
