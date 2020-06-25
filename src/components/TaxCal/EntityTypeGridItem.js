import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import  EntityListDialog  from './EntityListDialog';
import EntitySummaryCard from "./EntitySummaryCard";

export default function EntityTypeGridItem(props) {
  const { entityType, onAdd, onUpdate, onDelete, ...other } = props;
  const [openEntityListDialog, setOpenEntityListDialog] = useState(false);
  const [openNewEntityDialog, setOpenNewEntityDialog] = useState(false);

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
      <EntitySummaryCard entityType={entityType}
        onClickMoreInfo={() => showEntityListDialog(false)}
        onClickAdd={() => showEntityListDialog(true)} />
      <EntityListDialog entityType={entityType}
        open={openEntityListDialog}
        showNewEntityDialog={openNewEntityDialog}
        onClose={() => hideEntityListDialog()}/>
    </Grid>
  );
}
