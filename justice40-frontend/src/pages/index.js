import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import OlMapWrapper from '../components/ol-map-wrapper';
import * as styles from "./index.module.css";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Justice 40 Home" />
      <div className={`grid-container .height-auto`}>
        <div className="grid-row .height-auto">
          <div className="grid-col-8">
            <OlMapWrapper />
          </div>
          <div className="grid-col-4"></div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
