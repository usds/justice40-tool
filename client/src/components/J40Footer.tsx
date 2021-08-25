import React from 'react';
import {
  Address,
  Logo,
} from '@trussworks/react-uswds';
import {NavList} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';

// @ts-ignore
import whitehouseIcon from '../images/eop-seal.svg';
import J40MainGridContainer from './J40MainGridContainer';

const J40Footer = () => {
  const intl = useIntl();
  const messages = defineMessages({
    arialabelfooter: {
      id: 'footer.arialabel',
      defaultMessage: 'Footer navigation',
      description: 'aria-label text for whole footer',
    },
    logotitle: {
      id: 'footer.logo.title',
      defaultMessage: 'Council on Environmental Quality',
      description: 'Footer under logo',
    },
    moreinfoheader: {
      id: 'footer.moreinfoheader',
      defaultMessage: 'More information',
      description: 'Footer column header',
    },
    foia: {
      id: 'footer.foialink',
      defaultMessage: 'Freedom of Information Act (FOIA)',
      description: 'Footer FOIA link text',
    },
    privacy: {
      id: 'footer.privacylink',
      defaultMessage: 'Privacy Policy',
      description: 'Footer privacy policy link text',
    },
    whitehouselogoalt: {
      id: 'footer.whitehouselogoalt',
      defaultMessage: 'Whitehouse logo',
      description: 'Footer Whitehouse logo alt text',
    },
    questionsheader: {
      id: 'footer.questionsheader',
      defaultMessage: 'Have a question about government services?',
      description: 'Footer column header',
    },
    contactlink: {
      id: 'footer.findcontactlink',
      defaultMessage: 'Find a contact at USA.gov',
      description: 'Footer find contact link text',
    },
  });

  const NAVLINKS = [
    ['Contact',
      <Address
        key={'footeraddress'}
        className={'j40-footer-address'}
        size={'big'}
        items={[
          '730 Jackson Pl NW',
          'Washington, D.C. 20506',
          '(202) 395-5750',
        ]}
      />,
    ],
    [
      intl.formatMessage(messages.moreinfoheader),
      <a
        key={'whitehouselink2'}
        href={'https://www.whitehouse.gov/'}
        target={'_blank'}
        rel={'noreferrer'}>Whitehouse.gov</a>,
      <a
        key="foialink"
        target={'_blank'}
        rel={'noreferrer'}
        href={'https://www.whitehouse.gov/ceq/foia'}>
        {intl.formatMessage(messages.foia)}
      </a>,
      <a
        key={'privacylink'}
        target={'_blank'}
        rel={'noreferrer'}
        href={'https://www.whitehouse.gov/privacy/'}>
        {intl.formatMessage(messages.privacy)}
      </a>,
    ],
    [
      intl.formatMessage(messages.questionsheader),
      <a
        key={'contactlink'}
        href={'https://www.usa.gov/'}>
        {intl.formatMessage(messages.contactlink)}
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
      <div className="usa-footer__primary-section">
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
                alt={intl.formatMessage(messages.whitehouselogoalt)}/>
            }
            heading={<p
              className={'j40-footer-logo-heading'}>
              {intl.formatMessage(messages.logotitle)}</p>}
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
