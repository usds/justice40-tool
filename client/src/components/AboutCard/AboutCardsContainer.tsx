import React from 'react';
import {Grid} from '@trussworks/react-uswds';

type AboutCardsContainerProps = {
  className?: string
}

// note: this assumes a J40MainGridContainer container!
const AboutCardsContainer = (props: React.PropsWithChildren<AboutCardsContainerProps>) => {
  return (
    <Grid row gap={'lg'} className={'j40-aboutcard-container ' + (props.className || '')}>
      {props.children}
    </Grid>
  );
};

export default AboutCardsContainer;
