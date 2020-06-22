import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import TaxDetailsDialog  from './TaxDetailsDialog';
import TaxSummaryCard from "./TaxSummaryCard";

export default function TaxSummaryGridItem(props) {
  const [openTaxDetailsDialog, setOpenTaxDetailsDialog] = useState(false);
  const {taxSummary, ...other} = props;

  const showTaxDetailsDialog = (showNewEntityDialog) => {
    setOpenTaxDetailsDialog(true);
  };

  const hideTaxDetailsDialog = () => {
    setOpenTaxDetailsDialog(false);
  };

  return (
    <Grid item {...other}>
      <TaxSummaryCard taxSummary={taxSummary} onClickMoreInfo={showTaxDetailsDialog}/>
      <TaxDetailsDialog taxSummary={taxSummary} open={openTaxDetailsDialog} onClose={hideTaxDetailsDialog}/>
    </Grid>
  );
}
