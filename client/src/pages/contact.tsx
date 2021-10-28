import React, {useState} from 'react';
import {Grid, ComboBox, Label} from '@trussworks/react-uswds';
import {useIntl, FormattedMessage} from 'gatsby-plugin-intl';

import IQContactForm from '../components/IQContactForm';
import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';

import * as CONTACT_COPY from '../data/copy/contact';

interface IContactPageProps {
  location: Location;
}

const ContactPage = ({location}: IContactPageProps) => {
  const intl = useIntl();
  const [messageType, setMessageType] = useState('');


  const messageTypes = [
    {
      value: CONTACT_COPY.MESSAGE_TYPES.BUG_REPORT.defaultMessage,
      label: intl.formatMessage(CONTACT_COPY.MESSAGE_TYPES.BUG_REPORT),
    },
    {
      value: CONTACT_COPY.MESSAGE_TYPES.COMMUNITY_FEEDBACK.defaultMessage,
      label: intl.formatMessage(CONTACT_COPY.MESSAGE_TYPES.COMMUNITY_FEEDBACK),
    },
    {
      value: CONTACT_COPY.MESSAGE_TYPES.DATASET_FEEDBACK.defaultMessage,
      label: intl.formatMessage(CONTACT_COPY.MESSAGE_TYPES.DATASET_FEEDBACK),
    },
  ];

  const onMessageTypeChange = (messageType:string | undefined) => {
    console.log('messageType', messageType);
    if (messageType) setMessageType(messageType);
  };

  return (
    <Layout location={location} title={intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_TILE)}>

      <J40MainGridContainer>
        <Grid row>
          <Grid col>
            <h1>
              {intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_HEADING)}
            </h1>
            <h2>
              {intl.formatMessage(CONTACT_COPY.PAGE_INTRO.PAGE_SUB_HEADING)}
            </h2>

            <Label htmlFor="messageType">
              {intl.formatMessage(CONTACT_COPY.MESSAGE_TYPES.FORM_SELECTION_PROMPT)}
            </Label>
            <ComboBox
              id="messageType"
              name="messageType"
              inputProps={{
                'aria-labelledby': 'Select form type',
                'title': 'Form Selector',
                'aria-label': 'Select form type',
              }}
              options={messageTypes}
              onChange={(messageType) => onMessageTypeChange(messageType)}
              ulProps={{'aria-labelledby': 'Form type options'}}
            />

            <IQContactForm messageType={messageType} />

            <p>
              <FormattedMessage
                id={CONTACT_COPY.CONTACT_VIA_EMAIL.ID}
                description={CONTACT_COPY.CONTACT_VIA_EMAIL.DESCRIPTION}
                defaultMessage={CONTACT_COPY.CONTACT_VIA_EMAIL.DEFAULT_MESSAGE}
                values={{
                  general_email_address:
                    <a
                      href={`mailto:${CONTACT_COPY.FEEDBACK_EMAIL}`}
                      target="_blank"
                      rel="noreferrer">
                      {CONTACT_COPY.FEEDBACK_EMAIL}
                    </a>,
                }}/>
            </p>
            <br />
          </Grid>
        </Grid>
      </J40MainGridContainer>
    </Layout>
  );
};

export default ContactPage;
