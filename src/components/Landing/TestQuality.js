import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardActionArea, CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import ComingSoon from '../ComingSoon';

import air from '../../assets/images/button/airbtn.png';
import water from '../../assets/images/button/waterbtn.png';
import sound from '../../assets/images/button/soundbtn.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    paddingTop: '2rem'
  },
  img: {
    height: '5.5rem',
    width: 'auto',
    margin: '3rem auto',
    [theme.breakpoints.up('md')]: {
      height: '12.5rem',
      margin: '0 auto',
      padding: '3rem'
    }
  },
  airCard: {
    backgroundColor: theme.palette.primary.light,
    height: '12.5rem',
    width: '10.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      width: '15.625rem'
    }
  },
  waterCard: {
    backgroundColor: '#4972B8',
    height: '12.5rem',
    width: '10.5rem',
    [theme.breakpoints.up('md')]: {
      width: '15.625rem'
    }
  },
  soundCard: {
    backgroundColor: '#B64598',
    height: '12.5rem',
    width: '10.5rem',
    [theme.breakpoints.up('md')]: {
      width: '15.625rem'
    }
  },
  popup: {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    zIndex: '2',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: '0',
    visibility: 'hidden',
    transform: 'scale(1.1)',
    transition: 'visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s'
  },
  popupcontent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    backgroundColor: 'white',
    padding: '1rem 1.5rem',
    width: '24rem'
  },
  closeButton: {
    float: 'right',
    width: '1.5rem',
    lineHeight: '1.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '0.25rem',
    backgroundColor: 'lightgray',

    '&:hover': {
      backgroundColor: 'darkgray'
    }
  },
  showpopup: {
    opacity: '1',
    visibility: 'visible',
    transform: 'scale(1.0)',
    transition: 'visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s'
  },
  testTitle: {
    color: 'white',
    paddingTop: '2rem',
    fontSize: '1rem',
    fontFamily: theme.typography.h6.fontFamily,
    fontWeight: 900
  }
});

class TestQuality extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };

    this.toggleShowAlert = this.toggleShowAlert.bind(this);
  }

  toggleShowAlert() {
    this.setState(prevState => ({ show: !prevState.show }));
  }

  render() {
    const { classes } = this.props;
    const { show } = this.state;

    return (
      <Grid
        container
        className={classes.root}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            className={classes.testTitle}
          >
            Test the quality of the city&apos;s
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ paddingTop: '1rem', paddingBottom: '3rem' }}
          >
            <ComingSoon show={show} onClose={this.toggleShowAlert} />
            {/* <Grid
              id="popupbox"
              className={classNames(classes.popup, {
                [classes.showpopup]: show
              })}
            >
              <div className={classes.popupcontent}>
                <span
                  onClick={this.toggleShowAlert}
                  className={classes.closeButton}
                >
                  &times;
                </span>
                <h1>Coming Soon</h1>
              </div>
            </Grid> */}
            <Grid item>
              <Link to="/air">
                <Card className={classes.airCard}>
                  <CardMedia
                    component="img"
                    className={classes.img}
                    image={air}
                    title="Air"
                  />
                </Card>
              </Link>
            </Grid>
            <Grid item>
              <Card className={classes.waterCard}>
                <CardActionArea onClick={this.toggleShowAlert}>
                  <CardMedia
                    component="img"
                    className={classes.img}
                    image={water}
                    title="water"
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.soundCard}>
                <CardActionArea onClick={this.toggleShowAlert}>
                  <CardMedia
                    component="img"
                    className={classes.img}
                    image={sound}
                    title="sound"
                  />
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

TestQuality.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TestQuality);
