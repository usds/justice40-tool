import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl, FormattedMessage} from 'gatsby-plugin-intl';

import AlertWrapper from '../components/AlertWrapper';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';

import * as CONTACT_COPY from '../data/copy/contact';

interface IContactPageProps {
  location: Location;
}

const ContactPage = ({location}: IContactPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>
        <AlertWrapper showBetaAlert={true} showLimitedDataAlert={false}/>
      </J40MainGridContainer>

      <J40MainGridContainer>
        <Grid row>
          <Grid col>
            <h1>
              {intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_HEADING)}
            </h1>
            <h2>
              {intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_SUB_HEADING)}
            </h2>
            <p>
              <FormattedMessage
                id={CONTACT_COPY.CONTACT_VIA_EMAIL.ID}
                description={CONTACT_COPY.CONTACT_VIA_EMAIL.DESCRIPTION}
                defaultMessage={CONTACT_COPY.CONTACT_VIA_EMAIL.DEFAULT_MESSAGE}
                values={{
                  general_email_address:
                    <a href={`mailto:${CONTACT_COPY.FEEDBACK_EMAIL}`}>{CONTACT_COPY.FEEDBACK_EMAIL}</a>,
                }}/>
            </p>
          </Grid>
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default ContactPage;
