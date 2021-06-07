import * as React from 'react';

// @ts-ignore
import chatIcon from '/node_modules/uswds/dist/img/usa-icons/chat.svg';
// @ts-ignore
import githubIcon from '/node_modules/uswds/dist/img/usa-icons/github.svg';

const J40Aside = () => {
  return (
    <>
      <aside
        aria-labelledby="left-sidebar"
        className={'j40-aside desktop:grid-col-3'}
        id="left-sidebar">
        <section
          className={'usa-prose grid-gap grid-container usa-section'}>
          <h3 className={'j40-aside-title'}>Get Involved</h3>
          <h5>
            <img
              className={'flex-align-self-center width-4'} src={chatIcon}
              alt={'chat icon'}/>
            <br/>
          Send Feedback
          </h5>
          <p>Have ideas about how to acknowledge the on-the-ground
          experiences of your community?
          </p>
        Email: <a href="mailto: justice40open@usds.gov">
        justice40open@usds.gov</a>
          <p>&nbsp;</p>
          <h5>
            <img
              className={'flex-align-self-center width-4'}
              src={githubIcon} alt={'github icon'}/>
            <br/>
          Join the open source community</h5>
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
        </section>
      </aside>
    </>
  );
};

export default J40Aside;
