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
    defaultMessage: 'change log',
    description: 'Navigate to the Downloads page, this will be the view of change log',
  },
});

const getDownloadFileUrl = (filePath:string | undefined) => {
  return [
    process.env.GATSBY_CDN_TILES_BASE_URL,
    process.env.GATSBY_DATA_PIPELINE_SCORE_PATH,
    filePath,
  ].join('/');
};

// Define meta data on dowload files
export const DOWNLOAD_FILES = {
  SCREENING_TOOL_DATA_ZIP: {
    SIZE: 53.7, // MB
    URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_SCREENING_TOOL_DATA_ZIP),
    LAST_UPDATED: new Date('5/4/2022').getTime(),
  },
  COMMUNITIES_LIST_CSV: {
    SIZE: 28.1, // MB
    URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_COMMUNITIES_LIST_CSV),
    LAST_UPDATED: new Date('5/4/2022').getTime(),
  },
  COMMUNITIES_LIST_XLS: {
    SIZE: 24.9, // MB
    URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_COMMUNITIES_LIST_XLS),
    LAST_UPDATED: new Date('5/4/2022').getTime(),
  },
  SHAPE_FILE: {
    SIZE: 741, // MB
    URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_SHAPE_FILE_ZIP),
    LAST_UPDATED: new Date('5/4/2022').getTime(),
  },
  TSD: {
    SIZE: 2.5, // MB
    URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_TSD_PDF),
    LAST_UPDATED: new Date('5/4/2022').getTime(),
  },
  TSD_ES: {
    SIZE: 2.5, // MB
    URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_TSD_ES_PDF),
    LAST_UPDATED: new Date('5/4/2022').getTime(),
  },
  HOW_TO_COMMUNITIES: {
    SIZE: 674, // KB
    URL: getDownloadFileUrl(process.env.GATSBY_FILE_DL_PATH_HOW_TO_COMMUNITIES_PDF),
    LAST_UPDATED: new Date('5/4/2022').getTime(),
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

export const RELEASE = {
  UPDATE_1: <FormattedMessage
    id={'download.page.release.update.title.1'}
    defaultMessage={`Release update - {date}`}
    description={'Navigate to the download page. This is first download file link'}
    values={{
      date: <FormattedDate
        value={COMMON_COPY.METH_1_0_RELEASE_DATE}
        year="numeric"
        month="short"
        day="numeric"
      />,
    }}
  />,
  SECTION1: <FormattedMessage
    id={'download.page.release.update.section.1'}
    defaultMessage={`New & improved`}
    description={'Navigate to the download page. This is first section of the release update section'}
  />,
  SECTION1_P1: <FormattedMessage
    id={'download.page.release.update.section.1.p.1'}
    defaultMessage={`Updates to the methodology based on feedback recieved during the beta period.`}
    description={'Navigate to the download page. This is first section of the release update section'}
  />,
  SECTION1_P1_1: <FormattedMessage
    id={'download.page.release.update.section.1.p.1.1'}
    defaultMessage={`Additional data sources now available for Puerto Rico. Linguistic isolation as removed from the methodology for Puerto Rico.`}
    description={'Navigate to the download page. This is first section of the release update section'}
  />,
  SECTION2: <FormattedMessage
    id={'download.page.release.update.section.2'}
    defaultMessage={`Fixes`}
    description={'Navigate to the download page. This is second section of the release update section'}
  />,
  SECTION2_P1: <FormattedMessage
    id={'download.page.release.update.section.2.p1'}
    defaultMessage={`Fixed an issue with zoom and select to show census boundaries at a higher zoom level.`}
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
      link1: COMMON_COPY.downloadLink(DOWNLOAD_FILES.COMMUNITIES_LIST_XLS.URL),
      cldXlsFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.COMMUNITIES_LIST_XLS.SIZE}
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
      link2: COMMON_COPY.downloadLink(DOWNLOAD_FILES.COMMUNITIES_LIST_CSV.URL),
      cldCsvFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.COMMUNITIES_LIST_CSV.SIZE}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  LINK3: <FormattedMessage
    id={'download.page.download.file.3'}
    defaultMessage={`<link3>Shapefile</link3> (Codebook included with geojson {shapeFileSize} unzipped)`}
    description={'Navigate to the download page. This is third download file link'}
    values={{
      link3: COMMON_COPY.downloadLink(DOWNLOAD_FILES.SHAPE_FILE.URL),
      shapeFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.SHAPE_FILE.SIZE}
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
      link4: COMMON_COPY.linkFn(DOWNLOAD_FILES.TSD.URL, false, true),
      link4es: COMMON_COPY.linkFn(DOWNLOAD_FILES.TSD_ES.URL, false, true),
      tsdFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.TSD.SIZE}
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
      link5: COMMON_COPY.linkFn(DOWNLOAD_FILES.HOW_TO_COMMUNITIES.URL, false, true),
      howToCommFileSize: <FormattedNumber
        value={DOWNLOAD_FILES.HOW_TO_COMMUNITIES.SIZE}
        style="unit"
        unit="kilobyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  // };
};
