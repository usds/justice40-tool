import React, {ReactNode} from 'react';
import {IntlContextProvider} from 'gatsby-plugin-intl';

interface ILocalizedComponentProps {
  children: ReactNode
}

export const LocalizedComponent = ({children}: ILocalizedComponentProps) => {
  return (
    <>
      <IntlContextProvider value={{language: 'en', routed: true}}>
        {children}
      </IntlContextProvider>,
    </>
  );
};
