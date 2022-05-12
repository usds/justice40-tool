/* eslint-disable max-len */
import {defineMessages} from 'react-intl';
import mar9 from '../../images/eventDates/mar9.svg';
import mar10 from '../../images/eventDates/mar10.svg';
import mar16 from '../../images/eventDates/mar16.svg';
import mar22 from '../../images/eventDates/mar22.svg';
import mar30 from '../../images/eventDates/mar30.svg';
import mar31 from '../../images/eventDates/mar31.svg';
import apr15 from '../../images/eventDates/apr15.svg';
import may10 from '../../images/eventDates/may10.svg';
import may19 from '../../images/eventDates/may19.svg';
import mar9Exp from '../../images/eventDates/mar9-inactive.svg';
import mar10Exp from '../../images/eventDates/mar10-inactive.svg';
import mar16Exp from '../../images/eventDates/mar16-inactive.svg';
import mar22Exp from '../../images/eventDates/mar22-inactive.svg';
import mar30Exp from '../../images/eventDates/mar30-inactive.svg';
import mar31Exp from '../../images/eventDates/mar31-inactive.svg';
import apr15Exp from '../../images/eventDates/apr15-inactive.svg';
import may10Exp from '../../images/eventDates/may10-inactive.svg';
import may19Exp from '../../images/eventDates/may19-inactive.svg';


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

export const PUBLIC_ENG_VIDEO = defineMessages({
  TITLE: {
    id: 'public.eng.page.video.box.title.text',
    defaultMessage: `Can't make an upcoming session?`,
    description: 'Navigate to the the public engagement page, there will be box that allows users to watch previously recorded videos. This is that box title text.',
  },
  BODY: {
    id: 'public.eng.page.video.box.body.text',
    defaultMessage: `Watch a recorded version of the CEJST training on YouTube.`,
    description: 'Navigate to the the public engagement page, there will be box that allows users to watch previously recorded videos. This is that box body text.',
  },
  BUTTON1_TEXT: {
    id: 'public.eng.page.video.box.button1.text',
    defaultMessage: `Watch on YouTube`,
    description: 'Navigate to the the public engagement page, there will be box that allows users to watch previously recorded videos. This is that box button text.',
  },
  IMG_ALT_TEXT1: {
    id: 'public.eng.page.video.box.button.img.alt.text1',
    defaultMessage: `the icon to show that this button will open in a new tab`,
    description: 'Navigate to the the public engagement page, there will be box that allows users to watch previously recorded videos. This is alt tag of the image in the button.',
  },
  BUTTON2_TEXT: {
    id: 'public.eng.page.video.box.button2.text',
    defaultMessage: `Download slide deck`,
    description: 'Navigate to the the public engagement page, there will be box that allows users to watch previously recorded videos. This is the button text for the second button.',
  },
  IMG_ALT_TEXT2: {
    id: 'public.eng.page.video.box.button.img.alt.text2',
    defaultMessage: `the icon to show that this button will download the file`,
    description: 'Navigate to the the public engagement page, there will be box that allows users to watch previously recorded videos. This is alt tag of the image in the 2nd button.',
  },
});

