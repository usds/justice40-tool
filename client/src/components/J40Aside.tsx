import * as React from 'react';

// @ts-ignore
import chatIcon from '/node_modules/uswds/dist/img/usa-icons/chat.svg';
// @ts-ignore
import githubIcon from '/node_modules/uswds/dist/img/usa-icons/github.svg';

const J40Aside = () => {
  return (
    <>
      <aside
        aria-labelledby="right-sidebar"
        className={'j40-aside desktop:grid-col-3 usa-prose usa-section'}
        id="right-sidebar">
        <h2>Get Involved</h2>
        <h3><img
          className={'flex-align-self-center width-4 j40-aside-icon'}
          src={chatIcon} alt={'chat icon'}/>
        Send Feedback</h3>
        <p className={'usa-prose site-prose'}>Have ideas about how to
        acknowledge the on-the-ground experiences of your community?
        </p>
      Email: <a href="mailto: justice40open@usds.gov">
      justice40open@usds.gov</a>
        <p>&nbsp;</p>
        <h3>
          <img
            className={'flex-align-self-center width-4 j40-aside-icon'}
            src={githubIcon} alt={'github icon'}/>
        Join the open source community</h3>
        <p>
        Justice40’s code is open source, which means it is available for
        the public to view and contribute. Anyone can view and
        contribute on GitHub.
        </p>
        <p>
          <a
            href={'https://github.com/usds/justice40-tool/' +
          'crisis-at-home-and-abroad/'}
            target={'_blank'}
            rel={'noreferrer'}
            key={'github3'}>Check it out on GitHub</a>
        </p>
      </aside>
    </>
  );
};

export default J40Aside;
