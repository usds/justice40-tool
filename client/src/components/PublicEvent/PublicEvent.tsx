import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';
import {
  CollectionDescription,
  CollectionHeading,
  CollectionItem,
  CollectionThumbnail,
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
  }
}


const PublicEvent = ({event}:IPublicEvent) => {
  const intl = useIntl();

  return (
    <CollectionItem
      variantComponent={
        <CollectionThumbnail src={event.IMAGE} alt="Alt text" />
      }>
      <CollectionHeading>
        <LinkTypeWrapper
          linkText={`CEJST 
            ${intl.formatMessage(event.NAME)} 
            #${event.NUMBER}
          `}
          internal={false}
          url={event.REG_LINK}
          openUrlNewTab={true}
          // dataCy?: string;
        />
      </CollectionHeading>

      <CollectionDescription>
        <p>
          {intl.formatMessage(event.DESC)}
        </p>
        <p>
          <span className={styles.eventField}>
            {intl.formatMessage(PUBLIC_ENGAGE_COPY.EVENT_FIELDS.EVENT_INFO)}
          </span>
          {`: ${intl.formatMessage(event.FIELDS.INFO)}`}
        </p>
        <p>
          <span className={styles.eventField}>
            {intl.formatMessage(PUBLIC_ENGAGE_COPY.EVENT_FIELDS.REG_LINK)}
          </span>
          {`: `}
          <LinkTypeWrapper
            linkText={`${event.REG_LINK}`}
            internal={false}
            url={event.REG_LINK}
            openUrlNewTab={true}
            // dataCy?: string;
          />
        </p>
      </CollectionDescription>


    </CollectionItem>
  );
};

export default PublicEvent;
