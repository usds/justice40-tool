import * as React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Grid} from '@trussworks/react-uswds';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import * as PAGE_NOT_FOUND_COPY from '../data/copy/404';

const codeStyles = {
  color: '#8A6534',
  padding: 4,
  backgroundColor: '#FFF4DB',
  fontSize: '1.25rem',
  borderRadius: 4,
};

interface I404PageProps {
  location: Location;
}

// markup
const NotFoundPage =({location}: I404PageProps) => {
  const intl = useIntl();

  return (
    <Layout location={location} title={intl.formatMessage(PAGE_NOT_FOUND_COPY.PAGE.TITLE)}>
      <J40MainGridContainer>

        <Grid row>
          <h1>{intl.formatMessage(PAGE_NOT_FOUND_COPY.PAGE.HEADING)}</h1>
        </Grid>

        <Grid row>
          <p>
            {PAGE_NOT_FOUND_COPY.ERROR_MSG}
          </p>
        </Grid>

        <Grid row>
          {process.env.NODE_ENV === 'development' ? (
              <p>
                {intl.formatMessage(PAGE_NOT_FOUND_COPY.PAGE.GUIDANCE)}
                <code style={codeStyles}>src/pages/</code>.
              </p>
            ) : null}
        </Grid>


      </J40MainGridContainer>
    </Layout>
  );
};

export default NotFoundPage;
