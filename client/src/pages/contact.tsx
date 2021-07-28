import * as React from 'react';
import Layout from '../components/layout';
import {FormattedMessage} from 'gatsby-plugin-intl';

interface ContactPageProps {
  location: Location;
}

const ContactPage = ({location}: ContactPageProps) => {
  const generalemail = 'screeningtool.feedback@usds.gov';
  const techemail = 'screeningtool.support@usds.gov';

  return (<Layout location={location}>
    <section className={'usa-prose'}>
      <h2><FormattedMessage
        id={'contact.pageheader'}
        description={'H2 header for contact page'}
        defaultMessage={'Contact'}/></h2>
      <h3><FormattedMessage
        id={'contact.sectionheader'}
        description={'H3 header for contact page'}
        defaultMessage={'Email us'}/></h3>

      <p>
        <FormattedMessage
          id={'contact.general'}
          description={'Contact page body text'}
          defaultMessage={`
              For general feedback, email {general_email_address}
          `}
          values={{
            general_email_address: <a href={`mailto:${generalemail}`}>{generalemail}</a>,
          }}/>
      </p>
      <p>
        <FormattedMessage
          id={'contact.general'}
          description={'Contact page body text'}
          defaultMessage={`
              For technical support, email {tech_email_address}
          `}
          values={{
            tech_email_address: <a href={`mailto:${techemail}`}>{techemail}</a>,
          }}/>
      </p>
    </section>
  </Layout>
  );
};

export default ContactPage;
