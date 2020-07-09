import React, {  } from 'react';
import { Grid } from '@material-ui/core';
import TxTypeGridItem from './TxTypeGridItem';
import TaxSummaryGridItem from './TaxSummaryGridItem';

export default function Summary() {

  return (
    <Grid container style={{ marginTop: 10 }} spacing={3}>
      <TaxSummaryGridItem xs={12} />
      <TxTypeGridItem txType='in' xs={12} sm={12} md={4} />
      <TxTypeGridItem txType='qp' xs={12} sm={6} md={4} />
      <TxTypeGridItem txType='tp' xs={12} sm={6} md={4} />
    </Grid>
  );
}
