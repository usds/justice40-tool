import React from 'react';

/*
  This will be displayed on the homepage. Ideally, you want to highlight key goals of the website
*/

const Hero = () => (
  <section className="usa-hero">
    <div className="grid-container">
      <div className="usa-hero__callout">
        <h2 className="usa-hero__heading">
          <span className="usa-hero__heading--alt">Hero callout:</span>Bring
          attention to a project priority
        </h2>
        <p>
          Support the callout with some short explanatory text. You don’t need
          more than a couple of sentences.
        </p>
        <a className="usa-button" href="/">
          Call to action
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
