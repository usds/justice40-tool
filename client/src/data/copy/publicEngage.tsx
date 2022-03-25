/* eslint-disable max-len */
import {defineMessages} from 'react-intl';
import mar9 from '../../images/eventDates/mar9.svg';
import mar10 from '../../images/eventDates/mar10.svg';
import mar16 from '../../images/eventDates/mar16.svg';
import mar22 from '../../images/eventDates/mar22.svg';
import apr15 from '../../images/eventDates/apr15.svg';


export const PAGE_INTRO = defineMessages({
  PAGE_TILE: {
    id: 'public.eng.page.title.text',
    defaultMessage: 'Public engagement opportunities',
    description: 'Navigate to the the public engagement page, this will be the publiceng page title text',
  },
  PAGE_HEADING1: {
    id: 'public.eng.page.heading1.text',
    defaultMessage: 'Public engagement opportunities',
    description: 'Navigate to the the public engagement page, this will be the publiceng page header text',
  },
  PAGE_HEADING2: {
    id: 'public.eng.page.sub.header2.text',
    defaultMessage: 'Find an event',
    description: 'Navigate to the the public engagement page, this will be the publiceng page sub header text',
  },
  PAGE_DESCRIPTION1: {
    id: 'public.eng.page.description1.text',
    defaultMessage: `
      CEQ is hosting engagement opportunities to connect with the public about the current version of the 
      tool. These sessions are an opportunity to obtain training on the tool or to provide feedback on the 
      beta version of the tool. CEQ hopes that members of the public will join these engagements to learn 
      about the tool, have their questions answered, and share feedback.
    `,
    description: 'Navigate to the the public engagement page, this will be the publiceng page description 1 text',
  },
  PAGE_DESCRIPTION2: {
    id: 'public.eng.page.description2.text',
    defaultMessage: `
      Pre-registration is required to participate and speak at the sessions.
    `,
    description: 'Navigate to the the public engagement page, this will be the publiceng page description 2 text',
  },
  PAGE_DESCRIPTION3: {
    id: 'public.eng.page.description3.text',
    defaultMessage: `
      As they become available, additional public trainings and engagement opportunities on the Climate 
      and Economic Justice Screening Tool will also be posted on this page.
    `,
    description: 'Navigate to the the public engagement page, this will be the publiceng page description 3 text',
  },
  SURVEY_TEXT: {
    id: 'fab.survey.text',
    defaultMessage: `Help improve the site & data`,
    description: 'Navigate to the the public engagement page, this will be the text for floating action button',
  },
});

export const PUBLIC_ENG_BUTTON = defineMessages({
  LABEL: {
    id: 'public.eng.page.button.label',
    defaultMessage: `Public Engagement`,
    description: 'Navigate to the the public engagement page, this will be the public engagement button label',
  },
  TAG_LABEL: {
    id: 'public.eng.page.tag.label',
    defaultMessage: `NEW`,
    description: 'Navigate to the the public engagement page, this will be the public engagement tag label',
  },
});

export const EVENT_TYPES = {
  TRAINING_SESS: defineMessages({
    NAME: {
      id: 'public.eng.page.event.training.sess.name',
      defaultMessage: `training session`,
      description: 'Navigate to the the public engagement page, this will be the public engagement page event training session name',
    },
    DESCRIPTION: {
      id: 'public.eng.page.event.training.description',
      defaultMessage: `
        The White House Council on Environmental Quality (CEQ), in partnership with the U.S. Digital 
        Service, is hosting a series of 'Training Webinars' for users of the Climate and Economic 
        Justice Screening Tool. These webinars are an opportunity for members of the public to learn how to 
        use the current version of the tool. The presenters at these webinars will be available to 
        provide technical support and address issues related to accessing and using the tool.
      `,
      description: 'Navigate to the the public engagement page, this will be the public engagement page event training session description',
    },
  }),
  LISTENING_SESS: defineMessages({
    NAME: {
      id: 'public.eng.page.event.listening.sess.name',
      defaultMessage: `listening session`,
      description: 'Navigate to the the public engagement page, this will be the public engagement page event listening session name',
    },
    DESCRIPTION: {
      id: 'public.eng.page.event.listening.sess.description',
      defaultMessage: `
        CEQ is hosting public listening sessions to seek input and feedback on the beta version of the 
        tool, including on the datasets it includes and the methodology it uses. This feedback is critical 
        to the development and enhancement of the tool. This feedback will help CEQ update and refine the 
        tool to ensure that it reflects the environmental, climate and other challenges that communities 
        are experiencing.
      `,
      description: 'Navigate to the the public engagement page, this will be the public engagement page event listening session description',
    },
  }),
};

