import * as React from 'react';
import Layout from '../components/layout';

interface ContactPageProps {
  location: Location;
}

const ContactPage = ({location}: ContactPageProps) => {
  return (<Layout location={location}>
    <section className={'usa-prose'}>
      <h1>Contact</h1>
      <p>
        <i>Information pending</i>
      </p>
    </section>
  </Layout>
  );
};

export default ContactPage;
