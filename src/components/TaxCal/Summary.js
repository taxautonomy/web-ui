import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import EntityTypeGridItem from './EntityTypeGridItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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

export default function Summary() {
  const [entities, setEntities] = useState(entityTypes);
  
  const entityAdded = (entityTypeKey, newEntity) => {
    newEntity.id = guid();
    const newList = entities[entityTypeKey].list.concat(newEntity);
    updateList(entityTypeKey, newList);
    console.log(`new ${entityTypeKey} added :`, newEntity)
  }

  const updateList = (entityTypeKey, newList) => {

    let newTotal = 0;
    newList.forEach(i => newTotal += i.amt);

    setEntities({
      ...entities,
      [entityTypeKey]: {
        ...entities[entityTypeKey],
        list: newList,
        total: newTotal
      }
    })
  }

  return (
    <Grid container style={{ marginTop: 10 }} spacing={3}>
      <EntityTypeGridItem entityType={entities['income']} onAdd={entityAdded} xs={12} sm={12} md={4} />
      <EntityTypeGridItem entityType={entities['qualifyingPayment']} onAdd={entityAdded} xs={12} sm={6} md={4} />
      <EntityTypeGridItem entityType={entities['taxPayment']} onAdd={entityAdded} xs={12} sm={6} md={4} />
    </Grid>
  );
}
