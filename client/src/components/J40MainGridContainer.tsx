// Trussworks GridContainer won't allow it to span 100% of the page, so
// this works around it and tries to hide the complexity in component
import React, {ReactNode} from 'react';
import {GridContainer} from '@trussworks/react-uswds';

interface ILayoutProps {
  children: ReactNode,
  fullWidth?: boolean,
  className?: string
}

const J40MainGridContainer = ({
  children,
  fullWidth = false,
  className = 'j40-grid-container'}: ILayoutProps) => {
  return !fullWidth ? (
    <GridContainer
      containerSize={'desktop-lg'}
      className={'j40-grid-container ' + className}>
      {children}
    </GridContainer>
  ) : (
    <div
      className={'j40-grid-container ' + className}>
      {children}
    </div>
  );
};

export default J40MainGridContainer;
