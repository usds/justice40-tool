import React from 'react';
import DisadvantageDot from '../DisadvantageDot';

import * as styles from './Category.module.scss';

interface ICategory {
    name: string;
    isDisadvantaged: boolean;
}

const Category = ({name, isDisadvantaged}:ICategory) => {
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.category}>
        {name}
      </div>
      <DisadvantageDot isDisadvantaged={isDisadvantaged}/>
    </div>
  );
};

export default Category;
