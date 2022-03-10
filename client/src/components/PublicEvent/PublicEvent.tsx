import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {
  CollectionDescription,
  CollectionHeading,
  CollectionItem,
  CollectionThumbnail,
  Button,
} from '@trussworks/react-uswds';

import LinkTypeWrapper from '../LinkTypeWrapper';
import * as PUBLIC_ENGAGE_COPY from '../../data/copy/publicEngage';
import * as styles from './PublicEvent.module.scss';

export interface IPublicEvent {
  event: {
    DATE: Date,
    NAME: JSX.Element,
    DESC: JSX.Element,
    NUMBER: Number,
    IMAGE: React.ReactElement | string,
    FIELDS: JSX.Element,
    REG_LINK: string,
    DATA_CY: string,
  }
}


const PublicEvent = ({event}:IPublicEvent) => {
  const intl = useIntl();

  return (
    <CollectionItem
      variantComponent={
        <CollectionThumbnail src={event.IMAGE} alt="Alt text" />
      }>

      {/* Heading */}
      <CollectionHeading>
        <LinkTypeWrapper
          linkText={`CEJST 
            ${intl.formatMessage(event.NAME)} 
            #${event.NUMBER}
          `}
          internal={false}
          url={event.REG_LINK}
          openUrlNewTab={true}
          dataCy={event.DATA_CY}
        />
      </CollectionHeading>

      {/* Description */}
      <CollectionDescription className={styles.description}>
        {intl.formatMessage(event.DESC)}
      </CollectionDescription>

      {/* Event info */}
      <CollectionDescription className={styles.description}>
        <b>
          {intl.formatMessage(PUBLIC_ENGAGE_COPY.EVENT_FIELDS.EVENT_INFO)}
        </b>
        {`: ${intl.formatMessage(event.FIELDS.INFO)}`}
      </CollectionDescription>

      {/* Registration Link */}
      <CollectionDescription className={styles.description}>
        <a href={event.REG_LINK} target={'_blank'} rel="noreferrer">
          <Button type='button'>
            {intl.formatMessage(PUBLIC_ENGAGE_COPY.EVENT_FIELDS.REG_LINK)}
          </Button>
        </a>
      </CollectionDescription>
    </CollectionItem>
  );
};

export default PublicEvent;
