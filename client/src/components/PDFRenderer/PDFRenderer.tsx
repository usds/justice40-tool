import React from 'react';
import {Page, Image, View, Text, Document, StyleSheet} from '@react-pdf/renderer';
// import {useIntl} from 'gatsby-plugin-intl';

// import {LocalizedComponent} from '../../test/testHelpers';

import cejstLogo from '../../images/cejst-logo.png';
import * as EXPLORE_COPY from '../../data/copy/explore';


const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    // paddingHorizontal: 35,
  },
  logo: {
    width: 200,
    marginLeft: 30,
  },
  heading1: {
    fontFamily: 'Times-Roman',
    fontSize: 32,
    marginLeft: 22,
    marginTop: 20,
    maringBottom: 30,
  },
  heading2: {
    fontFamily: 'Times-Roman',
    fontSize: 24,
    marginLeft: 24,
    marginTop: 18,
    maringBottom: 18,
  },
  heading3: {
    fontFamily: 'Times-Roman',
    fontSize: 18.72,
    marginLeft: 30,
    marginTop: 16,
    maringBottom: 16,
  },
  heading4: {
    fontFamily: 'Times-Roman',
    fontSize: 16,
    marginLeft: 24,
    marginTop: 14,
    maringBottom: 14,
  },
  paragraph: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 34,
    marginTop: 4,
    maringBottom: 4,
  },
  labelText: {
    fontFamily: 'Times-Roman',
    fontSize: 12,
    fontWeight: 900,
  },
  text: {
    fontFamily: 'Times-Roman',
    fontSize: 12,
    fontWeight: 'bold',
  },
});


const PDFRenderer = () => {
//   const intl = useIntl();
  return (
  // <LocalizedComponent>

    <Document>
      <Page style={styles.page}>
        {/* Need to remove text from logo to allow for Spanish, right now hard coded */}
        <Image style={styles.logo} src={cejstLogo} />

        <Text style={styles.heading1}> Census tract report</Text>

        <Text style={styles.heading2}> Census tract info</Text>

        <View style={styles.paragraph}>
          <Text style={styles.labelText}>
            {/* {intl.formatMessage(EXPLORE_COPY.SIDE_PANEL_CBG_INFO.CENSUS_BLOCK_GROUP)} */}
            {EXPLORE_COPY.SIDE_PANEL_CBG_INFO.CENSUS_BLOCK_GROUP.defaultMessage}
          </Text>
          <Text style={styles.text}>
            123940813495793485
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.labelText}>
            {EXPLORE_COPY.SIDE_PANEL_CBG_INFO.COUNTY.defaultMessage}
          </Text>
          <Text style={styles.text}>
            Kings County
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.labelText}>
            {EXPLORE_COPY.SIDE_PANEL_CBG_INFO.STATE.defaultMessage}
          </Text>
          <Text style={styles.text}>
            New York
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.labelText}>
            {EXPLORE_COPY.SIDE_PANEL_CBG_INFO.POPULATION.defaultMessage}
          </Text>
          <Text style={styles.text}>
            4,145
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.labelText}>
            {EXPLORE_COPY.COMMUNITY.IS_FOCUS}
          </Text>
          <Text style={styles.text}>
            Yes
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.text}>
             Disadvantaged in 5 categories
          </Text>
        </View>

        <Text style={styles.heading2}> Categories</Text>

        <Text style={styles.heading3}>
          {EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLIMATE.defaultMessage}
        </Text>

        <View style={styles.paragraph}>
          <Text style={styles.labelText}>
            {EXPLORE_COPY.SIDE_PANEL_SPACERS.EXCEED_ONE_OR_MORE}
          </Text>
          <Text style={styles.text}>
            No
          </Text>
        </View>

        <Text style={styles.heading3}>
          {EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_ENERGY.defaultMessage}
        </Text>
        <Text style={styles.heading3}>
          {EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_TRANSPORT.defaultMessage}
        </Text>
        <Text style={styles.heading3}>
          {EXPLORE_COPY.SIDE_PANEL_CATEGORY.LEG_POLLUTE.defaultMessage}
        </Text>
        <Text style={styles.heading3}>
          {EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_WATER.defaultMessage}
        </Text>
        <Text style={styles.heading3}>
          {EXPLORE_COPY.SIDE_PANEL_CATEGORY.CLEAN_WATER.defaultMessage}
        </Text>
      </Page>
    </Document>
    // </LocalizedComponent>
  );
};

export default PDFRenderer;