export const EVENT_FIELDS = defineMessages({
  EVENT_INFO: {
    id: 'public.eng.page.event.info.label',
    defaultMessage: 'Event info',
    description: 'Navigate to the the public engagement page, this will be the public engagement page event info label',
  },
  REG_LINK: {
    id: 'public.eng.page.event.reglink.label',
    defaultMessage: 'Registration link',
    description: 'Navigate to the the public engagement page, this will be the public engagment page event registration link label',
  },
});

export const EVENTS = [
  {
    DATE: new Date(2022, 9, 3),
    NAME: EVENT_TYPES.TRAINING_SESS.NAME,
    DESC: EVENT_TYPES.TRAINING_SESS.DESCRIPTION,
    NUMBER: 1,
    IMAGE: mar9,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.event.training.1.info',
        defaultMessage: `March 9th (4:00 - 5:00 PM EST)`,
        description: 'Navigate to the the public engagement page, this will be the public engagement page event training session 1 date',
      },
    }),
    REG_LINK: null,
    DATA_CY: `mar-9-reg-link-block`,
  },
  {
    DATE: new Date(2022, 10, 3),
    NAME: EVENT_TYPES.TRAINING_SESS.NAME,
    DESC: EVENT_TYPES.TRAINING_SESS.DESCRIPTION,
    NUMBER: 2,
    IMAGE: mar10,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.event.training.2.info',
        defaultMessage: `March 10th (4:00 - 5:00 PM EST)`,
        description: 'Navigate to the the public engagement page, this will be the public engagement page event training session 2 date',
      },
    }),
    REG_LINK: null,
    DATA_CY: `mar-10-reg-link-block`,

  },
  {
    DATE: new Date(2022, 16, 3),
    NAME: EVENT_TYPES.TRAINING_SESS.NAME,
    DESC: EVENT_TYPES.TRAINING_SESS.DESCRIPTION,
    NUMBER: 3,
    IMAGE: mar16,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.event.training.3.info',
        defaultMessage: `March 16th (4:00 - 5:00 PM EST)`,
        description: 'Navigate to the the public engagement page, this will be the public engagement page event training session 3 date',
      },
    }),
    REG_LINK: null,
    DATA_CY: `mar-16-reg-link-block`,

  },
  {
    DATE: new Date(2022, 22, 3),
    NAME: EVENT_TYPES.LISTENING_SESS.NAME,
    DESC: EVENT_TYPES.LISTENING_SESS.DESCRIPTION,
    NUMBER: 1,
    IMAGE: mar22,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.event.listening.1.info',
        defaultMessage: `March 22nd (4:00 - 5:00 PM EST)`,
        description: 'Navigate to the the public engagement page, this will be the public engagement page event listening session 1 date',
      },
    }),
    REG_LINK: `https://pitc.zoomgov.com/webinar/register/WN_YT7_uLZqScGHgyAcTCuJjA`,
    DATA_CY: `mar-22-reg-link-block`,

  },
  {
    DATE: new Date(2022, 15, 4),
    NAME: EVENT_TYPES.LISTENING_SESS.NAME,
    DESC: EVENT_TYPES.LISTENING_SESS.DESCRIPTION,
    NUMBER: 2,
    IMAGE: apr15,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.event.listening.2.info',
        defaultMessage: `April 15th (4:00 - 5:00 PM EST)`,
        description: 'Navigate to the the public engagement page, this will be the public engagement page event listening session 2 date',
      },
    }),
    REG_LINK: `https://pitc.zoomgov.com/webinar/register/WN_dLw3xChiTlaOLGdHXQWk0w`,
    DATA_CY: `apr-15-reg-link-block`,
  },
];
