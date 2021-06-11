import * as React from 'react';
import Layout from '../components/layout';

// import {GridContainer, Grid} from '@trussworks/react-uswds';

// this section seems too verbose? must be a more readable way to do this.
// this inlines the svg as data:image/svg+xml For larger images this
// can cause page bloat, but it should be fine here.
// @ts-ignore
import ecoIcon from '/node_modules/uswds/dist/img/usa-icons/eco.svg';
// @ts-ignore
import busIcon from '/node_modules/uswds/dist/img/usa-icons/directions_bus.svg';
// @ts-ignore
import homeIcon from '/node_modules/uswds/dist/img/usa-icons/home.svg';
// @ts-ignore
import groupsIcon from '/node_modules/uswds/dist/img/usa-icons/groups.svg';
import pollutionIcon // @ts-ignore
  from '/node_modules/uswds/dist/img/usa-icons/severe_weather.svg';
// @ts-ignore
import washIcon from '/node_modules/uswds/dist/img/usa-icons/wash.svg';


interface IndexPageProps {
  location: Location;
}

// markup
const IndexPage = ({location}: IndexPageProps) => {
  const readMoreList: (any | string)[][] = [
    [ecoIcon, 'Clean energy and energy efficiency'],
    [busIcon, 'Clean transit'],
    [homeIcon, 'Affordable and sustainable housing'],
    [groupsIcon, 'Training and workforce development'],
    [pollutionIcon, 'Remediation of legacy pollution'],
    [washIcon, 'Clean water infrastructure'],
  ];

  return (<Layout location={location}>
    <h1>About Justice40</h1>
    <p>
        In an effort to address historical environmental injustices,
        President Biden created the Justice40 Initiative on January
        27, 2021. The Justice40 Initiative directs 40% of the
        benefits from federal investments in seven key areas to
        overburdened and underserved communities.
    </p>

    <p>
        Federal agencies will prioritize benefits using a new
        climate and economic justice screening tool. This screening
        tool will be a map that visualizes data to compare the
        cumulative impacts of environmental, climate, and economic
        factors. It is being developed by the Council on
        Environmental Quality (CEQ) with guidance from environmental
        justice leaders and communities affected by environmental
        injustices. The first version of the screening tool will be
        released in July 2021. However, the screening tool and data
        being used will be continuously updated to better reflect
        the lived experiences of community members.
    </p>

    <p>
        Read more about the Justice40 Initiative in President
        Biden’s <a
        href={'https://www.whitehouse.gov/briefing-room/' +
        'presidential-actions/2021/01/27/' +
        'executive-order-on-tackling-the-climate-' +
        'crisis-at-home-and-abroad/'}
        target={'_blank'}
        rel={'noreferrer'}>
        Executive Order on Tackling the Climate Crisis at Home and
        Abroad.</a>
    </p>

    <h2>Areas of Focus</h2>
    <div className={'grid-row grid-gap'}>
      <div className={'j40-two-column-confine'}>
        <ul className={'usa-icon-list j40-two-column'}>
          {readMoreList.map((item, index) => {
            return (
              <li
                key={`readmore_li_${index}`}
                className={'usa-icon-list__item'}>
                <div className={'usa-icon-list__icon'}>
                  <img
                    className={'j40-two-column-icons-spacing'}
                    key={`readmore_img_${index}`}
                    src={item[0]} alt={item[1] + ' icon'}/>
                </div>
                <div
                  className={'usa-icon-list__content'}> {item[1]} </div>
              </li>
            );
          })
          }
        </ul>
      </div>
    </div>


    <h2>A Transparent, Community-First Approach</h2>

    <p>
    Successful initiatives are guided by direct input from the
    communities they are serving. CEQ commits to transparency,
    inclusivity, and iteration in building this screening tool.
    </p>

    <p>
      <i>Transparent:</i> The code and data behind the screening
    tool are open source, meaning it is available for the public
    to review and contribute to. This tool is being developed
    publicly so that communities, academic experts, and anyone
    who’s interested can be involved in the tool-building
    process.
    </p>

    <p>
      <i>Inclusive:</i> Many areas which lack investments also
    lack environmental data and would be overlooked using
    available environmental data. CEQ is actively reaching out
    to groups that have historically been excluded from
    decision-making, such as groups in rural and tribal areas,
    to understand their needs and ask for their input.
    </p>

    <p>
      <i>Iterative:</i> The initial community prioritization list
    provided by the screening tool is the beginning of a
    collaborative process in score refinement, rather than a
    final answer. CEQ has received recommendations on data sets
    from community interviews, the White House Environmental
    Justice Advisory Council, and through public comment, but
    establishing a score that is truly representative will be a
    long-term, ongoing process. As communities submit feedback
    and recommendations, CEQ will continue to improve the tools
    being built and the processes for stakeholder and public
    engagement.
    </p>

  </Layout>
  );
};

export default IndexPage;
