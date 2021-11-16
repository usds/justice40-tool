import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl, FormattedMessage} from 'gatsby-plugin-intl';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import SurveyButton from '../components/SurveyButton';

import * as CONTACT_COPY from '../data/copy/contact';
import * as styles from './pageStyles.module.scss';

interface IContactPageProps {
  location: Location;
}

const ContactPage = ({location}: IContactPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>

        {/* Primary Heading row */}
        <Grid row className={styles.pageHeading1}>
          <Grid col={10}>
            <h1>{intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_HEADING)}</h1>
          </Grid>
          <Grid col={2} className={styles.surveyButtonContainer}>
            <SurveyButton />
          </Grid>
        </Grid>

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
                    <a
                      href={`mailto:${CONTACT_COPY.FEEDBACK_EMAIL}`}
                      target="_blank"
                      rel="noreferrer">
                      {CONTACT_COPY.FEEDBACK_EMAIL}
                    </a>,
                }}/>
            </p>
          </Grid>
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default ContactPage;
