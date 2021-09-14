import * as React from 'react';
import Layout from '../components/layout';

// THIS COMPONENT IS NOT BEING USED

// @ts-ignore
// import renewIcon from '/node_modules/uswds/dist/img/usa-icons/autorenew.svg';

interface TimelinePageProps {
  location: Location;
}

const TimelinePage = ({location}: TimelinePageProps) => {
  return (<Layout location={location} title={'Timeline'}>
    <section>
      {/* <h1>Timelin</h1>
      <h2>Throughout the Process</h2>
      <div className="grid-col">
        <div className="grid-row grid-gap-lg">
          <div className="grid-col-1">
            <img
              className={''}
              src={renewIcon} alt={'renew icon'}/>
          </div>
          <div className={'text-asset-container ' +
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
          aria-label={'milestone 1 done'}>
          <h4 className={'usa-process-list__heading'}>Milestone 1</h4>
          <p className={'margin-top-05'}>
            Publish data principles on this site by June 2021.</p>
        </li>
        <li
          className={'usa-process-list__item padding-bottom-4'}
          aria-label={'milestone 2 next'}>
          <h4 className={'usa-process-list__heading'}>Milestone 2</h4>
          <p>Make the first version of a screening tool
            available by July 2021.</p>
        </li>
        <li
          className={'usa-process-list__item padding-bottom-4'}
          aria-label={'milestone 3'}>
          <h4 className={'usa-process-list__heading'}>Milestone 3</h4>
          <p>Create a public scorecard to ensure accountability of
              investments by February 2022.</p>
        </li>
      </ol> */}
    </section>
  </Layout>
  );
};

export default TimelinePage;
