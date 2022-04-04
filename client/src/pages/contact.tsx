import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl, FormattedMessage} from 'gatsby-plugin-intl';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import LinkTypeWrapper from '../components/LinkTypeWrapper';
import PublicEngageButton from '../components/PublicEngageButton';
import RequestForInfo from '../components/RequestForInfo';

import * as CONTACT_COPY from '../data/copy/contact';
import * as COMMON_COPY from '../data/copy/common';
interface IContactPageProps {
  location: Location;
}

const ContactPage = ({location}: IContactPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>

        <section className={'page-heading'}>
          <h1>{intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_HEADING)}</h1>
          <PublicEngageButton />
        </section>

        <Grid row gap={6}>

          <Grid desktop={{col: 7}} col={12}>
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
                  linkText= {COMMON_COPY.FEEDBACK_EMAIL}
                  internal= {false}
                  url= {`mailto:${COMMON_COPY.FEEDBACK_EMAIL}`}
                  openUrlNewTab= {true}
                />,
                }}/>
            </p>
            <h3>{CONTACT_COPY.CENSUS_TRACT_FEEDBACK.TITLE}</h3>
            <p>{CONTACT_COPY.CENSUS_TRACT_FEEDBACK.PARAGRAPH1}</p>
            <p>{CONTACT_COPY.CENSUS_TRACT_FEEDBACK.PARAGRAPH2}</p>
            <p>{CONTACT_COPY.CENSUS_TRACT_FEEDBACK.PARAGRAPH3}</p>
          </Grid>
          <Grid desktop={{col: 5}} col={12}>
            <RequestForInfo />
          </Grid>
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default ContactPage;
