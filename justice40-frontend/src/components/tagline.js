import React from 'react';

/*
  This tagline will appear in your homepage
*/

const Tagline = () => (
  <section className="grid-container usa-section usa-prose">
    <div className="grid-row grid-gap">
      <div className="tablet:grid-col-4">
        <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
          Mapping Environment Justice Communities
        </h2>
      </div>
      <div className="tablet:grid-col-8 usa-prose">
        <p>
          The tagline should inspire confidence and interest, focusing on the
          value that your overall approach offers to your audience. Use a
          heading typeface and keep your tagline to just a few words, and don’t
          confuse or mystify.
        </p>
        <p>
          Use the right side of the grid to explain the tagline a bit more. What
          are your goals? How do you do your work? Write in the present tense,
          and stay brief here. People who are interested can find details on
          internal pages.
        </p>
      </div>
    </div>
  </section>
);

export default Tagline;
