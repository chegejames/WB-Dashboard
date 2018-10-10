import React from 'react';

import { Grid, Typography } from '@material-ui/core';

import CityGauge from './CityGauge';

export default function AirCityHeaderContent() {
  return (
    <Grid container item xs={12} style={{ position: 'absolute', top: '12rem' }}>
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="subheading" style={{ color: 'white' }}>
          THE AIR POLLUTION IN{' '}
        </Typography>
        <Typography variant="display1" style={{ color: 'white' }}>
          NAIROBI, KENYA
        </Typography>
      </Grid>
      <CityGauge airPollMeasurement={32} />
    </Grid>
  );
}