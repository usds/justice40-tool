import React from 'react';

import * as METHODOLOGY_COPY from '../../data/copy/methodology';
import * as styles from './CategoryCard.module.scss';
interface ICategoryInterface {
    categoryInfo: {
        TITLE: JSX.Element,
        IF: JSX.Element,
        AND: JSX.Element,
        THEN: JSX.Element
    }
}
const CategoryCard = ({categoryInfo}: ICategoryInterface) => {
  return (
    <div className={styles.categoryCard}>
      <h3>
        {categoryInfo.TITLE}
      </h3>
      <p className={styles.idAsDisdvantaged}>
        {METHODOLOGY_COPY.CATEGORY.ID_AS_DISADV_TEXT}
      </p>
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

export default CategoryCard;
