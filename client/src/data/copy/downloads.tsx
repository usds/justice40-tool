/* eslint-disable max-len */
import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedDate, FormattedMessage, FormattedNumber} from 'gatsby-plugin-intl';
import * as COMMON_COPY from './common';
import {VERSION_NUMBER} from './methodology';

export const PAGE_INTRO = defineMessages({
  PAGE_TILE: {
    id: 'downloads.page.title.text',
    defaultMessage: 'Downloads',
    description: 'Navigate to the Downloads page, this will be the page title text',
  },
  PAGE_HEADING1: {
    id: 'downloads.page.heading1.text',
    defaultMessage: 'Downloads',
    description: 'Navigate to the Downloads page, this will be the page heading1 text',
  },
  VIEW: {
    id: 'downloads.page.view.text',
    defaultMessage: 'View',
    description: 'Navigate to the Downloads page, this will be the view of change log',
  },
  CHANGE_LOG: {
    id: 'downloads.page.change.log.text',
    defaultMessage: 'release notes',
    description: 'Navigate to the Downloads page, this will be the view of release notes',
  },
});

export const getDownloadFileUrl = (filePath:string | undefined, isBeta: boolean) => {
  return [
    process.env.GATSBY_CDN_TILES_BASE_URL,
    (isBeta ? process.env.GATSBY_BETA_SCORE_PATH : process.env.GATSBY_1_0_SCORE_PATH),
    filePath,
  ].join('/');
};

