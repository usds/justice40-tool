import React from 'react';
import DisadvantageDot from '../DisadvantageDot';

import * as styles from './Category.module.scss';

interface ICategory {
    name: string;
    isDisadvantaged: boolean | null;
}

/**
 * This component controls the Categories on the side panel.
 *
 * The category will be styled differently differently depending on
 * if the category is disadvantaged or not. The JSX in the return
 * statement is identical however in the global CSS file, we
 * override the disadvantaged case with a psuedo-selector (:has) that
 * is new. In order to fallback gracefully for browsers that do
 * not yet support the ":has" psuedo selector, this redundant JSX
 * will allow the disadvantaged case show the older category styling
 * while browsers that do support the ":has" psuedo selector will
 * render the newer category style.
 *
 * @param {string} name
 * @param {boolean} isDisadvagtaged
 * @return {JSX.Element}
 */
const Category = ({name, isDisadvantaged}:ICategory) => {
  return isDisadvantaged ? (
    <div className={styles.disCategoryContainer}>
      <div className={styles.category}>
        {name}
      </div>
      <DisadvantageDot isDisadvantaged={isDisadvantaged}/>
    </div>
  ) : (
    <div className={styles.categoryContainer}>
      <div className={styles.category}>
        {name}
      </div>
      <DisadvantageDot isDisadvantaged={isDisadvantaged}/>
    </div>
  );
};
export default Category;
