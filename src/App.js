import React, { useState, useReducer } from 'react';
import TaxDiff from './components/TaxDiff/Main'
import TaxCal from './components/TaxCal/Main'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Summary from './components/TaxCal/Summary';
import Header from './components/Header';
import {TaxCalculationContext, EntityReducer} from './AppContext' 
import Config from './Config';

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

  const addEntity     = (entityTypeKey, newEntity) => modifyEntities({ type: 'add', entityTypeKey: entityTypeKey, entity: newEntity });
  const updateEntity  = (entityTypeKey, newEntity) => modifyEntities({ type: 'update', entityTypeKey: entityTypeKey, entity: newEntity });
  const deleteEntity  = (entityTypeKey, newEntity) => modifyEntities({ type: 'delete', entityTypeKey: entityTypeKey, entity: newEntity });

  return (
    <React.Fragment>
      <CssBaseline />
      <TaxCalculationContext.Provider value={{currentScheme, setCurrentScheme, entityCollection, addEntity, updateEntity, deleteEntity}} >
        <ThemeProvider theme={theme}>
          <Header />
          <Container maxWidth="lg">
            <Router>
              <Route exact path="/" component={Summary} />
              <Route exact path="/diff" component={TaxDiff} />
              <Route path="/cal" component={TaxCal} />
            </Router>
          </Container>
        </ThemeProvider>
      </TaxCalculationContext.Provider>
    </React.Fragment>
  );
}
