import React from 'react';
import {
  Address,
  Footer,
  FooterNav,
  Logo,
  GridContainer, Grid,
} from '@trussworks/react-uswds';
import {} from '@trussworks/react-uswds';
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

  // see https://designsystem.digital.gov/components/footer/
  return (
    <>
      <Footer
        size="big"
        className={'j40-footer'}
        primary={
          <GridContainer><Grid>
            <FooterNav
              aria-label={intl.formatMessage(messages.arialabelfooter)}
              size="big" // fyi you leave this off and it silently fails...
              links={[
                ['Contacts',
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
              ]}
            />
          </Grid></GridContainer>}
        secondary={
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
          />}
      />
    </>
  );
};

export default J40Footer;
