import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import  EntityListDialog  from './EntityListDialog';
import SummaryCard from "./SummaryCard";

export default function EntityTypeGridItem(props) {
  const { entityType, onAdd, onUpdate, ...other } = props;
  const [openEntityListDialog, setOpenEntityListDialog] = useState(false);
  const [openNewEntityDialog, setOpenNewEntityDialog] = useState(false);

  const handleAdd = (entityTypeKey, entity) => {
    onAdd(entityTypeKey, entity);
    setOpenNewEntityDialog(false);
  };

  const handleUpdate = (entityTypeKey, entity) => {
    onUpdate(entityTypeKey, entity);
    setOpenNewEntityDialog(false);
  };

  const showEntityListDialog = (showNewEntityDialog) => {
    setOpenEntityListDialog(true);
    setOpenNewEntityDialog(showNewEntityDialog);
  };

  const hideEntityListDialog = () => {
    setOpenEntityListDialog(false);
    setOpenNewEntityDialog(false);
  };

  return (
    <Grid item {...other}>
      <SummaryCard entityType={entityType}
        onClickMoreInfo={() => showEntityListDialog(false)}
        onClickAdd={() => showEntityListDialog(true)} />
      <EntityListDialog entityType={entityType}
        open={openEntityListDialog}
        showNewEntityDialog={openNewEntityDialog}
        onClose={() => hideEntityListDialog()}
        onUpdate={handleUpdate} onAdd={handleAdd} onDelete={props.onDelete}/>
    </Grid>
  );
}
