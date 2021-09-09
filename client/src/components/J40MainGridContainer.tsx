// Trussworks GridContainer won't allow it to span 100% of the page, so
// this works around it and tries to hide the complexity in component
import React, {ReactNode} from 'react';
import {GridContainer} from '@trussworks/react-uswds';

interface IJ40MainGridContainer {
  children: ReactNode,
  fullWidth?: boolean,
   blueBackground?: boolean,
  className?: string
}

const J40MainGridContainer = ({
  children,
  fullWidth = false,
  blueBackground = false,
  className = ''}: IJ40MainGridContainer) => {
  // is it a blue background strip?
  className += (blueBackground ? 'j40-main-grid-blue-bk ' : '');

  return fullWidth ? (
    <div
      className={className}>
      {children}
    </div>
  ) : (
    <GridContainer
      containerSize={'desktop-lg'}
      className={className}>
      {children}
    </GridContainer>
  );
};

export default J40MainGridContainer;
