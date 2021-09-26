import React from 'react';
import {
  Address,
  Logo,
} from '@trussworks/react-uswds';
import {NavList} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import J40MainGridContainer from './J40MainGridContainer';

// @ts-ignore
import whitehouseIcon from '../images/eop-seal.svg';
import * as COMMON_COPY from '../data/copy/common';

const J40Footer = () => {
  const intl = useIntl();

  const NAVLINKS = [
    ['Contact',
      <Address
        key={'footeraddress'}
        className={'j40-footer-address'}
        size={'big'}
        items={[
          COMMON_COPY.FOOTER_CEQ_ADDRESS.NAME,
          COMMON_COPY.FOOTER_CEQ_ADDRESS.STREET,
          COMMON_COPY.FOOTER_CEQ_ADDRESS.CITY_STATE,
          COMMON_COPY.FOOTER_CEQ_ADDRESS.PHONE,
        ]}
      />,
    ],
    [
      intl.formatMessage(COMMON_COPY.FOOTER.MORE_INFO),
      <a
        className={'footer-link-first-child'}
        key={'whitehouselink2'}
        href={'https://www.whitehouse.gov/'}
        target={'_blank'}
        rel={'noreferrer'}>Whitehouse.gov</a>,
      <a
        key="foialink"
        target={'_blank'}
        rel={'noreferrer'}
        href={'https://www.whitehouse.gov/ceq/foia'}>
        {intl.formatMessage(COMMON_COPY.FOOTER.FOIA)}
      </a>,
      <a
        key={'privacylink'}
        target={'_blank'}
        rel={'noreferrer'}
        href={'https://www.whitehouse.gov/privacy/'}>
        {intl.formatMessage(COMMON_COPY.FOOTER.PRIVACY)}
      </a>,
    ],
    [
      intl.formatMessage(COMMON_COPY.FOOTER.QUESTIONS),
      <a
        className={'footer-link-first-child'}
        key={'contactlink'}
        href={'https://www.usa.gov/'}>
        {intl.formatMessage(COMMON_COPY.FOOTER.CONTACT_LINK)}
      </a>,
    ],
  ];

  // see https://designsystem.digital.gov/components/footer/
  return (
    // we cannot use trussworks Footer because it doesn't layout correct
    // and there's no easy way to override. It comes down to the
    // `className="mobile-lg:grid-col-6 desktop:grid-col-3">` needs to be
    // `className="mobile-lg:grid-col-12 desktop:grid-col-4">` ugh.
    <footer className={'j40-footer'}>
      <div className="usa-footer__primary-section pb">
        <J40MainGridContainer>
          <div className={'grid-row grid-gap-4 padding-bottom-6 tablet-lg:grid-col4'}>
            {NAVLINKS.map((links, i) => (
              <div key={`linkSection-${i}`}
                className="mobile-lg:grid-col-12 desktop:grid-col-4">
                <NavSection links={links} />
              </div>
            ))}
          </div>
        </J40MainGridContainer>
      </div>

      <div className="usa-footer__secondary-section">
        <J40MainGridContainer>
          <Logo
            size="medium"
            key={'logoimg'}
            className={'j40-footer-logo'}
            image={
              <img
                className={'usa-footer__logo-img'}
                src={whitehouseIcon}
                alt={intl.formatMessage(COMMON_COPY.FOOTER.LOGO_ALT)}/>
            }
            heading={<h5>{intl.formatMessage(COMMON_COPY.FOOTER.TITLE)}</h5>}
          />
        </J40MainGridContainer>
      </div>
    </footer>
  );
};

const NavSection = ({
  links,
}: {
  links: React.ReactNode[]
}): React.ReactElement => {
  const [primaryLinkOrHeading, ...secondaryLinks] = links;
  return (
    <section className={'usa-footer__primary-content'}>
      <h4 className="padding-top-1 padding-bottom-0">{primaryLinkOrHeading}</h4>
      <NavList className={'padding-bottom-4'} type="footerSecondary" items={secondaryLinks} />
    </section>
  );
};

export default J40Footer;
