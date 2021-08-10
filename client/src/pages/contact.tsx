import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {FormattedMessage} from 'gatsby-plugin-intl';

import AlertWrapper from '../components/AlertWrapper';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';

interface ContactPageProps {
  location: Location;
}

const ContactPage = ({location}: ContactPageProps) => {
  const generalemail = 'screeningtool.feedback@usds.gov';
  const techemail = 'screeningtool.support@usds.gov';

  return (
    <Layout location={location}>

      <J40MainGridContainer fullWidth={true}>
        <AlertWrapper />
      </J40MainGridContainer>

      <J40MainGridContainer>
        <Grid row><Grid col>
          <section className={'usa-prose'}>
            <h2><FormattedMessage
              id={'contact.pageheader'}
              description={'H2 header for contact page'}
              defaultMessage={'Contact'}/></h2>
            <h3><FormattedMessage
              id={'contact.sectionheader'}
              description={'Heading for page to allow users to contact project maintainers'}
              defaultMessage={'Email us'}/></h3>

            <p>
              <FormattedMessage
                id={'contact.general'}
                description={'Contact page body text'}
                defaultMessage={`
              For general feedback, email {general_email_address}
          `}
                values={{
                  general_email_address:
                    <a href={`mailto:${generalemail}`}>{generalemail}</a>,
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
                  tech_email_address:
                    <a href={`mailto:${techemail}`}>{techemail}</a>,
                }}/>
            </p>
          </section>
        </Grid></Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default ContactPage;
