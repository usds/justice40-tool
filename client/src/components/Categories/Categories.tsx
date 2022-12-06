import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Grid} from '@trussworks/react-uswds';

import CategoryCard from '../CategoryCard';
import J40MainGridContainer from '../J40MainGridContainer';

import * as METHODOLOGY_COPY from '../../data/copy/methodology';
import * as styles from './Categories.module.scss';

const categories = [
  METHODOLOGY_COPY.CATEGORIES.CLIMATE_CHANGE,
  METHODOLOGY_COPY.CATEGORIES.CLEAN_ENERGY,
  METHODOLOGY_COPY.CATEGORIES.HEALTH_BURDENS,
  METHODOLOGY_COPY.CATEGORIES.AFFORDABLE_HOUSING,
  METHODOLOGY_COPY.CATEGORIES.LEGACY_POLLUTION,
  METHODOLOGY_COPY.CATEGORIES.CLEAN_TRANSPORT,
  METHODOLOGY_COPY.CATEGORIES.CLEAN_WATER,
  METHODOLOGY_COPY.CATEGORIES.WORKFORCE_DEV,
];

const Categories = () => {
  const intl = useIntl();

  return (
    <>
      <J40MainGridContainer>

        <Grid row>
          <Grid col={8}>
            <h2>{METHODOLOGY_COPY.CATEGORY.HEADING}</h2>
            <p>{intl.formatMessage(METHODOLOGY_COPY.PAGE.PARA3)}</p>
            <p>{intl.formatMessage(METHODOLOGY_COPY.PAGE.PARA4)}</p>
            <p>{METHODOLOGY_COPY.FORMULA.PARA6}</p>
          </Grid>
        </Grid>

      </J40MainGridContainer>

      <J40MainGridContainer className={styles.categoriesContainer}>
        {
          categories.map((category, index) => <CategoryCard key={index} categoryInfo={category} />)
        }
      </J40MainGridContainer>

      <J40MainGridContainer>

        <Grid row className={styles.tribalLandsPara}>
          <Grid col={8}>
            <h2>{intl.formatMessage(METHODOLOGY_COPY.PAGE.SUB_HEADING_2)}</h2>
            <p>{intl.formatMessage(METHODOLOGY_COPY.PAGE.PARA5)}</p>
          </Grid>
        </Grid>

      </J40MainGridContainer>

    </>
  );
};

export default Categories;
