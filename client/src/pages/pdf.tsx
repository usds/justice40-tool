import * as React from 'react';

import J40MainGridContainer from '../components/J40MainGridContainer';
import Layout from '../components/layout';
import PDFRenderer from '../components/PDFRenderer/PDFRenderer';
import {PDFDownloadLink} from '@react-pdf/renderer';

interface IContactPageProps {
  location: Location;
}

const ContactPage = ({location}: IContactPageProps) => {
  return (
    <Layout location={location} title={'test'}>

      <J40MainGridContainer>
        <PDFDownloadLink document={<PDFRenderer/>} fileName="document">
          {({loading}) =>
            loading ? (
                <button>Generating Report</button>
            ) : (
            <button>Download Report</button>
            )}
        </PDFDownloadLink>
        {/* <PDFRenderer /> */}
      </J40MainGridContainer>
    </Layout>
  );
};

export default ContactPage;
