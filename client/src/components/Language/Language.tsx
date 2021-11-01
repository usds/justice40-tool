import React from 'react';
import {IntlContextConsumer, changeLocale} from 'gatsby-plugin-intl';

// @ts-ignore
import languageIcon from '/node_modules/uswds/dist/img/usa-icons/language.svg';
import * as styles from './Language.module.scss';

const languageName = {
  en: 'English',
  es: 'Español',
};

interface ILanguageProps {
  isDesktop: boolean
}

const Language = ({isDesktop}:ILanguageProps) => {
  return (
    <div className={isDesktop ? styles.languageContainer : styles.languageContainerMobile}>
      <img className={styles.languageIcon} src={languageIcon} alt={'language icon for selecting language'}/>
      <IntlContextConsumer>
        {({languages, language: currentLocale}) =>
          languages.map((language: React.Key | null | undefined) => (
            <a
              className={styles.languageLink}
              key={language}
              onClick={() => changeLocale(language)}
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
