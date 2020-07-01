import React, { useState, useReducer, useEffect } from 'react';
import TaxCal from './components/TaxCal/Main'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Summary from './components/TaxCal/Summary';
import Header from './components/Header';
import { TaxCalculationContext, EntityReducer } from './AppContext'
import LeftNav from './components/LeftNav';
import Config from './Config'
import axios from 'axios'
import { useGoogleLogin } from 'react-use-googlelogin'

const theme = createMuiTheme({
  palette: {
    //primary:blueGrey,
    //type:'dark'
  }
});

const entityTypeArray = [
  { key: 'income', name: 'Income', title: 'Income', list: [], total: 0 },
  { key: 'qualifyingPayment', name: 'Qualifying Payment', title: 'Qualifying Payments', list: [], total: 0 },
  { key: 'taxPayment', name: 'Tax Payment', title: 'Tax Payments', list: [], total: 0 }
];

const entityTypes = {};
entityTypeArray.forEach(i => entityTypes[i.key] = i);

export default function App() {
  const [currentScheme, setCurrentScheme] = useState(null);
  const [entityCollection, modifyEntities] = useReducer(EntityReducer, entityTypes);
  const [showLeftNav, setShowLeftNav] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const googleLogin = useGoogleLogin({
    clientId: Config.googleClientId,
})
  const addEntity = (entityTypeKey, newEntity) => modifyEntities({ type: 'add', entityTypeKey: entityTypeKey, entity: newEntity });
  const updateEntity = (entityTypeKey, newEntity) => modifyEntities({ type: 'update', entityTypeKey: entityTypeKey, entity: newEntity });
  const deleteEntity = (entityTypeKey, newEntity) => modifyEntities({ type: 'delete', entityTypeKey: entityTypeKey, entity: newEntity });

  useEffect(() => {
    axios.get(Config.getApiHost() + '/api/schemes').then(res => {
      setSchemes(res.data);
    })
  }, [])

  useEffect(() => {
    setCurrentScheme(schemes.find(scheme => scheme.default))
  }, [schemes])

  return (
    <React.Fragment>
      <CssBaseline />
      <TaxCalculationContext.Provider value={{
        currentScheme, setCurrentScheme,
        entityCollection, addEntity, updateEntity, deleteEntity,
        googleLogin,
        schemes, setSchemes
      }} >
        <ThemeProvider theme={theme}>
          <Header onClickMenu={() => setShowLeftNav(true)} />
          <LeftNav open={showLeftNav} onClickHide={() => setShowLeftNav(false)} onBlur={() => alert('test')} />
          <Container maxWidth="lg">
            <Router>
              <Route exact path="/" component={Summary} />
              <Route path="/cal" component={TaxCal} />
            </Router>
          </Container>
        </ThemeProvider>
      </TaxCalculationContext.Provider>
    </React.Fragment>
  );
}
