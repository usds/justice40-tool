import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';

import * as CONTACT_COPY from '../data/copy/contact';

interface ISurveyPageProps {
  location: Location;
}

const SurveyPage = ({location}: ISurveyPageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(CONTACT_COPY.PAGE_INTRO.SURVEY_TEXT)}>

      <J40MainGridContainer>
        <Grid row>
          <Grid col>
            <iframe
              src="https://www.surveymonkey.com/r/cejst-survey"
              width="100%"
              height="100%"
              style={{border: 0}}
            />
          </Grid>
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default SurveyPage;
