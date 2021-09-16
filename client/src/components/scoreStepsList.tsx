import React from 'react';
import {
  ProcessList,
  ProcessListItem,
  ProcessListHeading,
  Grid,
} from '@trussworks/react-uswds';

const ScoreStepsList = () => {
  return (
    <>
      <h2>Methodology</h2>
      <Grid row>
        <Grid col={7}>
          <p>
            The methodology for identifying communities of focus is calculated at the
            census block group level. Census block geographical boundaries are determined
            by the U.S. Census Bureau once every ten years. This tool utilizes the census
            block boundaries from 2010.
          </p>
          <p>
          The following describes the process for identifying disadvantaged communities.
          </p>
        </Grid>
      </Grid>

      <ProcessList>

        <ProcessListItem>
          <ProcessListHeading type="h4">Gather datasets</ProcessListHeading>
          <p>{' '}</p>
          <h4>
            Data inputs
          </h4>
          <p className={'flush'}>
            The methodology includes the following inputs that are equally weighted.
          </p>

          <h4>
            Percent of Area Median Income
          </h4>
          <p className={'flush'}>
            If a census block group is in a metropolitan area, this value is the
            median income of the census block group calculated as a percent of
            the metropolitan area’s median income.
          </p>
          <p>
            If a census block group is not in a metropolitan area, this value is
            the median income of the census block group calculated as a percent
            of the state’s median income.
          </p>

          <h4>
            Percent of households below or at 100% of the federal poverty line
          </h4>
          <p className={'flush'}>
            This is the percent of households in a state with a household income
            below or at 100% of the <a href="https://www.census.gov/topics/income-poverty/poverty/guidance/poverty-measures.html" target="_blank" rel="noreferrer">federal poverty line</a>. This federal poverty line is
            calculated based on the composition of each household (e.g., based on
            household size), but it does not vary geographically.
          </p>
          <h4>
            The high school degree achievement rate for adults 25 years and older
          </h4>
          <p className={'flush'}>
            The percent of individuals who are 25 or older who have received a high school degree.
          </p>
        </ProcessListItem>

        <ProcessListItem>
          <ProcessListHeading type="h4">
            Current Formula
          </ProcessListHeading>
          <p>{' '}</p>
          <p className={'flush'}>
            Under the existing formula, a census block group will be considered a
            community of focus if:
          </p>
          <p>
            (The median income is &lt;80% of the area median income   OR
          </p>
          <p className={'flush'}>
            households living in poverty (at or below 100% of the federal poverty level) is &gt;20%)
          </p>
          <p className={'flush'}>
            AND
          </p>
          <p className={'flush'}>
            The high school degree achievement rate for adults 25 years and older is &lt;95%
          </p>
        </ProcessListItem>

      </ProcessList>
    </>
  );
};

export default ScoreStepsList;
