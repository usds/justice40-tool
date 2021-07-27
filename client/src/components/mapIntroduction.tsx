import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';

// @ts-ignore
import lightbulbIcon from '/node_modules/uswds/dist/img/usa-icons/lightbulb_outline.svg';
import * as styles from './mapIntroduction.module.scss';

const MapIntroduction = () => {
  const intl = useIntl();
  const messages = defineMessages({
    mapIntroHeader: {
      id: 'mapIntro.mapIntroHeader',
      defaultMessage: 'Zoom and select a census block group to view data',
      description: 'introductory text of ways to use the map',
    },
    didYouKnow: {
      id: 'mapIntro.didYouKnow',
      defaultMessage: ' Did you know?',
      description: 'text prompting a cite paragraph',
    },
    censusBlockGroupDefinition: {
      id: 'mapIntro.censusBlockGroupDefinition',
      defaultMessage: 'A census block group is generally between 600 and 3,000 people. ' +
      'It is the smallest geographical unit for which the U.S. Census ' +
      'Bureau publishes sample data.',
      description: 'cites the definition and helpful information about census groups',
    },
  });

  return (
    <aside className={styles.mapIntroContainer}>
      <header className={styles.mapIntroHeader}>{intl.formatMessage(messages.mapIntroHeader)}</header>
      <div className={styles.mapIntroText}>
        <img className={styles.mapIntroLightbulb} src={lightbulbIcon} />
        <div className={styles.didYouKnowBox}>
          <div className={styles.didYouKnow}>{intl.formatMessage(messages.didYouKnow)}</div>
          <cite className={styles.didYouKnowText}>{intl.formatMessage(messages.censusBlockGroupDefinition)}</cite>
        </div>
      </div>
    </aside>
  );
};

export default MapIntroduction;
