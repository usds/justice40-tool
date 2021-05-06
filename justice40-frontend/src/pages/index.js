import React, {useState} from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import OlMapWrapper from '../components/ol-map-wrapper';
import MapSlider from '../components/map-slider';
import * as styles from "./index.module.css";


function IndexPage(props) {
  const [heat, setHeat] = useState("");

  return (
    <Layout>
      <SEO title="Justice 40 Home" />
      <div className={`grid-container .height-auto`}>
        <div className="grid-row .height-auto">
          <div className="grid-col-8">
            <OlMapWrapper />
          </div>
          <div className="grid-col-4">
            <MapSlider rangeName="Heat" />
            <MapSlider rangeName="Poverty" />
            <MapSlider rangeName="Environmental" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
