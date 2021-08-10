import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {Tooltip} from '@trussworks/react-uswds';

import * as styles from './mapLegend.module.scss';
import * as constants from '../../data/constants';

// @ts-ignore
import infoIcon from '/node_modules/uswds/dist/img/usa-icons/info_outline.svg';

// Todo VS: This information will be used in the re-design of the tool-tip
// const getToolTipContent = (type:string) => {
//   const intl = useIntl();
//   const messages = defineMessages({
//     priorityHeader: {
//       id: 'tooltip.info.priority.header',
//       defaultMessage: constants.PRIORITIZED_COMMUNITY,
//       description: 'the header of the prioritized community tooltip',
//     },
//     thresholdHeader: {
//       id: 'tooltip.info.threshold.header',
//       defaultMessage: constants.THRESHOLD_COMMUNITY,
//       description: 'the header of the threshold community tooltip',
//     },
//     priorityText: {
//       id: 'tooltip.info.priority.text',
//       defaultMessage: 'A prioritized community is one that has a cumulative index score of Xth ' +
//       'percentile and above. 40% of the benefits from investments outlined by the ' +
//       'Justice40 Initiative should go to prioritized communities.',
//       description: 'the text of the prioritized community tooltip',
//     },
//     thresholdText: {
//       id: 'tooltip.info.threshold.text',
//       defaultMessage: 'Communities with a cumulative index score between Y - X.99th percentile are ' +
//      'considered threshold communities. While these communities are currently not considered a ' +
//      'prioritized community, this may change based on updates to the scoring method.',
//       description: 'the text of the threshold community tooltip',
//     },
//   });

//   return (type === 'prioritized') ?
//     (
//     <div>
//       <h2>{intl.formatMessage(messages.priorityHeader)}</h2>
//       <p className={styles.legendTooltipText}>{intl.formatMessage(messages.priorityText)}</p>
//     </div>
//     ) :
//     (
//       <div>
//         <h2>{intl.formatMessage(messages.thresholdHeader)}</h2>
//         <p className={styles.legendTooltipText}>{intl.formatMessage(messages.thresholdText)}</p>
//       </div>
//     );
// };

const MapLegend = () => {
  const intl = useIntl();

  // Type definitions required for @trussworks tooltip. This type defines the div that wraps the icon.
  // This allows to pass children and other attributes.
  type IconWrapperProps = React.PropsWithChildren<{
    className?: string
  }> &
    JSX.IntrinsicElements['div'] &
    React.RefAttributes<HTMLDivElement>
  const IconWrapper: React.ForwardRefExoticComponent<IconWrapperProps> = React.forwardRef(
      ({className, children, ...tooltipProps}: IconWrapperProps, ref) => (
        <div ref={ref} className={styles.infoIconWrapper} {...tooltipProps}>
          {children}
        </div>
      ),
  );
  IconWrapper.displayName = 'custom info wrapper';

  return (
    <div className={styles.legendContainer}>
      <h3 className={styles.legendHeader}>{intl.formatMessage(constants.EXPLORE_TOOL_PAGE_TEXT.LEGEND_LABEL)}</h3>
      <div className={styles.swatchContainer}>
        <div className={styles.legendItem}>
          <div className={styles.colorSwatch} id={styles.prioritized} />
          <span>{intl.formatMessage(constants.EXPLORE_TOOL_PAGE_TEXT.PRIORITY_LABEL)}</span>

          {/* Using @trussworks tooltip */}
          <Tooltip<IconWrapperProps>
            label={`
            Communities that have cumulative 
            index score of Xth percentile
            and above
              `}
            position='left'
            asCustom={IconWrapper}>
            <img className={styles.infoIcon} src={infoIcon} />
          </Tooltip>

        </div>
        <div className={styles.legendItem}>
          <div className={styles.colorSwatch} id={styles.threshold} />
          <span>{intl.formatMessage(constants.EXPLORE_TOOL_PAGE_TEXT.THRESHOLD_LABEL)}</span>

          {/* Using @trussworks tooltip */}
          <Tooltip<IconWrapperProps>
            label={`
             Communities with a cumulative 
             index score between Y - X.99th
             percentile
              `}
            position='left'
            asCustom={IconWrapper}>
            <img className={styles.infoIcon} src={infoIcon} />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
