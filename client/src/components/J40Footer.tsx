import React from 'react';
import {Footer, Logo, FooterNav, Address} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';

// @ts-ignore
import whitehouseIcon from '../images/eop-seal.svg';

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
      defaultMessage: 'More Information',
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

  return (
    <>
      <Footer
        size="big"
        className={'j40-footer'}
        primary={<></>}
        secondary={<FooterNav
          aria-label={intl.formatMessage(messages.arialabelfooter)}
          size="big" // fyi you leave this off and it silently fails...
          links={[
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
                      alt={intl.formatMessage(messages.whitehouselogoalt)}/>
                  }
                  heading={<p
                    className={'j40-footer-logo-heading'}>
                    {intl.formatMessage(messages.logotitle)}</p>}
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
            [
              intl.formatMessage(messages.moreinfoheader),
              <a
                href={'https://www.whitehouse.gov/'}
                target={'_blank'}
                rel={'noreferrer'}
                key={'whitehouselink2'}>Whitehouse.gov</a>,
              <a href="#" key={'https://www.whitehouse.gov/ceq/foia'}>
                {intl.formatMessage(messages.foia)}
              </a>,
              <a href="#" key={'https://www.whitehouse.gov/privacy/'}>
                {intl.formatMessage(messages.privacy)}
              </a>,
            ],
            [
              intl.formatMessage(messages.questionsheader),
              <a href="#" key={'privacylink'}>
                {intl.formatMessage(messages.contactlink)}
              </a>,
            ],
          ]}
        />}
      />
    </>
  );
};

export default J40Footer;
