import React from 'react';
import ReactTooltip from 'react-tooltip';
import * as styles from './mapLegend.module.scss';

// @ts-ignore
import infoIcon from '/node_modules/uswds/dist/img/usa-icons/info_outline.svg';

const getToolTipContent = (type:string) => {
  if (type === 'prioritized') {
    return (
      <div className={styles.legendTooltip}>
        <h2>Prioritized community</h2>
        <p className={styles.legendTooltipText}>A prioritized community is one that has a cumulative index score of Xth
          percentile and above. 40% of the benefits from investments outlined by the
          Justice40 Initiative should go to prioritized communities.</p>
      </div>
    );
  } else {
    return (
      <div className={styles.legendTooltip}>
        <h2>Threshold community</h2>
        <p className={styles.legendTooltipText}>Communities with a cumulative index score between
           Y - X.99th percentile are
          considered threshold communities. While these communities are currently not
          considered a prioritized community, this may change based on updates to the
          scoring method.</p>
      </div>

    );
  };
};

const MapLegend = () => {
  return (
    <div className={styles.legendContainer}>
      <h3 className={styles.legendHeader}>COLOR KEY</h3>
      <div className={styles.swatchContainer}>
        <div className={styles.legendItem}>
          <div className={styles.colorSwatch} id={styles.prioritized} />
          <span>Prioritized Community</span>
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
          <span>Threshold Community</span>
          <div className={styles.infoIconWrapper} data-for="threshold" data-tip="threshold tool tip">
            <img className={styles.infoIcon} src={infoIcon} />
          </div>
          <ReactTooltip
            id={'threshold'}
            place={'left'}
            type={'info'}
            effect={'solid'}
            className={styles.legendTooltipTheme} >
            {getToolTipContent('threshold')}
          </ReactTooltip>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
