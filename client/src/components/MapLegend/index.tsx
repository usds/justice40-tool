import React from 'react';
import ReactTooltip from 'react-tooltip';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';
import {Tooltip} from '@trussworks/react-uswds';

import * as styles from './mapLegend.module.scss';
import * as constants from '../../data/constants';

// @ts-ignore
import infoIcon from '/node_modules/uswds/dist/img/usa-icons/info_outline.svg';

const getToolTipContent = (type:string) => {
  const intl = useIntl();
  const messages = defineMessages({
    priorityHeader: {
      id: 'tooltip.info.priority.header',
      defaultMessage: constants.PRIORITIZED_COMMUNITY,
      description: 'the header of the prioritized community tooltip',
    },
    thresholdHeader: {
      id: 'tooltip.info.threshold.header',
      defaultMessage: constants.THRESHOLD_COMMUNITY,
      description: 'the header of the threshold community tooltip',
    },
    priorityText: {
      id: 'tooltip.info.priority.text',
      defaultMessage: 'A prioritized community is one that has a cumulative index score of Xth ' +
      'percentile and above. 40% of the benefits from investments outlined by the ' +
      'Justice40 Initiative should go to prioritized communities.',
      description: 'the text of the prioritized community tooltip',
    },
    thresholdText: {
      id: 'tooltip.info.threshold.text',
      defaultMessage: 'Communities with a cumulative index score between Y - X.99th percentile are ' +
     'considered threshold communities. While these communities are currently not considered a ' +
     'prioritized community, this may change based on updates to the scoring method.',
      description: 'the text of the threshold community tooltip',
    },
  });

  return (type === 'prioritized') ?
    (
    <div>
      <h2>{intl.formatMessage(messages.priorityHeader)}</h2>
      <p className={styles.legendTooltipText}>{intl.formatMessage(messages.priorityText)}</p>
    </div>
    ) :
    (
      <div>
        <h2>{intl.formatMessage(messages.thresholdHeader)}</h2>
        <p className={styles.legendTooltipText}>{intl.formatMessage(messages.thresholdText)}</p>
      </div>
    );
};

const MapLegend = () => {
  const intl = useIntl();
  const messages = defineMessages({
    priorityLabel: {
      id: 'legend.info.priority.label',
      defaultMessage: constants.PRIORITIZED_COMMUNITY,
      description: 'the label of the prioritized community legend',
    },
    thresholdLabel: {
      id: 'legend.info.threshold.label',
      defaultMessage: constants.THRESHOLD_COMMUNITY,
      description: 'the label of the threshold community legend',
    },
  });

  // Type definitions required for @trussworks tooltip
  type CustomDivProps = React.PropsWithChildren<{
    className?: string
  }> &
    JSX.IntrinsicElements['div'] &
    React.RefAttributes<HTMLDivElement>
  const CustomDiv: React.ForwardRefExoticComponent<CustomDivProps> = React.forwardRef(
      ({className, children, ...tooltipProps}: CustomDivProps, ref) => (
        <div ref={ref} className={styles.infoIconWrapper} {...tooltipProps}>
          {children}
        </div>
      ),
  );
  CustomDiv.displayName = 'custom info wrapper';

  return (
    <div className={styles.legendContainer}>
      <h3 className={styles.legendHeader}>COLOR KEY</h3>
      <div className={styles.swatchContainer}>
        <div className={styles.legendItem}>
          <div className={styles.colorSwatch} id={styles.prioritized} />
          <span>{intl.formatMessage(messages.priorityLabel)}</span>
          <div className={styles.infoIconWrapper} data-for="prioritized" data-tip="prioritized">
            <img className={styles.infoIcon} src={infoIcon} />
          </div>
          <ReactTooltip
            id={'prioritized'}
            place={'left'}
            type={'info'}
            effect={'solid'}
            className={styles.legendTooltipTheme}>
            {getToolTipContent('prioritized')}
          </ReactTooltip>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.colorSwatch} id={styles.threshold} />
          <span>{intl.formatMessage(messages.thresholdLabel)}</span>

          {/* Using @trussworks tooltip */}
          <Tooltip<CustomDivProps>
            label={`Threshold community
             Communities with a cumulative 
             index score between Y - X.99th
             percentile are considered 
             threshold communities. 
             While these communities are 
             currently not considered a 
             prioritized community, this may 
             change based on updates to the 
             scoring method.`}
            position='left'
            // wrapperclasses={styles.legendTooltipTheme}
            asCustom={CustomDiv}>
            <img className={styles.infoIcon} src={infoIcon} />
          </Tooltip>

          {/* Using react-tooltip lib */}
          {/* <div className={styles.infoIconWrapper} data-for="threshold" data-tip="threshold tool tip">
            <img className={styles.infoIcon} src={infoIcon} />
          </div>
          <ReactTooltip
            id={'threshold'}
            place={'left'}
            type={'info'}
            effect={'solid'}
            className={styles.legendTooltipTheme} >
            {getToolTipContent('threshold')}
          </ReactTooltip> */}


        </div>
      </div>
    </div>
  );
};

export default MapLegend;
