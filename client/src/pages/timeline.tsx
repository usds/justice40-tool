import * as React from 'react';
import Layout from '../components/layout';
import J40Aside from '../components/J40Aside';

// @ts-ignore
import renewIcon from '/node_modules/uswds/dist/img/usa-icons/autorenew.svg';

const TimelinePage = () => {
  return (<Layout>
    <main id="main-content" role="main">
      <div className={'grid-row grid-gap-2'}>
        <section className={'grid-container usa-section'}>
          <div className={'desktop:grid-col'}>
            <div className={'grid-row grid-gap-lg'}>
              <div className={'grid-gap-lg'}>
                <h1>Timeline</h1>
                <h2>Throughout the Process</h2>
                <div className="grid-col">
                  <div className="grid-row grid-gap-lg">
                    <div className="grid-col-1">
                      <img
                        className={'flex-align-self-center width-4'}
                        src={renewIcon} alt={'renew icon'}/>
                    </div>
                    <div className={'usa-prose text-asset-container ' +
                    'grid-col-fill'}>
                      <p>Continuously engage with stakeholders and community
                        members to get feedback on the screening tool, scoring,
                        and overall process.</p>
                      <p>Continuously source data that meets data principles as
                        defined through community input.</p>
                    </div>
                  </div>
                </div>

                <h2>Milestones</h2>
                <ol className={'usa-process-list'}>
                  <li
                    className={'j40-usa-process-list__item--complete ' +
                      'usa-process-list__item padding-bottom-4 '}
                    aria-details={'milestone 1 done'}>
                    <h4
                      className={'usa-process-list__heading'}
                    >Milestone 1</h4>
                    <p className={'margin-top-05'}>
                        Publish data principles on this site by June 2021.</p>
                  </li>
                  <li
                    className={'usa-process-list__item padding-bottom-4'}
                    aria-details={'milestone 2 next'}>
                    <h4
                      className={'usa-process-list__heading'}
                    >Milestone 2</h4>
                    <p>Make the first version of a screening tool available
                        by
                        July 2021.</p>
                  </li>
                  <li
                    className={'usa-process-list__item padding-bottom-4'}
                    aria-details={'milestone 3'}>
                    <h4
                      className={'usa-process-list__heading'}
                    >Milestone 3</h4>
                    <p>Create a public scorecard to ensure accountability of
                        investments by February 2022.</p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <J40Aside/>
      </div>
    </main>
  </Layout>
  );
};

export default TimelinePage;
