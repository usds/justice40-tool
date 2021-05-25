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
          size="big"   // fyi you leave this off and it silently fails... lovely
          className={"nobreak"}
          links={[
            [
              "Agency Partners",
              <a href="https://www.epa.gov/" target="_blank">Environmental Protection Agency</a>,
              <a href="https://www.whitehouse.gov/omb" target="_blank">Office of Management and Budget</a>,
              <a href="https://www.energy.gov/" target="_blank">Department of Energy</a>,
              <a href="https://www.hud.gov/" target="_blank">Department of Housing and Urban
                Development</a>,
            ],
            [
              "More Information",
              <a href="https://www.whitehouse.gov/" target="_blank">Whitehouse.gov</a>,
              <a href="#">Accessibility Statement</a>,
              <a href="#">Privacy, Policies, and Legal Information</a>,
            ],
            [<br/>,
              <Logo
                size="medium"
                className={"j40-logo-float-right"}
                image={
                  <img className={"usa-footer__logo-img"} src={whitehouseIcon} alt="Whitehouse logo"/>
                }
              />,
            ],
            [
              <span>Council on Environmental Quality<br/></span>,
              <Address className={"footerAddressReadability"} items={[
                "730 Jackson Pl NW",
                "Washington, D.C. 20506",
                "(202) 395-5750",
              ]}
              />
            ],
          ]}
        />}
      />
    </>
  )
};

export default J40Footer;
