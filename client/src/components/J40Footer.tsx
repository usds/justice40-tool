import React from 'react';
import {Footer, Logo, FooterNav, Address} from '@trussworks/react-uswds';
// @ts-ignore
import whitehouseIcon from '../images/eop-seal.svg';

const J40Footer = () => {
  return (
    <>
      <Footer
        size="big"
        primary={<></>}
        secondary={<FooterNav
          aria-label="Footer navigation"
          size="big" // fyi you leave this off and it silently fails... lovely
          className={'nobreak'}
          links={[
            [
              'Agency Partners',
              <a href="https://www.epa.gov/" target="_blank" rel="noreferrer"
                key={'epalink'}>Environmental Protection Agency</a>,
              <a href="https://www.whitehouse.gov/omb" target="_blank"
                rel="noreferrer" key={'whitehouselink'}>Office of Management
                and Budget</a>,
              <a href="https://www.energy.gov/" target="_blank" rel="noreferrer"
                key={'energylink'}>Department of Energy</a>,
              <a href="https://www.hud.gov/" target="_blank" rel="noreferrer"
                key={'hudlink'}>Department of Housing and Urban
                Development</a>,
            ],
            [
              'More Information',
              <a href="https://www.whitehouse.gov/" target="_blank"
                rel="noreferrer"
                key={'whitehouselink2'}>Whitehouse.gov</a>,
              <a href="#" key={'accessibilitylink'}>Accessibility Statement</a>,
              <a href="#" key={'privacylink'}>Privacy, Policies, and Legal
                Information</a>,
            ],
            // eslint-disable-next-line react/jsx-key
            [<br/>,
              <Logo
                size="medium"
                key={'logoimg'}
                image={
                  <img className={'usa-footer__logo-img'} src={whitehouseIcon}
                    alt="Whitehouse logo"/>
                }
              />,
            ],
            [
              <>Council on Environmental Quality<br/></>,
              <Address className={'footerAddressReadability'}
                key={'footeraddress'}
                items={[
                  '730 Jackson Pl NW',
                  'Washington, D.C. 20506',
                  '(202) 395-5750',
                ]}
              />,
            ],
          ]}
        />}
      />
    </>
  );
};

export default J40Footer;
