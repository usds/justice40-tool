import * as React from 'react';
import {defineMessages} from 'react-intl';
import {Link} from 'gatsby-plugin-intl';
import {useIntl} from 'gatsby-plugin-intl';
import {Grid} from '@trussworks/react-uswds';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';

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
  const messages = defineMessages({
    pageNotFoundTitle: {
      id: 'pageNotFound.title.text',
      defaultMessage: 'Page not found',
      description: 'page not found title text',
    },
    pageNotFoundHeading: {
      id: 'pageNotFound.heading.text',
      defaultMessage: 'Page not found',
      description: 'page not found heading text',
    },
    pageNotFoundApology: {
      id: 'pageNotFound.apology.text',
      defaultMessage: 'Sorry',
      description: 'page not found apology text',
    },
    pageNotFoundApologyDescription: {
      id: 'pageNotFound.apology.description.text',
      defaultMessage: 'we couldn’t find what you were looking for.',
      description: 'page not found apology description text',
    },
    pageNotFoundGuidance: {
      id: 'pageNotFound.Guidance.text',
      defaultMessage: 'Try creating a page in',
      description: 'page not found guidance text',
    },
    pageNotFoundLinkToGoHome: {
      id: 'pageNotFound.link.to.go.home.text',
      defaultMessage: 'Go home',
      description: 'page not found link to go home text',
    },
  });

  return (
    <Layout location={location} title={intl.formatMessage(messages.pageNotFoundTitle)}>
      <J40MainGridContainer>

        <Grid row>
          <h1>{intl.formatMessage(messages.pageNotFoundHeading)}</h1>
        </Grid>

        <Grid row>
          <p>
            {intl.formatMessage(messages.pageNotFoundApology)}
            {' '}
            <span role="img" aria-label="Pensive emoji">
            😔
            </span>{' '}
            {intl.formatMessage(messages.pageNotFoundApologyDescription)}
          </p>
        </Grid>

        <Grid row>
          {process.env.NODE_ENV === 'development' ? (
              <p>
                {intl.formatMessage(messages.pageNotFoundGuidance)}
                <code style={codeStyles}>src/pages/</code>.
              </p>
            ) : null}
        </Grid>

        <Grid>
          <p>
            <Link to="/">{intl.formatMessage(messages.pageNotFoundLinkToGoHome)}</Link>.
          </p>
        </Grid>

      </J40MainGridContainer>
    </Layout>
  );
};

export default NotFoundPage;
