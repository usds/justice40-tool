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
          href={'javascript:void(0)'}
          id={`${id}-header`}
          aria-controls={`${id}-panel`}
          // aria-expanded={isExpanded}
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
            {DOWNLOAD_COPY.RELEASE_1_0.UPDATE_1}
          </div>

          <div className={styles.releaseSectionTitle}>
            {DOWNLOAD_COPY.RELEASE_1_0.SECTION1}
          </div>

          <div>
            <ul>
              <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B1}</li>
              <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2}</li>

              <ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_1}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_1_1}</li>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_1_2}</li>
                </ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_2}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_1_3}</li>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_2_2}</li>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_2_1}</li>
                </ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_3}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_3_1}</li>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_3_2}</li>
                </ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_4}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_4_1}</li>
                </ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_5}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B2_5_1}</li>
                </ul>
              </ul>
              <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B3}</li>
              <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B4}</li>
              <ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B4_1}</li>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B4_2}</li>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B4_3}</li>
              </ul>
              <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B5}</li>
              <ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B5_1}</li>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B5_2}</li>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B5_3}</li>
              </ul>

              <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6}</li>
              <ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_1}</li>
                  {/* <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2}</li>
                  <ul>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_1}</li>
                    <ul>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_1_1}</li>
                    </ul>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2}</li>
                    <ul>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_1}</li>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_2}</li>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_3}</li>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_4}</li>
                    </ul>
                  </ul> */}
                </ul>

                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_2}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_2_1}</li>
                  {/* <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2}</li>
                  <ul>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_1}</li>
                    <ul>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_1_1}</li>
                    </ul>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2}</li>
                    <ul>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_1}</li>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_2}</li>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_3}</li>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_4}</li>
                    </ul>
                  </ul> */}
                </ul>

                {/* <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_3}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2}</li>
                  <ul>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_1}</li>
                    <ul>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_1_1}</li>
                    </ul>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2}</li>
                    <ul>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_2}</li>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_4}</li>
                    </ul>
                  </ul>
                </ul>

                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_4}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2}</li>
                  <ul>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_1}</li>
                    <ul>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_1_1}</li>
                    </ul>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2}</li>
                    <ul>
                      <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_4}</li>
                    </ul>
                  </ul>
                </ul> */}

                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_5}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_5_1}</li>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_5_2}</li>
                  <ul>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_5_2_1}</li>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_5_2_2}</li>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_5_2_3}</li>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_5_2_4}</li>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_1}</li>
                    <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2_2}</li>
                  </ul>
                </ul>
              </ul>

              {/* <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B7}</li>
              <ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_1}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B7_1_1}</li>
                </ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B6_1_2_2}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B7_2_1}</li>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B7_2_2}</li>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B7_2_3}</li>
                </ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B7_3}</li>
                <ul>
                  <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B7_3_1}</li>
                </ul>
              </ul> */}

              <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B8}</li>
              <ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B8_1}</li>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B8_2}</li>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B8_3}</li>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B8_4}</li>
              </ul>

              <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B9}</li>
              <ul>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B9_1}</li>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B9_2}</li>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B9_3}</li>
                <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B9_4}</li>
              </ul>

              <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION1_B10}</li>
            </ul>
          </div>

          <div className={styles.releaseSectionTitle}>
            {DOWNLOAD_COPY.RELEASE_1_0.SECTION2}
          </div>

          <div>
            <ul>
              <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION2_P1}</li>
              <li>{DOWNLOAD_COPY.RELEASE_1_0.SECTION2_P2}</li>
            </ul>
          </div>

          <div>
            {DOWNLOAD_COPY.RELEASE_1_0.FOOTER}
          </div>

        </div>
      </J40AccordionItem>
    </div>
  );
};

export default ReleaseUpdate;
