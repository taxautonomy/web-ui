import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import  TxListDialog  from './TxListDialog';
import TxSummaryCard from "./TxSummaryCard";

export default function TxTypeGridItem(props) {
  const { txType, onAdd, onUpdate, onDelete, ...other } = props;
  const [openTxListDialog, setOpenTxListDialog] = useState(false);
  const [openNewTxDialog, setOpenNewTxDialog] = useState(false);

  const showTxListDialog = (showNewTxDialog) => {
    setOpenTxListDialog(true);
    setOpenNewTxDialog(showNewTxDialog);
  };

  const hideTxListDialog = () => {
    setOpenTxListDialog(false);
    setOpenNewTxDialog(false);
  };

  return (
    <Grid item {...other}>
      <TxSummaryCard txType={txType}
        onClickMoreInfo={() => showTxListDialog(false)}
        onClickAdd={() => showTxListDialog(true)} />
      <TxListDialog txType={txType}
        open={openTxListDialog}
        showNewTxDialog={openNewTxDialog}
        onClose={() => hideTxListDialog()}/>
    </Grid>
  );
}
