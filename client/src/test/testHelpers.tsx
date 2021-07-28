import React, {ReactNode} from 'react';
import {IntlProvider, IntlContextProvider} from 'gatsby-plugin-intl';
import messages from '../intl/en.json'; // this is updated by `formatjs extract`

const intlConfig = {
  language: 'en',
  languages: ['en', 'es'],
  messages,
  originalPath: '/',
  redirect: true,
  routed: true,
};
interface ILocalizedComponentProps {
  children: ReactNode
}

export const LocalizedComponent = ({children}: ILocalizedComponentProps) => {
  return (
    <>
      <IntlContextProvider value={intlConfig} >
        <IntlProvider locale={'en'}>
          {children}
        </IntlProvider>
      </IntlContextProvider>
    </>
  );
};
