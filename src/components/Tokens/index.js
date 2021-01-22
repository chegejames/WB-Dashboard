import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  main: {
    paddingBottom: '3rem',
    [theme.breakpoints.up('md')]: {
      width: '59.625rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '79.5rem',
    },
  },
  link: { color: theme.palette.primary.dark },
  typography: {
    paddingTop: theme.spacing(6),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 700,
    fontSize: '1rem',
    paddingTop: '2rem',
    paddingBottom: '1rem',
  },
  dlFirst: {
    padding: '1rem 0.5rem',
    borderTop: '1px solid #f0f4f7',
    borderBottom: '1px solid #f0f4f7',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  dl: {
    padding: '1rem 0.5rem',
    borderBottom: '1px solid #f0f4f7',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  dt: {
    [theme.breakpoints.up('md')]: {
      width: '29.8125rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '39.75rem',
    },
    marginBottom: '0.5rem',
  },
  dd: {
    [theme.breakpoints.up('md')]: {
      width: '29.8125rem',
      float: 'left',
    },
    [theme.breakpoints.up('lg')]: {
      width: '39.75rem',
    },
  },
  code: {
    display: 'inline-block',
    color: theme.palette.secondary.main,
    fontSize: theme.typography.caption.fontSize,
  },
  query: {
    fontSize: theme.typography.caption.fontSize,
  },
  queryParam: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.caption.fontSize,
  },
  queryDescription: {
    fontSize: theme.typography.caption.fontSize,
  },
  var: {
    color: theme.palette.primary.dark,
    fontStyle: 'italic',
    fontSize: theme.typography.caption.fontSize,
  },
  wiki: {
    marginTop: '2rem',
  },
}));

function DataArchives() {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        className={classes.main}
      >
        <Grid item xs={12}>
          <Typography
            variant="h6"
            className={classes.typography}
            component="h2"
          >
            Authorization
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.wiki}>
          <Typography variant="body2" component="h3">
            {/* To access the various Network, you will have to pass the
            Authorization Token for that network in the header file */}
            Accessing data from the API is authorized by the use of a token.
            <br />
            <br />
            While we collect data from various sensor networks, we also allow
            access to data from a particular network. Place the token in the
            Authorization header while making a request and the API will return
            data from that network only. An example using curl would be:
            <br />
            <pre className={classes.queryParam}>
              {`curl -H "Authorization: Token <ACCESS_TOKEN>" http://api.sensors.africa/v2/data/`}
            </pre>
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.wiki}>
          <Typography variant="h6" className={classes.title} component="h3">
            Access Tokens{' '}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify="flex-start"
          alignItems="flex-start"
          className={classes.dl}
        >
          <Grid className={classes.dt}>
            <Typography variant="body2" component="p">
              Purple Air
            </Typography>
          </Grid>

          <Grid item className={classes.dd}>
            <code className={classes.code}>
              {process.env.NEXT_PUBLIC_PURPLE_AIR}
            </code>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify="flex-start"
          alignItems="flex-start"
          className={classes.dl}
        >
          <Grid className={classes.dd}>
            <Typography variant="body2" component="p">
              AirQO
            </Typography>
          </Grid>

          <Grid item className={classes.dt}>
            <code className={classes.code}>
              {process.env.NEXT_PUBLIC_AIRQO}
            </code>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify="flex-start"
          alignItems="flex-start"
          className={classes.dl}
        >
          <Grid className={classes.dt}>
            <Typography variant="body2" component="p">
              OpenAQ
            </Typography>
          </Grid>

          <Grid item className={classes.dd}>
            <code className={classes.code}>
              {process.env.NEXT_PUBLIC_OPENAQ}
            </code>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justify="flex-start"
          alignItems="flex-start"
          className={classes.dl}
        >
          <Grid className={classes.dt}>
            <Typography variant="body2" component="p">
              Data4DSGs*
            </Typography>
          </Grid>

          <Grid item className={classes.dd}>
            <code className={classes.code}>
              {process.env.NEXT_PUBLIC_DATA4_DSGS}
            </code>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.wiki}>
          <Typography variant="caption">
            * Data4DSGs token is a super token that can be used to access all
            data regardless of which networked the data was pulled from.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DataArchives;
