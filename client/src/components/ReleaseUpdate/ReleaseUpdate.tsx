import React, {useState} from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as styles from './ReleaseUpdate.module.scss';
import * as DOWNLOAD_COPY from '../../data/copy/downloads';

// @ts-ignore
import expandIcon from '/node_modules/uswds/dist/img/usa-icons/expand_more.svg';
// @ts-ignore
import collapseIcon from '/node_modules/uswds/dist/img/usa-icons/expand_less.svg';

export interface IReleaseUpdateProps {
}

interface IJ40AccordionItem {
  id: string,
  children: React.ReactElement
}


/**
 * This function will create the custom Accordion item. This will be used
 * for the race and age demographic UI elements
 *
 * @param {IJ40AccordionItem} props
 * @return {JSX.Element}
 */
const J40AccordionItem = ({id, children}:IJ40AccordionItem) => {
  const intl = useIntl();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <span>
        {intl.formatMessage(DOWNLOAD_COPY.PAGE_INTRO.VIEW)}{' '}
        <a
          className={styles.showHideText ? `usa-link ${styles.showHideText}` : `usa-link`}
          id={`${id}-header`}
          aria-controls={`${id}-panel`}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
          tabIndex={0}
        >
          {intl.formatMessage(DOWNLOAD_COPY.PAGE_INTRO.CHANGE_LOG)}
        </a>
        { isExpanded ?
          <img
            className={styles.showHideIcon}
            src={collapseIcon}
            alt={'collapse icon'}
            onClick={() => setIsExpanded(!isExpanded)}
          /> :
          <img
            className={styles.showHideIcon}
            src={expandIcon}
            alt={'expand icon'}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        }
      </span>

      <section
        id={`${id}-panel`}
        aria-labelledby={`${id}-header`}
        hidden={!isExpanded}
        className={styles.releaseUpdateContainer}
      >{children}
      </section>
    </>
  );
};

const ReleaseUpdate = ({}: IReleaseUpdateProps) => {
  return (
    <div className={styles.releaseUpdateComponent}>
      <J40AccordionItem id={'releaseUpdate'}>
        <div>

          <div className={styles.releaseHeader}>
            {DOWNLOAD_COPY.RELEASE.UPDATE_1}
          </div>

          <div className={styles.releaseSectionTitle}>
            {DOWNLOAD_COPY.RELEASE.SECTION1}
          </div>

          <div className={styles.releaseSectionBody}>
            <ul>
              <li>{DOWNLOAD_COPY.RELEASE.SECTION1_P1}</li>
              <ul>
                <li>{DOWNLOAD_COPY.RELEASE.SECTION1_P1_1}</li>
              </ul>
            </ul>
          </div>

          <div className={styles.releaseSectionTitle}>
            {DOWNLOAD_COPY.RELEASE.SECTION2}
          </div>

          <div className={styles.releaseSectionBody}>
            <ul>
              <li>{DOWNLOAD_COPY.RELEASE.SECTION2_P1}</li>
            </ul>
          </div>

          <div>
            {DOWNLOAD_COPY.RELEASE.FOOTER}
          </div>

        </div>
      </J40AccordionItem>
    </div>
  );
};

export default ReleaseUpdate;
