import React from 'react';
import {Grid} from '@trussworks/react-uswds';

// the "body" section is the child object to allow for html versus just text
interface AboutCardProps {
  imgSrc: string;
  header: string;
  size?: 'small' | 'large';
  actionText?: string;
  actionUrl?: string;
  actionOpenInNewTab?: boolean;
  className?: string;
}

const AboutCard = (props: React.PropsWithChildren<AboutCardProps>) => {
  if (props.size === 'large') {
    // large are the cards on top
    // note it uses a top className='j40-aboutcard-lg-card'
    return (
      <Grid tablet={{col: true}} gap={'lg'} className={(props.className || '')}>
        <Grid row className={'j40-aboutcard-lg-card'}>
          <Grid desktop={{col: 3}} className={'j40-aboutpage-image-container'}>
            <img
              className={'j40-aboutcard-image'}
              alt={props.header}
              src={props.imgSrc}/>
          </Grid>

          <Grid desktop={{col: 9}}>
            <Grid row>
              <h3 className={'j40-section-header'}>{props.header}</h3>
              <div className={'j40-section-body'}>{props.children}</div>
            </Grid>
          </Grid>

        </Grid>
      </Grid>
    );
  } else {
    // small are the cards on the bottom
    // note it uses a top className='j40-aboutcard-sm-card'
    return (
      <Grid tablet={{col: true}} gap={'lg'} className={(props.className || '')}>
        <Grid row className={'j40-aboutcard-sm-card'}>
          <Grid desktop={{col: 2}} className={'j40-aboutpage-image-container'}>
            <img
              className={'j40-aboutcard-image'}
              alt={props.header}
              src={props.imgSrc}/>
          </Grid>

          <Grid desktop={{col: 9}}>
            <Grid row>
              <h3 className={'j40-section-header'}>{props.header}</h3>
              <div className={'j40-section-body'}>{props.children}</div>
              <div className={'j40-section-footer'}>
                {props.actionOpenInNewTab ?
                  <a
                    className={'j40-aboutcard-link'}
                    href={props.actionUrl}
                    target="_blank"
                    rel="noreferrer">{props.actionText}</a> :
                  <a
                    className={'j40-aboutcard-link'}
                    href={props.actionUrl}>{props.actionText}</a>
                }
              </div>
            </Grid>
          </Grid>
          <Grid col={1}>&nbsp;</Grid>
        </Grid>
      </Grid>
    );
  }
};

export default AboutCard;
