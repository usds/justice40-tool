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
              <a href="https://www.epa.gov/">Environmental Protection Agency</a>,
              <a href="https://www.omb.gov/">Office of Management and Budget</a>,
              <a href="https://www.doe.gov/">Department of Energy</a>,
              <a href="https://www.hud.gov/">Department of Housing and Urban
                Development</a>,
            ],
            [
              "More Information",
              <a href="https://www.whitehouse.gov/">Whitehouse.gov</a>,
              <a href="#">Accessibility Statement</a>,
              <a href="#">Privacy, Policies, and Legal Information</a>,
            ],
            [<br/>,
              <Logo
                size="medium"
                className={"j40FloatLogoLeft"}
                image={
                  <img className={"usa-footer__logo-img j40FooterLogo"} src={whitehouseIcon} alt="Whitehouse logo"/>
                }
              />,
            ],
            [
              <span className={"j40FooterAddressTitle"}>Council on Environmental Quality<br/></span>,
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
