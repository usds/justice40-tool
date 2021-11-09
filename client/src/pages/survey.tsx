import React from 'react';
import {Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';

import * as SURVEY_COPY from '../data/copy/survey';

const Survey = () => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(SURVEY_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>
        <Grid row>
          <Grid col>
            <h1>
              {intl.formatMessage(SURVEY_COPY.PAGE_INTRO.PAGE_TILE)}
            </h1>
            <p>OMB Control No. 2030-0051</p>
            <p>Approval Expiration Data: 05/21/2024</p>

            <p>Customer Service Generic Survey</p>
            <a href='#burden-statment'>Burden Statement</a>
          </Grid>
        </Grid>

        <Grid row gap="lg">
          <Grid col={8} >
            <iframe
              style={{'borderStyle': 'none'}}
              src="https://www.surveymonkey.com/r/cejst-survey"
              width="100%"
              height="600px"
            />
          </Grid>

          <Grid col={4} >
            <h2>About this survey</h2>

            <p>
                With the release of the CEJST, the OEJ at the EPA is excited to support the
                CEJST Site Satisfaction and Data Set Survey.
            </p>

            <h3>Goals of this survey:</h3>
            <ul>
              <li>
                To capture and highlight how partners and public are using CJEST to support
                their analysis of potential environmental justice concerns
              </li>
              <li>
                To identify opportunities for improvement to CEJST, especially through the
                identification of additional data layers.
              </li>
            </ul>

            <p>
                Your support and continued feedback on the CEJST is invaluable and so we
                want to hear from you on how CEJST is impacting your work.
            </p>

            <p>
                Particiaption is open to all individuals and organizations. Please select
                or write your repsonses to the questions. You can provide additional
                information in the comment boxes.
            </p>
          </Grid>
        </Grid>

        <Grid row>
          <Grid col>
            <p>
                  Thank you for participating in the CEJST Site Feedback and Data Set Survey!
            </p>

            <p>
                  Please direct all comments, questions, or suggestions about this survey to:
            </p>

            <div>
              <div>Corey Solow</div>
              <div>Corey.F.Solow@ceq.eop.gov</div>
              <div>Phone: (202) 395-5750</div>
              <div>Council on Environmental Quality</div>
              <div>Executive Office of the President</div>
              <div>730 Jackson Place, NW</div>
              <div>Washington, DC 20503</div>
            </div>
          </Grid>
        </Grid>

      </J40MainGridContainer>
    </Layout>
  );
};

export default Survey;
