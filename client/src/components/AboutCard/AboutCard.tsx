import React from 'react';
import {Grid} from '@trussworks/react-uswds';

// the "body" section is the child object to allow for html versus just text
interface AboutCardProps {
  imgSrc: string;
  header: string;
  actionText: string;
  actionUrl: string;
  actionOpenInNewTab?: boolean;
  className?: string;
}

const AboutCard = (props: React.PropsWithChildren<AboutCardProps>) => {
  return (
    <Grid tablet={{col: true}} gap={'lg'} className={(props.className || '')}>
      <Grid row className={'j40-aboutcard-card'}>
        <Grid col={2}>
          <img
            className={'j40-aboutcard-image'}
            alt={props.header}
            src={props.imgSrc}/>
        </Grid>

        <Grid col={10}>
          <Grid row>
            <div className={'j40-section-header'}>{props.header}</div>
            <div className={'j40-section-body'}>{props.children}</div>
            <div className={'j40-section-footer'}>
              {props.actionOpenInNewTab ?
                <a
                  className={'j40-aboutcard-link'}
                  href={props.actionUrl}
                  target="_blank"
                  rel="noreferrer">{props.actionText}</a> :
                <a className={'j40-aboutcard-link'}
                  href={props.actionUrl}>{props.actionText}</a>
              }
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutCard;
