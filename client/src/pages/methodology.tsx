import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';

import AlertWrapper from '../components/AlertWrapper';
import DatasetContainer from '../components/DatasetContainer';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import ScoreStepsList from '../components/scoreStepsList';

interface MethodPageProps {
  location: Location;
}

// markup
const IndexPage = ({location}: MethodPageProps) => {
  return (
    <Layout location={location}>

      <J40MainGridContainer fullWidth={true}>
        <AlertWrapper hideWarningAlert={true}/>
      </J40MainGridContainer>

      <J40MainGridContainer className={'j40-main-content'}>
        <Grid row>
          <Grid col>
            <section>
              <h1>Methodology</h1>
              <p>
            The Just Progress tool combines demographic, environmental, and
            socio-economic data to generate a cumulative index score, referred
            to as the Just Progress Index. The tool currently utilizes
            national,
            publically-available data from the United States Census Bureau’s
            American Community Survey (ACS) and the EPA’s EJScreen tool.
              </p>
              <p>
            The various inputs into the Just Progress Index are averaged into
            2 categories: Pollution Burden and Demographics.
              </p>
              <p>
            Pollution Burden: health risks arising from proximity and
            potential exposures to pollution and other adverse environmental
            conditions
              </p>
              <p>
            Demographics: sensitive populations and socioeconomic factors that
            make a community more vulnerable
              </p>
              <p>
                <b>Pollution Burden average x Demographics average = Just Progress
              Index</b>
              </p>
            </section>
          </Grid></Grid>
      </J40MainGridContainer>

      <J40MainGridContainer fullWidth={true}>
        <Grid row>
          <Grid col>
            <DatasetContainer/>
          </Grid>
        </Grid>
      </J40MainGridContainer>

      <J40MainGridContainer>
        <Grid row><Grid col>
          <ScoreStepsList/>
        </Grid></Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default IndexPage;
