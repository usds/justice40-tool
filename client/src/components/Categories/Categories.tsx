import React from 'react';

import IndicatorCategory from '../CategoryCard';
import J40MainGridContainer from '../J40MainGridContainer';

import * as METHODOLOGY_COPY from '../../data/copy/methodology';
import * as styles from './Categories.module.scss';

const categories = [
  METHODOLOGY_COPY.CATEGORIES.CLIMATE_CHANGE,
  METHODOLOGY_COPY.CATEGORIES.CLEAN_ENERGY,
  METHODOLOGY_COPY.CATEGORIES.CLEAN_TRANSPORT,
  METHODOLOGY_COPY.CATEGORIES.AFFORDABLE_HOUSE,
  METHODOLOGY_COPY.CATEGORIES.LEGACY_POLLUTION,
  METHODOLOGY_COPY.CATEGORIES.CLEAN_WATER,
  METHODOLOGY_COPY.CATEGORIES.HEALTH_BURDENS,
  METHODOLOGY_COPY.CATEGORIES.WORK_DEV,
];

const Categories = () => {
  return (
    <J40MainGridContainer className={styles.categoriesContainer}>
      {
        categories.map((category, index) => <IndicatorCategory key={index} categoryInfo={category} />)
      }
    </J40MainGridContainer>
  );
};

export default Categories;
