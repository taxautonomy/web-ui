import React, { useState, useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import EntityTypeGridItem from './EntityTypeGridItem';
import Config from '../../Config';
import axios from 'axios'
import TaxSummaryCard from './TaxSummaryCard';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
  },
  entityListDialogAppBar: {
    position: 'relative',
  },
  entityListDialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  entityListDialogPaper: {
    minHeight: '90vh',
    maxHeight: '90vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const entityTypeArray = [
  { key: 'income', name: 'Income', title: 'Income', list: [], total: 0 },
  { key: 'qualifyingPayment', name: 'Qualifying Payment', title: 'Qualifying Payments', list: [], total: 0 },
  { key: 'taxPayment', name: 'Tax Payment', title: 'Tax Payments', list: [], total: 0 }
];

const entityTypes = {};
entityTypeArray.forEach(i => entityTypes[i.key] = i);

const reducer = (state, action) => {

  const { type, entityTypeKey, entity } = action;

  let newList = [];
  let newTotal = 0;
  let matchIndex = 0;
  console.log('reducer.action:', action);

  switch (type) {
    case 'add':
      entity.id = guid();
      newList = state[entityTypeKey].list.concat(entity);
      break;

    case 'update':
      newList = [...state[entityTypeKey].list]
      matchIndex = newList.findIndex(e => e.id === entity.id);
      newList[matchIndex] = entity;
      console.log("updated list: ", newList);
      break;

    case 'delete':
      newList = [...state[entityTypeKey].list]
      matchIndex = newList.findIndex(e => e.id === entity.id);
      newList.splice(matchIndex, 1);
      console.log("updated list: ", newList);
      break;

    case 'reset':
      return entityTypes;
    default:
      return state;
  }

  newList.forEach(i => newTotal += i.amt);

  return {
    ...state,
    [action.entityTypeKey]: {
      ...state[action.entityTypeKey],
      list: newList,
      total: newTotal
    }
  }
}


export default function Summary() {
  // const [entities, setEntities] = useState(entityTypes);
  const [entityCollection, modifyEntities] = useReducer(reducer, entityTypes);
  const [taxSummary, setTaxSummary] = useState(null);
  const baseUrl = Config.getApiHost();

  const handleAdd = (entityTypeKey, newEntity) => {
    newEntity.id = guid();
    modifyEntities({ type: 'add', entityTypeKey: entityTypeKey, entity: newEntity })
  }

  const handleUpdate = (entityTypeKey, newEntity) => {
    modifyEntities({ type: 'update', entityTypeKey: entityTypeKey, entity: newEntity })
  }

  const handleDelete = (entityTypeKey, newEntity) => {
    modifyEntities({ type: 'delete', entityTypeKey: entityTypeKey, entity: newEntity })
  }

  useEffect(() => {
    axios.get(baseUrl + `/api/schemes/2019-2020-personal-new/taxes?i=${entityCollection['income'].total}&qp=${entityCollection['qualifyingPayment'].total}&tp=${entityCollection['taxPayment'].total}`).then(
      response => {
        setTaxSummary(response.data);
        console.log(response.data);
      }
    )

  }, [entityCollection])
  // const updateList = (entityTypeKey, newList) => {

  //   let newTotal = 0;
  //   newList.forEach(i => newTotal += i.amt);

  //   setEntities({
  //     ...entities,
  //     [entityTypeKey]: {
  //       ...entities[entityTypeKey],
  //       list: newList,
  //       total: newTotal
  //     }
  //   })
  // }

  return (
    <Grid container style={{ marginTop: 10 }} spacing={3}>
      <Grid item xs={12}>
        <TaxSummaryCard taxSummary={taxSummary}/>
      </Grid>
      <EntityTypeGridItem entityType={entityCollection['income']} onAdd={handleAdd} onUpdate={handleUpdate} onDelete={handleDelete} xs={12} sm={12} md={4} />
      <EntityTypeGridItem entityType={entityCollection['qualifyingPayment']} onAdd={handleAdd} onUpdate={handleUpdate} onDelete={handleDelete} xs={12} sm={6} md={4} />
      <EntityTypeGridItem entityType={entityCollection['taxPayment']} onAdd={handleAdd} xs={12} onUpdate={handleUpdate} onDelete={handleDelete} sm={6} md={4} />
    </Grid>
  );
}
