import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl, FormattedMessage} from 'gatsby-plugin-intl';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import LinkTypeWrapper from '../components/LinkTypeWrapper';

import * as CONTACT_COPY from '../data/copy/contact';
interface IContactPageProps {
  location: Location;
}

const ContactPage = ({location}: IContactPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>

        <h1>{intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_HEADING)}</h1>

        <Grid row>
          <Grid col>
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
                  <LinkTypeWrapper
                    linkText= {CONTACT_COPY.FEEDBACK_EMAIL}
                    internal= {false}
                    url= {`mailto:${CONTACT_COPY.FEEDBACK_EMAIL}`}
                    openUrlNewTab= {true}
                  />,
                }}/>
            </p>
          </Grid>
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default ContactPage;
