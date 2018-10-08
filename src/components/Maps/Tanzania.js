import React from 'react';

import { Grid, Typography } from '@material-ui/core';

import IframeComponent from './IframeComponent';

function TanzaniaMap() {
  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      style={{ height: '600px', width: '100%' }}
    >
      <Grid container direction="row" justify="center" alignItems="center">
        <Typography variant="subheading" style={{ margin: '1rem' }}>
          SENSORS IN YOUR AREA
        </Typography>
      </Grid>
      <IframeComponent
        title="Map section"
        src="http://map.aq.sensors.africa/#7/-6.937/36.793"
        height="100%"
        width="100%"
        frameBorder="0"
      />
    </Grid>
  );
}

export default TanzaniaMap;
