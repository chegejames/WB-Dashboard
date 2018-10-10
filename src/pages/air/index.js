import React from 'react';

import About from './About';
import HowSensorsWork from './HowSensorsWork';
import City from './City';
import JoinNetwork from './JoinNetwork';
import Navbar from '../../components/Header/Navbar';
import AirHeader from '../../components/AirComponents/AirHeader';
import Footer from '../../components/Footer';
import IndoorOutdoor from '../../components/AirComponents/IndoorOutdoor';
import Issues from '../../components/AirComponents/Issues';
import Stories from '../../components/About/Stories';
import Support from '../../components/Support';

export { About, HowSensorsWork, City, JoinNetwork };

function AirHome() {
  return (
    <React.Fragment>
      <Navbar />
      <AirHeader />
      <Issues />
      <IndoorOutdoor />
      <Stories />
      <Support />
      <Footer />
    </React.Fragment>
  );
}

export default AirHome;