/* eslint-disable max-len */
import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage, FormattedNumber} from 'gatsby-plugin-intl';
import {simpleLink} from './common';

export const PAGE_INTRO = defineMessages({
  PAGE_TILE: {
    id: 'downloads.page.title.text',
    defaultMessage: 'Downloads',
    description: 'Navigate to the the Downloads page, this will be the page title text',
  },
  PAGE_HEADING1: {
    id: 'downloads.page.heading1.text',
    defaultMessage: 'Downloads',
    description: 'Navigate to the the Downloads page, this will be the page heading1 text',
  },
  PAGE_HEADING2: {
    id: 'downloads.page.heading2.text',
    defaultMessage: 'File formats',
    description: 'Navigate to the the Downloads page, this will be the page heading2 text',
  },
  PAGE_DESCRIPTION1: {
    id: 'downloads.page.description1.text',
    defaultMessage: 'The dataset used in the tool, along with a data dictionary and information about how to use the list of communities (.pdf) are available in the following file formats:',
    description: 'Navigate to the the Downloads page, this will be the page description1 text',
  },
});

export const DOWNLOAD_LINKS = {
  EXCEL: <FormattedMessage
    id={'downloads.page.excel.link'}
    defaultMessage={`
        <link1>Excel file</link1> (.xlxs {excelFileSize} unzipped)
      `}
    description={'On the downloads page, the description of the excel link'}
    values={{
      link1: (str:string) => <a href='/about'>{str}</a>,
      excelFileSize: <FormattedNumber
        value={54}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  CSV: <FormattedMessage
    id={'downloads.page.csv.link'}
    defaultMessage={`
        <link1>CSV file </link1> (.csv {csvFileSize} unzipped)
      `}
    description={'On the downloads page, the description of the csv link'}
    values={{
      link1: simpleLink('/csv'),
      csvFileSize: <FormattedNumber
        value={52}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
  SHAPE: <FormattedMessage
    id={'downloads.page.shape.link'}
    defaultMessage={`
        <link1>Shapefiles </link1> (Codebook included with geojson {shapeFileSize} unzipped)
      `}
    description={'On the downloads page, the description of the shapefiles link'}
    values={{
      link1: simpleLink('/shape'),
      shapeFileSize: <FormattedNumber
        value={110}
        style="unit"
        unit="megabyte"
        unitDisplay="narrow"
      />,
    }}
  />,
};
