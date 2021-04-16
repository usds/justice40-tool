import * as React from "react"
import Layout from '../components/layout';
import SEO from '../components/seo';
import Tagline from '../components/tagline';
import { Helmet } from "react-helmet";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'


// markup
const IndexPage = () => {
  return (
    <>
    <Helmet>
      
    </Helmet>
    <Layout>
      <SEO title="Justice 40 Home" />
      
      <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "400px" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>

      <Tagline />
    </Layout>
    </>
    // <main>
    //   <title>Home Page</title>
    //   <h1>
    //     Congratulations
    //     <br />
    //     <span>— you just made a Gatsby site! </span>
    //     <span role="img" aria-label="Party popper emojis">
    //       🎉🎉🎉
    //     </span>
    //   </h1>
      

    //   <ul class="usa-card-group">
    //     <li class="tablet:grid-col-4 usa-card">
    //       <div class="usa-card__container">
    //         <header class="usa-card__header">
    //           <h2 class="usa-card__heading">Card</h2>
    //         </header>
    //         <div class="usa-card__body">
    //           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum tenetur quo cupiditate, eaque qui officia recusandae. Excepturi nobis dolores molestias! Quas quisquam a officia eos.</p>
    //         </div>
    //         <div class="usa-card__footer">
    //           <button class="usa-button">Visit Florida Keys</button>
    //         </div>
    //       </div>
    //     </li>
    //   </ul>


      
    // </main>
  )
}

export default IndexPage
