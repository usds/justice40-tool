import React from 'react';
import {Footer, Logo, FooterNav, Address} from '@trussworks/react-uswds';
// @ts-ignore
import whitehouseIcon from '../images/eop-seal.svg';

const J40Footer = () => {
  return (
    <>
      <Footer
        size="big"
        className={'j40-footer'}
        primary={<></>}
        secondary={<FooterNav
          aria-label="Footer navigation"
          size="big" // fyi you leave this off and it silently fails...
          links={[
            [
              'Agency Partners',
              <a
                href={'https://www.epa.gov/'}
                target={'_blank'}
                rel={'noreferrer'}
                key={'epalink'}>Environmental Protection Agency</a>,
              <a
                href={'https://www.whitehouse.gov/omb'}
                target={'_blank'}
                rel={'noreferrer'}
                key={'whitehouselink'}>Office of Management
                and Budget</a>,
              <a
                href={'https://www.energy.gov/'}
                target={'_blank'}
                rel={'noreferrer'}
                key={'energylink'}>Department of Energy</a>,
              <a
                href={'https://www.hud.gov/'}
                target={'_blank'}
                rel={'noreferrer'}
                key={'hudlink'}>Department of Housing and Urban
                Development</a>,
            ],
            [
              'More Information',
              <a
                href={'https://www.whitehouse.gov/'}
                target={'_blank'}
                rel={'noreferrer'}
                key={'whitehouselink2'}>Whitehouse.gov</a>,
              <a href="#" key={'accessibilitylink'}>Accessibility Statement</a>,
              <a href="#" key={'privacylink'}>Privacy, Policies, and Legal
                Information</a>,
            ],
            [
              'Have a question about government services?',
              <a href="#" key={'privacylink'}>Find a contact at USA.gov</a>,
            ],
            [
              <>
                <Logo
                  size="slim"
                  key={'logoimg'}
                  className={'j40-footer-logo'}
                  image={
                    <img
                      className={'usa-footer__logo-img'}
                      src={whitehouseIcon}
                      alt={'Whitehouse logo'}/>
                  }
                  heading={<p
                    className={'j40-footer-logo-heading'}>
                    Council on Environmental Quality</p>}
                />
              </>,
              <>
                <Address
                  key={'footeraddress'}
                  items={[
                    '730 Jackson Pl NW',
                    'Washington, D.C. 20506',
                    '(202) 395-5750',
                  ]}
                />
              </>,
            ],
          ]}
        />}
      />
    </>
  );
};

export default J40Footer;
