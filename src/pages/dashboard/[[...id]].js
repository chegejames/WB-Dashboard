import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from 'next-auth/client';

import API, { COUNTRIES_LOCATION } from 'api';

import Navbar from 'components/Header/Navbar';
import PartnerLogos from 'components/PartnerLogos';
import Footer from 'components/Footer';
import SensorMap from 'components/SensorMap';
import QualityStatsGraph from 'components/City/QualityStatsGraph';
// import CountryHazardComparisonChart from 'components/Country/City';
import HazardReading from 'components/City/HazardReadings';
import AQIndex from 'components/City/AQIndex';

import NotFound from 'pages/404';
import config from '../../config';

const DEFAULT_COUNTRY = 'africa';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    // TODO(kilemensi): This is hack to force the page to be 100% wide w/o
    //                  horizontal scrollbars.
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
  },
  graphContainer: {
    maxWidth: '82rem',
    width: '100%',
    color: 'black',
    textAlign: 'center',
    scrollMarginTop: '5.9rem',
    [theme.breakpoints.down('xs')]: {
      scrollMarginTop: '8.9rem',
    },
  },
  section: {
    width: '100%',
    color: 'black',
    textAlign: 'center',
    scrollMarginTop: '3.2rem',
    [theme.breakpoints.down('xs')]: {
      scrollMarginTop: '6.3rem',
    },
  },
  topMargin: {
    marginTop: '1.2rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: '4.3rem',
    },
  },
  loading: {
    textAlign: 'center',
  },
  loadingContainer: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hazardContainer: {
    flexDirection: 'column',
  },
}));

const DASHBOARD_PATHNAME = '/dashboard';

function Country({ country: countrySlug, data, errorCode, ...props }) {
  const classes = useStyles(props);
  const [session] = useSession();
  const [country, setCountry] = useState(countrySlug);

  useEffect(() => {
    if (!session) {
      Router.push('/');
    }
  }, [session]);

  // if !data, 404
  if (!COUNTRIES_LOCATION[country] || errorCode >= 400) {
    return <NotFound />;
  }

  const handleSearch = (option) => {
    const searchedCountry = (option && option.value) || DEFAULT_COUNTRY;
    if (searchedCountry !== country) {
      setCountry(searchedCountry);
      const countryUrl = `${DASHBOARD_PATHNAME}/[id]`;
      const countryAs = `${DASHBOARD_PATHNAME}/${searchedCountry}`;
      Router.push(countryUrl, countryAs, { shallow: true });
    }
  };

  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <Grid
        className={classes.root}
        justify="center"
        alignItems="center"
        container
      >
        <Grid
          item
          lg={12}
          id="map"
          className={`${classes.section} ${classes.topMargin}`}
        >
          <SensorMap
            zoom={COUNTRIES_LOCATION[country].zoom}
            latitude={COUNTRIES_LOCATION[country].latitude}
            longitude={COUNTRIES_LOCATION[country].longitude}
          />
        </Grid>
        <Grid
          item
          container
          lg={12}
          id="graph"
          className={classes.graphContainer}
        >
          <Grid item xs={12} lg={6}>
            <Typography> Air Quality in Kenya</Typography>

            <QualityStatsGraph
              yLabel="PM2.5"
              xLabel="Date"
              data={config.airData}
            />
            <Typography> Air Quality in Africa</Typography>
            <QualityStatsGraph
              yLabel="PM10"
              xLabel="Date"
              data={config.multiAirData}
            />
          </Grid>
          {/* GERTRUDE: This is a bar graph visualizing least/most hazardous */}
          {/* <Grid item xs={12} lg={6}>
            <Typography> Most Hazardous Readings in Africa</Typography>
            <CountryHazardComparisonChart
              xLabel="Country"
              data={config.multiAirData}
            />

            <Typography> Least Hazardous Readings in Africa</Typography>
            <CountryHazardComparisonChart
              xLabel="Country"
              data={config.leastAirData}
            />
          </Grid> */}

          <Grid
            container
            justify="center"
            alignItems="center"
            item
            xs={12}
            lg={6}
            className={classes.hazardContainer}
          >
            <HazardReading />
          </Grid>

          <Grid item lg={12} justify="center">
            <AQIndex />
          </Grid>
        </Grid>
        <Grid item id="partners" className={classes.section} xs={12}>
          <PartnerLogos />
        </Grid>
        <Grid id="contacts" className={classes.section} item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}

Country.propTypes = {
  country: PropTypes.string,
  data: PropTypes.shape({
    air: PropTypes.shape({}).isRequired,
    weeklyP2: PropTypes.shape({}).isRequired,
  }),
  errorCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

Country.defaultProps = {
  country: undefined,
  data: undefined,
  errorCode: false,
};

export async function getStaticPaths() {
  const fallback = false;
  const defaultRoute = { params: { id: [] } };
  const paths = Object.values(COUNTRIES_LOCATION).map((country) => ({
    params: { id: [country.slug] },
  }));
  paths.push(defaultRoute);

  return { fallback, paths };
}

export async function getStaticProps({ params: { id: countryProps } }) {
  // Fetch data from external API
  const country = countryProps || DEFAULT_COUNTRY;
  const airRes = await API.getAirData(country);
  const weeklyP2Res = await API.getWeeklyP2Data(country);
  let errorCode = airRes.statusCode > 200 && airRes.statusCode;

  errorCode =
    !errorCode && weeklyP2Res.statusCode > 200 && weeklyP2Res.statusCode;
  const air = (!errorCode && (await airRes.json())) || {};
  const weeklyP2 = (!errorCode && (await weeklyP2Res.json())) || {};
  const data = { air, weeklyP2 };
  // Pass data to the page via props
  return { props: { errorCode, country, data } };
}

export default Country;