export const PUBLIC_ENG_BUTTON = defineMessages({
  LABEL: {
    id: 'public.eng.page.button.label',
    defaultMessage: `Public engagement`,
    description: 'Navigate to the the public engagement page, this will be the public engagement button label',
  },
  TAG_LABEL: {
    id: 'public.eng.page.tag.label',
    defaultMessage: `UPDATED`,
    description: 'Navigate to the the public engagement page, this will be the public engagement tag label',
  },
  IMG_ICON_ALT_TAG: {
    id: 'public.eng.page.button.img.alt.tag',
    defaultMessage: `an icon that represents a calendar`,
    description: 'Navigate to the the public engagement page, this will be the public engagement button icon alt tag text',
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
  WHEJAC_DAY1: defineMessages({
    NAME: {
      id: 'public.eng.page.event.whejac.meeting.day.1.name',
      defaultMessage: `Public WHEJAC meeting day one`,
      description: 'public engagement page event WHEJAC meeting day 1 name',
    },
    DESCRIPTION: {
      id: 'public.eng.page.event.whejac.meeting.day.1.description',
      defaultMessage: `
        The White House Environmental Justice Advisory Council is also soliciting feedback on the beta version of the Climate and Economic Justice Screening Tool at its public meeting. The link above has additional details.
      `,
      description: 'public engagement page event WHEJAC day 1 description',
    },
  }),
  WHEJAC_DAY2: defineMessages({
    NAME: {
      id: 'public.eng.page.event.whejac.meeting.day.2.name',
      defaultMessage: `Public WHEJAC meeting day two`,
      description: 'public engagement page event WHEJAC meeting day 2 name',
    },
    DESCRIPTION: {
      id: 'public.eng.page.event.whejac.meeting.day.2.description',
      defaultMessage: `
        The White House Environmental Justice Advisory Council is also soliciting feedback on the beta version of the Climate and Economic Justice Screening Tool at its public meeting. The link above has additional details.
      `,
      description: 'public engagement page event WHEJAC day 2 description',
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

// All events dates are set one day ahead of actual date to account for timezone differences
// Note: all events in this events in this array must be in chronological order starting with the oldest event.
export const EVENTS = [
  {
    DATE: new Date(2022, 2, 10),
    NAME: EVENT_TYPES.TRAINING_SESS.NAME,
    DESC: EVENT_TYPES.TRAINING_SESS.DESCRIPTION,
    NUMBER: 1,
    IMAGE: mar9,
    EXPIRED_IMG: mar9Exp,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.event.training.1.info',
        defaultMessage: `March 9th (4:00 - 5:00 PM EST)`,
        description: 'Navigate to the the public engagement page, this will be the public engagement page event training session 1 date',
      },
    }),
    REG_LINK: `https://pitc.zoomgov.com/webinar/register/WN_D-Om_xXhTtiLv71y3Rr1CQ`,
    DATA_CY: `mar-9-reg-link-block`,
  },
  {
    DATE: new Date(2022, 2, 11),
    NAME: EVENT_TYPES.TRAINING_SESS.NAME,
    DESC: EVENT_TYPES.TRAINING_SESS.DESCRIPTION,
    NUMBER: 2,
    IMAGE: mar10,
    EXPIRED_IMG: mar10Exp,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.event.training.2.info',
        defaultMessage: `March 10th (4:00 - 5:00 PM EST)`,
        description: 'Navigate to the the public engagement page, this will be the public engagement page event training session 2 date',
      },
    }),
    REG_LINK: `https://pitc.zoomgov.com/webinar/register/WN_QsSqshI4TpmRBkI6nVlWxQ`,
    DATA_CY: `mar-10-reg-link-block`,

  },
  {
    DATE: new Date(2022, 2, 17),
    NAME: EVENT_TYPES.TRAINING_SESS.NAME,
    DESC: EVENT_TYPES.TRAINING_SESS.DESCRIPTION,
    NUMBER: 3,
    IMAGE: mar16,
    EXPIRED_IMG: mar16Exp,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.event.training.3.info',
        defaultMessage: `March 16th (4:00 - 5:00 PM EST)`,
        description: 'Navigate to the the public engagement page, this will be the public engagement page event training session 3 date',
      },
    }),
    REG_LINK: `https://pitc.zoomgov.com/webinar/register/WN_q86iMtpwTESYa6f0xpIk7g`,
    DATA_CY: `mar-16-reg-link-block`,

  },
  {
    DATE: new Date(2022, 2, 23),
    NAME: EVENT_TYPES.LISTENING_SESS.NAME,
    DESC: EVENT_TYPES.LISTENING_SESS.DESCRIPTION,
    NUMBER: 1,
    IMAGE: mar22,
    EXPIRED_IMG: mar22Exp,
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
    DATE: new Date(2022, 2, 31),
    NAME: EVENT_TYPES.WHEJAC_DAY1.NAME,
    DESC: EVENT_TYPES.WHEJAC_DAY1.DESCRIPTION,
    NUMBER: 0,
    IMAGE: mar30,
    EXPIRED_IMG: mar30Exp,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.whejac.meeting.day.1.info',
        defaultMessage: `March 30th (3:00 - 7:00 PM EST)`,
        description: 'public engagement page event WHEJAC',
      },
    }),
    REG_LINK: `https://usepa.zoomgov.com/webinar/register/WN_wCwVP1dtT0auAR5kfucVtw`,
    DATA_CY: `mar-30-reg-link-block`,
  },
  {
    DATE: new Date(2022, 3, 1),
    NAME: EVENT_TYPES.WHEJAC_DAY2.NAME,
    DESC: EVENT_TYPES.WHEJAC_DAY2.DESCRIPTION,
    NUMBER: 0,
    IMAGE: mar31,
    EXPIRED_IMG: mar31Exp,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.whejac.meeting.day.2.info',
        defaultMessage: `March 31th (3:00 - 7:30 PM EST)`,
        description: 'public engagement page event WHEJAC',
      },
    }),
    REG_LINK: `https://usepa.zoomgov.com/webinar/register/WN_wCwVP1dtT0auAR5kfucVtw`,
    DATA_CY: `mar-31-reg-link-block`,
  },
  {
    DATE: new Date(2022, 3, 16),
    NAME: EVENT_TYPES.LISTENING_SESS.NAME,
    DESC: EVENT_TYPES.LISTENING_SESS.DESCRIPTION,
    NUMBER: 2,
    IMAGE: apr15,
    EXPIRED_IMG: apr15Exp,
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
  {
    DATE: new Date(2022, 4, 11),
    NAME: EVENT_TYPES.LISTENING_SESS.NAME,
    DESC: EVENT_TYPES.LISTENING_SESS.DESCRIPTION,
    NUMBER: 3,
    IMAGE: may10,
    EXPIRED_IMG: may10Exp,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.event.listening.3.info',
        defaultMessage: `May 10th (4:00 PM EST)`,
        description: 'Navigate to the the public engagement page, this will be the public engagement page event listening session 3 date',
      },
    }),
    REG_LINK: `https://pitc.zoomgov.com/webinar/register/WN_dt0xRNioR8SugY2hrDk1JA`,
    DATA_CY: `may-10-reg-link-block`,
  },
  {
    DATE: new Date(2022, 4, 20),
    NAME: EVENT_TYPES.LISTENING_SESS.NAME,
    DESC: EVENT_TYPES.LISTENING_SESS.DESCRIPTION,
    NUMBER: 4,
    IMAGE: may19,
    EXPIRED_IMG: may19Exp,
    FIELDS: defineMessages({
      INFO: {
        id: 'public.eng.page.event.listening.4.info',
        defaultMessage: `May 19th (4:00 PM EST)`,
        description: 'Navigate to the the public engagement page, this will be the public engagement page event listening session 4 date',
      },
    }),
    REG_LINK: `https://pitc.zoomgov.com/webinar/register/WN_1PR73vLDQpq1zoAWkhKB5g`,
    DATA_CY: `may-19-reg-link-block`,
  },
];
