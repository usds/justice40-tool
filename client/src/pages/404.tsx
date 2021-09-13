import * as React from 'react';
import Layout from '../components/layout';
import J40MainGridContainer from '../components/J40MainGridContainer';
import {Link} from 'gatsby-plugin-intl';
import {Grid} from '@trussworks/react-uswds';

// styles
const headingStyles = {
  marginTop: 32,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};

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
  return (<Layout location={location} title={'Page not found'}>
    <J40MainGridContainer>
      <Grid row><Grid col>
        <h1 style={headingStyles}>Page not found</h1>
      </Grid></Grid>
      <Grid row><Grid col>
        <p style={paragraphStyles}>
            Sorry{' '}
          <span role="img" aria-label="Pensive emoji">
            😔
          </span>{' '}
            we couldn’t find what you were looking for.
          <br/>
          {process.env.NODE_ENV === 'development' ? (
              <>
                <br/>
                Try creating a page
                in <code style={codeStyles}>src/pages/</code>.
                <br/>
              </>
            ) : null}
          <br/>
          <Link to="/">Go home</Link>.
        </p>
      </Grid></Grid>
    </J40MainGridContainer>
  </Layout>
  );
};

export default NotFoundPage;