// Define meta data on dowload files
export const DOWNLOAD_FILES = {
  NARWAL: {
    COMMUNITIES_LIST_XLS: {
      SIZE: 35.6, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_1_0_COMMUNITIES_LIST_XLS, false),
      LAST_UPDATED: COMMON_COPY.METH_1_0_RELEASE_DATE,
    },
    COMMUNITIES_LIST_CSV: {
      SIZE: 42, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_1_0_COMMUNITIES_LIST_CSV, false),
      LAST_UPDATED: COMMON_COPY.METH_1_0_RELEASE_DATE,
    },
    SHAPE_FILE: {
      SIZE: 356.8, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_1_0_SHAPE_FILE_ZIP, false),
      LAST_UPDATED: COMMON_COPY.METH_1_0_RELEASE_DATE,
    },
    TSD: {
      SIZE: 4.4, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_1_0_TSD_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_1_0_RELEASE_DATE,
    },
    TSD_ES: {
      SIZE: 4.8, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_TSD_ES_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_1_0_RELEASE_DATE,
    },
    HOW_TO_COMMUNITIES: {
      SIZE: 687.9, // KB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_1_0_COMMUNITIES_LIST_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_1_0_RELEASE_DATE,
    },
    INSTRUCTIONS: {
      SIZE: .8, // KB // Todo: Update when actual file is uploaded
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_1_0_INSTRUCT_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_1_0_RELEASE_DATE,
    },
    COMP_CHART: {
      SIZE: 33.1, // KB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_1_0_TOOL_COMP_PDF, false),
      LAST_UPDATED: COMMON_COPY.METH_1_0_RELEASE_DATE,
    },
  },
  BETA: {
    COMMUNITIES_LIST_XLS: {
      SIZE: 23.7, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_BETA_COMMUNITIES_LIST_XLS, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
    COMMUNITIES_LIST_CSV: {
      SIZE: 26.8, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_BETA_COMMUNITIES_LIST_CSV, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
    SHAPE_FILE: {
      SIZE: 351.4, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_BETA_SHAPE_FILE_ZIP, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
    TSD: {
      SIZE: 2.4, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_TSD_PDF, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
    TSD_ES: {
      SIZE: 4.8, // MB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_TSD_ES_PDF, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
    HOW_TO_COMMUNITIES: {
      SIZE: 658.3, // KB
      URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_HOW_TO_COMMUNITIES_PDF, true),
      LAST_UPDATED: new Date('10/27/2022').getTime(),
    },
  },
};

// If this is not a function, it will cause a circular dependency
export const getDownloadIconAltTag = () => defineMessages({
  ALT_TAG: {
    id: 'downloads.page.download.icon.alt.tag',
    defaultMessage: 'The icon used to indicate that the file is downloadable',
    description: 'Navigate to the Downloads page, this is the icon used to indicate that the file is downloadable',
  },
});

export const RELEASE_1_0 = {
  UPDATE_1: <FormattedMessage
    id={'download.page.release.update.title.1'}
    defaultMessage={`Version {release} Release update - {date}`}
    description={'Navigate to the download page. This is first download file link'}
    values={{
      release: VERSION_NUMBER,
      date: <FormattedDate
        value={COMMON_COPY.METH_1_0_RELEASE_DATE}
        year="numeric"
        month="short"
        day="numeric"
      />,
    }}
  />,
  SECTION1: <FormattedMessage
    id={'download.page.release.update.SECTION1'}
    defaultMessage={`New & improved`}
    description={'Navigate to the download page. This is first section of the release update SECTION1'}
  />,
  SECTION1_B1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B1'}
    defaultMessage={`Added lands within the boundaries of Federally Recognized Tribes and 
    locations of Alaska Native Villages using data from the Bureau of Indian
    Affairs at the U.S. Department of the Interior`}
    description={'Navigate to the download page. This is SECTION1_B1'}
  />,
  SECTION1_B2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2'}
    defaultMessage={`Added new data for indicators of burden`}
    description={'Navigate to the download page. This is SECTION1_B2'}
  />,
  SECTION1_B2_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_1'}
    defaultMessage={`Climate change`}
    description={'Navigate to the download page. This is SECTION1_B2_1'}
  />,
  SECTION1_B2_1_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_1_1'}
    defaultMessage={`Projected flood risk`}
    description={'Navigate to the download page. This is SECTION1_B2_1_1'}
  />,
  SECTION1_B2_1_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_1_2'}
    defaultMessage={`Projected wildfire risk`}
    description={'Navigate to the download page. This is SECTION1_B2_1_2'}
  />,
  SECTION1_B2_1_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_1_3'}
    defaultMessage={`Historic underinvestment due to redlining`}
    description={'Navigate to the download page. This is SECTION1_B2_1_3'}
  />,
  SECTION1_B2_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_2'}
    defaultMessage={`Housing`}
    description={'Navigate to the download page. This is SECTION1_B2_2'}
  />,
  SECTION1_B2_2_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_2_1'}
    defaultMessage={`Lack of plumbing`}
    description={'Navigate to the download page. This is SECTION1_B2_2_1'}
  />,
  SECTION1_B2_2_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_2_2'}
    defaultMessage={`Lack of green space`}
    description={'Navigate to the download page. This is SECTION1_B2_2_2'}
  />,
  SECTION1_B2_2_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_2_3'}
    defaultMessage={`Historic underinvestment (due to redlining)`}
    description={'Navigate to the download page. This is SECTION1_B2_2_3'}
  />,
  SECTION1_B2_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_3'}
    defaultMessage={`Legacy pollution`}
    description={'Navigate to the download page. This is SECTION1_B2_3'}
  />,
  SECTION1_B2_3_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_3_1'}
    defaultMessage={`Abandoned mine lands`}
    description={'Navigate to the download page. This is SECTION1_B2_3_1'}
  />,
  SECTION1_B2_3_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_3_2'}
    defaultMessage={`Formerly used defense sites`}
    description={'Navigate to the download page. This is SECTION1_B2_3_2'}
  />,
  SECTION1_B2_4: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_4'}
    defaultMessage={`Transportation`}
    description={'Navigate to the download page. This is SECTION1_B2_4'}
  />,
  SECTION1_B2_4_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_4_1'}
    defaultMessage={`Transportation barriers`}
    description={'Navigate to the download page. This is SECTION1_B2_4_1'}
  />,
  SECTION1_B2_5: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_5'}
    defaultMessage={`Water and wastewater`}
    description={'Navigate to the download page. This is SECTION1_B2_5'}
  />,
  SECTION1_B2_5_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B2_5_1'}
    defaultMessage={`Underground storage tanks and releases`}
    description={'Navigate to the download page. This is SECTION1_B2_5_1'}
  />,
  SECTION1_B3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B3'}
    defaultMessage={`Included communities that are completely surrounded by other 
    disadvantaged communities and that meet an adjusted low income 
    threshold`}
    description={'Navigate to the download page. This is SECTION1_B3'}
  />,
  SECTION1_B4: <FormattedMessage
    id={'download.page.release.update.SECTION1_B4'}
    defaultMessage={`Made technical changes to enhance accuracy of the tool`}
    description={'Navigate to the download page. This is SECTION1_B4'}
  />,
  SECTION1_B4_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B4_1'}
    defaultMessage={`Removed income data for students enrolled in higher education in the low income indicator`}
    description={'Navigate to the download page. This is SECTION1_B4_1'}
  />,
  SECTION1_B4_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B4_2'}
    defaultMessage={`Imputed income for census tracts missing income data`}
    description={'Navigate to the download page. This is SECTION1_B4_2'}
  />,
  SECTION1_B4_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B4_3'}
    defaultMessage={`Used transportation barriers and expected population loss rate 
    data burdens only for census tracts with populations of 20 or 
    more to exclude areas such as airports`}
    description={'Navigate to the download page. This is SECTION1_B4_3'}
  />,
  SECTION1_B5: <FormattedMessage
    id={'download.page.release.update.SECTION1_B5'}
    defaultMessage={`Improved the user interface`}
    description={'Navigate to the download page. This is SECTION1_B5'}
  />,
  SECTION1_B5_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B5_1'}
    defaultMessage={`Added demographics (race & age) for census tracts to map side panel`}
    description={'Navigate to the download page. This is SECTION1_B5_1'}
  />,
  SECTION1_B5_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B5_2'}
    defaultMessage={`Improved the design of the map side panel`}
    description={'Navigate to the download page. This is SECTION1_B5_2'}
  />,
  SECTION1_B5_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B5_3'}
    defaultMessage={`Updated the site copy of the website`}
    description={'Navigate to the download page. This is SECTION1_B5_3'}
  />,
  SECTION1_B6: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6'}
    defaultMessage={`Added new data for all the U.S. Territories, and also made a small methodology change for Puerto Rico`}
    description={'Navigate to the download page. This is SECTION1_B6'}
  />,
  SECTION1_B6_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_1'}
    defaultMessage={`USVI`}
    description={'Navigate to the download page. This is SECTION1_B6_1'}
  />,
  SECTION1_B6_1_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_1_1'}
    defaultMessage={`Included data from 2010 decennial census for US Virgin Islands`}
    description={'Navigate to the download page. This is SECTION1_B6_1_1'}
  />,
  SECTION1_B6_1_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_1_2'}
    defaultMessage={`New data from EJScreen 2.1`}
    description={'Navigate to the download page. This is SECTION1_B6_1_2'}
  />,
  SECTION1_B6_1_2_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_1_2_1'}
    defaultMessage={`Sustainable Housing:`}
    description={'Navigate to the download page. This is SECTION1_B6_1_2_1'}
  />,
  SECTION1_B6_1_2_1_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_1_2_1_1'}
    defaultMessage={`Lead paint`}
    description={'Navigate to the download page. This is SECTION1_B6_1_2_1_1'}
  />,
  SECTION1_B6_1_2_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_1_2_2'}
    defaultMessage={`Legacy pollution:`}
    description={'Navigate to the download page. This is SECTION1_B6_1_2_2'}
  />,
  SECTION1_B6_1_2_2_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_1_2_2_1'}
    defaultMessage={`Proximity to Superfund (National Priorities List (NPL)) sites`}
    description={'Navigate to the download page. This is SECTION1_B6_1_2_2_1'}
  />,
  SECTION1_B6_1_2_2_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_1_2_2_2'}
    defaultMessage={`Proximity to Risk Management Plan (RMP) sites`}
    description={'Navigate to the download page. This is SECTION1_B6_1_2_2_2'}
  />,
  SECTION1_B6_1_2_2_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_1_2_2_3'}
    defaultMessage={`Proximity to hazardous waste facilities`}
    description={'Navigate to the download page. This is SECTION1_B6_1_2_2_3'}
  />,
  SECTION1_B6_1_2_2_4: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_1_2_2_4'}
    defaultMessage={`Leaking underground storage tanks`}
    description={'Navigate to the download page. This is SECTION1_B6_1_2_2_4'}
  />,
  SECTION1_B6_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_2'}
    defaultMessage={`Guam`}
    description={'Navigate to the download page. This is SECTION1_B6_2'}
  />,
  SECTION1_B6_2_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_2_1'}
    defaultMessage={`Included data from 2010 decennial census for Guam`}
    description={'Navigate to the download page. This is SECTION1_B6_2_1'}
  />,
  SECTION1_B6_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_3'}
    defaultMessage={`Samoa`}
    description={'Navigate to the download page. This is SECTION1_B6_3'}
  />,
  SECTION1_B6_4: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_4'}
    defaultMessage={`Marianna Islands`}
    description={'Navigate to the download page. This is SECTION1_B6_4'}
  />,
  SECTION1_B6_5: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_5'}
    defaultMessage={`Puerto Rico`}
    description={'Navigate to the download page. This is SECTION1_B6_5'}
  />,
  SECTION1_B6_5_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_5_1'}
    defaultMessage={`Removed linguistic isolation as an indicator in the methodology for Puerto Rico`}
    description={'Navigate to the download page. This is SECTION1_B6_5_1'}
  />,
  SECTION1_B6_5_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_5_2'}
    defaultMessage={`Imported additional available data for Puerto Rico`}
    description={'Navigate to the download page. This is SECTION1_B6_5_2'}
  />,
  SECTION1_B6_5_2_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_5_2_1'}
    defaultMessage={`Energy cost`}
    description={'Navigate to the download page. This is SECTION1_B6_5_2_1'}
  />,
  SECTION1_B6_5_2_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_5_2_2'}
    defaultMessage={`Housing cost`}
    description={'Navigate to the download page. This is SECTION1_B6_5_2_2'}
  />,
  SECTION1_B6_5_2_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_5_2_3'}
    defaultMessage={`Abandoned mine lands`}
    description={'Navigate to the download page. This is SECTION1_B6_5_2_3'}
  />,
  SECTION1_B6_5_2_4: <FormattedMessage
    id={'download.page.release.update.SECTION1_B6_5_2_4'}
    defaultMessage={`Proximity to hazardous waste sites`}
    description={'Navigate to the download page. This is SECTION1_B6_5_2_4'}
  />,
  SECTION1_B7: <FormattedMessage
    id={'download.page.release.update.SECTION1_B7'}
    defaultMessage={`Updated data from EJScreen 2.1 across the entire tool:`}
    description={'Navigate to the download page. This is SECTION1_B7'}
  />,
  SECTION1_B7_1_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B7_1_1'}
    defaultMessage={`Lead paint - 2016-2020`}
    description={'Navigate to the download page. This is SECTION1_B7_1_1'}
  />,
  SECTION1_B7_2_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B7_2_1'}
    defaultMessage={`Proximity to Superfund (National Priorities List (NPL)) sites - 2022`}
    description={'Navigate to the download page. This is SECTION1_B7_2_1'}
  />,
  SECTION1_B7_2_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B7_2_2'}
    defaultMessage={`Proximity to Risk Management Plans (RMP) facilities - 2022`}
    description={'Navigate to the download page. This is SECTION1_B7_2_2'}
  />,
  SECTION1_B7_2_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B7_2_3'}
    defaultMessage={`Proximity to hazardous waste facilities - 2022`}
    description={'Navigate to the download page. This is SECTION1_B7_2_3'}
  />,
  SECTION1_B7_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B7_3'}
    defaultMessage={`Water and wastewater`}
    description={'Navigate to the download page. This is SECTION1_B7_3'}
  />,
  SECTION1_B7_3_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B7_3_1'}
    defaultMessage={`Leaking underground storage tanks - 2022`}
    description={'Navigate to the download page. This is SECTION1_B7_3_1'}
  />,
  SECTION1_B8: <FormattedMessage
    id={'download.page.release.update.SECTION1_B8'}
    defaultMessage={`Enhanced the technical files:`}
    description={'Navigate to the download page. This is SECTION1_B8'}
  />,
  SECTION1_B8_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B8_1'}
    defaultMessage={`Added all new data indicators and demographics to .xls, .csv, and shapefiles`}
    description={'Navigate to the download page. This is SECTION1_B8_1'}
  />,
  SECTION1_B8_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B8_2'}
    defaultMessage={`Added previous versions page to access the beta version’s 
    download files`}
    description={'Navigate to the download page. This is SECTION1_B8_2'}
  />,
  SECTION1_B8_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B8_3'}
    defaultMessage={`Updated codebook`}
    description={'Navigate to the download page. This is SECTION1_B8_3'}
  />,
  SECTION1_B8_4: <FormattedMessage
    id={'download.page.release.update.SECTION1_B8_4'}
    defaultMessage={`Updated Technical Support Document`}
    description={'Navigate to the download page. This is SECTION1_B8_4'}
  />,
  SECTION1_B9: <FormattedMessage
    id={'download.page.release.update.SECTION1_B9'}
    defaultMessage={`Improved the way that users provide feedback on the tool:`}
    description={'Navigate to the download page. This is SECTION1_B9'}
  />,
  SECTION1_B9_1: <FormattedMessage
    id={'download.page.release.update.SECTION1_B9_1'}
    defaultMessage={`Data survey`}
    description={'Navigate to the download page. This is SECTION1_B9_1'}
  />,
  SECTION1_B9_2: <FormattedMessage
    id={'download.page.release.update.SECTION1_B9_2'}
    defaultMessage={`Site experience survey`}
    description={'Navigate to the download page. This is SECTION1_B9_2'}
  />,
  SECTION1_B9_3: <FormattedMessage
    id={'download.page.release.update.SECTION1_B9_3'}
    defaultMessage={`Census tract feedback`}
    description={'Navigate to the download page. This is SECTION1_B9_3'}
  />,
  SECTION1_B9_4: <FormattedMessage
    id={'download.page.release.update.SECTION1_B9_4'}
    defaultMessage={`General contact form`}
    description={'Navigate to the download page. This is SECTION1_B9_4 '}
  />,
  SECTION1_B10: <FormattedMessage
    id={'download.page.release.update.SECTION1_B10'}
    defaultMessage={`Added a link to sign up for email mailing list managed by CEQ`}
    description={'Navigate to the download page. This is SECTION1_B10 '}
  />,


  SECTION2: <FormattedMessage
    id={'download.page.release.update.section.2'}
    defaultMessage={`Fixes`}
    description={'Navigate to the download page. This is second section of the release update section'}
  />,
  SECTION2_P1: <FormattedMessage
    id={'download.page.release.update.section.2.p1'}
    defaultMessage={`Bug fix: loaded missing life expectancy data for Maine and Wisconsin`}
    description={'Navigate to the download page. This is second section of the release update section'}
  />,
  SECTION2_P2: <FormattedMessage
    id={'download.page.release.update.section.2.p2'}
    defaultMessage={`Bug fix: Census tracts that are 100% water should not be 
    included on the map`}
    description={'Navigate to the download page. This is second section of the release update section'}
  />,
  FOOTER: <FormattedMessage
    id={'download.page.release.update.footer'}
    defaultMessage={`release version {version}`}
    description={'Navigate to the download page. This is second section of the release update section'}
    values={{
      version: VERSION_NUMBER,
    }}
  />,
};

export const DOWNLOAD_LINKS = {
  TITLE: <FormattedMessage
    id={'download.page.files.section.title'}
    defaultMessage={`Version {version} file formats`}
    description={'Navigate to the download page. This is first download file link'}
    values={{
      version: VERSION_NUMBER,
    }}
  />,
  TEXT: <FormattedMessage
    id={'downloads.page.files.section.text'}
    defaultMessage={ 'The dataset used in the {version} version of the tool, along with a codebook, and information about how to use the list of communities (.pdf) are available for download:'}
    description={ 'Navigate to the Downloads page, this will be the page description1 text'}
    values={{
      version: VERSION_NUMBER,
    }}
  />,
  LINK1: <FormattedMessage
    id={'download.page.download.file.1'}
    defaultMessage={`
      <link1>Communities list data</link1> (.xlsx {cldXlsFileSize})
      `}
    description={'Navigate to the download page. This is first download file link'}
    values={{
      link1: COMMON_COPY.downloadLink(DOWNLOAD_FILES.NARWAL.COMMUNITIES_LIST_XLS.URL),
      cldXlsFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.COMMUNITIES_LIST_XLS.SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  LINK2: <FormattedMessage
    id={'download.page.download.file.2'}
    defaultMessage={`<link2>Communities list data</link2> (.csv {cldCsvFileSize})`}
    description={'Navigate to the download page. This is second download file link'}
    values={{
      link2: COMMON_COPY.downloadLink(DOWNLOAD_FILES.NARWAL.COMMUNITIES_LIST_CSV.URL),
      cldCsvFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.COMMUNITIES_LIST_CSV.SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  LINK3: <FormattedMessage
    id={'download.page.download.file.3'}
    defaultMessage={`<link3>Shapefile</link3> (Codebook included with shapefile {shapeFileSize} unzipped)`}
    description={'Navigate to the download page. This is third download file link'}
    values={{
      link3: COMMON_COPY.downloadLink(DOWNLOAD_FILES.NARWAL.SHAPE_FILE.URL),
      shapeFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.SHAPE_FILE.SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  LINK4: <FormattedMessage
    id={'download.page.download.file.4'}
    defaultMessage={`<link4>Technical support document</link4> (.pdf {tsdFileSize})`}
    description={'Navigate to the download page. This is fourth download file link'}
    values={{
      link4: COMMON_COPY.linkFn(DOWNLOAD_FILES.NARWAL.TSD.URL, false, true),
      link4es: COMMON_COPY.linkFn(DOWNLOAD_FILES.NARWAL.TSD_ES.URL, false, true),
      tsdFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.TSD.SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  LINK5: <FormattedMessage
    id={'download.page.download.file.5'}
    defaultMessage={`<link5>How to use the list of communities</link5> (.pdf {howToCommFileSize})`}
    description={'Navigate to the download page. This is fifth download file link'}
    values={{
      link5: COMMON_COPY.linkFn(DOWNLOAD_FILES.NARWAL.HOW_TO_COMMUNITIES.URL, false, true),
      howToCommFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.NARWAL.HOW_TO_COMMUNITIES.SIZE}
        style="unit"
        unit="kilobyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  // };
};
