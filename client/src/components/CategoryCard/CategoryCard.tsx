import React from 'react';

import * as styles from './CategoryCard.module.scss';

interface ICategoryInterface {
    categoryInfo: {
        TITLE: JSX.Element,
        IF: JSX.Element,
        AND: JSX.Element,
        THEN: JSX.Element
    }
}
const IndicatorCategory = ({categoryInfo}: ICategoryInterface) => {
  return (
    <div className={styles.categoryCard}>
      <h3>
        {categoryInfo.TITLE}
      </h3>
      <p>
        {categoryInfo.IF}
      </p>
      <p>
        {categoryInfo.AND}
      </p>
      <p>
        {categoryInfo.THEN}
      </p>
    </div>
  );
};

export default IndicatorCategory;
