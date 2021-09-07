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
  const generalEmail = 'screeningtool.feedback@usds.gov';

  return (
    <Layout location={location}>

      <J40MainGridContainer>
        <AlertWrapper showBetaAlert={true} showLimitedDataAlert={false}/>
      </J40MainGridContainer>

      <J40MainGridContainer>
        <Grid row><Grid col>
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
              defaultMessage={`For general feedback, email {general_email_address}`}
              values={{
                general_email_address:
                    <a href={`mailto:${generalEmail}`}>{generalEmail}</a>,
              }}/>
          </p>
        </Grid></Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default ContactPage;
