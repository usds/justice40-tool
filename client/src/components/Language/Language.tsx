import React from 'react';
import {IntlContextConsumer, changeLocale} from 'gatsby-plugin-intl';

import * as styles from './Language.module.scss';

const languageName = {
  en: 'English',
  es: 'Español',
};

const Language = () => {
  return (
    <div className={styles.languageContainer}>
      <IntlContextConsumer>
        {({languages, language: currentLocale}) =>
          languages.map((language: React.Key | null | undefined) => (
            <a
              key={language}
              onClick={() => changeLocale(language)}
              style={{
                margin: 10,
                textDecoration: `underline`,
                cursor: `pointer`,
              }}
            >
              {languageName[language]}
            </a>
          ))
        }
      </IntlContextConsumer>
    </div>
  );
};

export default Language;
