import React from 'react';
import {Grid} from '@trussworks/react-uswds';
import LinkTypeWrapper from '../LinkTypeWrapper';

// the "body" section is the child object to allow for html versus just text
interface AboutCardProps {
  imgSrc: string;
  header: string;
  size: 'small' | 'large';
  linkText?: string;
  url?: string;
  openUrlNewTab?: boolean;
  className?: string;
  internal?:boolean;
  // body:string | React.ReactNode;
}

const AboutCard = (props: React.PropsWithChildren<AboutCardProps>) => {
  if (props.size === 'large') {
    // large are the cards on top
    // note it uses a top className='j40-aboutcard-lg-card'
    return (
      <Grid tablet={{col: true}} gap={'lg'} className={(props.className || '')}>
        <Grid row className={'j40-aboutcard-lg-card'}>
          <Grid tablet={{col: 3}} className={'j40-aboutpage-image-container'}>
            <img
              className={'j40-aboutcard-image'}
              alt={props.header}
              src={props.imgSrc}/>
          </Grid>

          <Grid tablet={{col: 9}}>
            <Grid row>
              <h2>{props.header}</h2>
              {props.children}
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
          <Grid tablet={{col: 2}} className={'j40-aboutpage-image-container'}>
            <img
              className={'j40-aboutcard-image'}
              alt={props.header}
              src={props.imgSrc}/>
          </Grid>

          <Grid tablet={{col: 9}}>
            <Grid row>
              <h3>{props.header}</h3>
              {props.children}
              <div className={'j40-aboutcard-sm-link'}>
                <LinkTypeWrapper
                  linkText={props.linkText}
                  internal={props.internal}
                  url={props.url}
                  openUrlNewTab={props.openUrlNewTab}
                  className={'j40-aboutcard-link'}
                />
              </div>
            </Grid>
          </Grid>
          <Grid col={1}>{' '}</Grid>
        </Grid>
      </Grid>
    );
  }
};

export default AboutCard;
