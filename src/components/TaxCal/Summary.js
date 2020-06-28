import React, {  } from 'react';
import { Grid } from '@material-ui/core';
import EntityTypeGridItem from './EntityTypeGridItem';
import TaxSummaryGridItem from './TaxSummaryGridItem';

export default function Summary() {

  return (
    <Grid container style={{ marginTop: 10 }} spacing={3}>
      <TaxSummaryGridItem xs={12} />
      <EntityTypeGridItem entityType='income' xs={12} sm={12} md={4} />
      <EntityTypeGridItem entityType='qualifyingPayment' xs={12} sm={6} md={4} />
      <EntityTypeGridItem entityType='taxPayment' xs={12} sm={6} md={4} />
    </Grid>
  );
}
