import * as React from 'react';
import Layout from '../components/layout';
// import {GridContainer, Grid} from '@trussworks/react-uswds';

// this section seems too verbose? must be a more readable way to do this.
// this inlines the svg as data:image/svg+xml For larger images this
// can cause page bloat, but it should be fine here.
// @ts-ignore
import publicIcon from '/node_modules/uswds/dist/img/usa-icons/public.svg';
// @ts-ignore
import chatIcon from '/node_modules/uswds/dist/img/usa-icons/chat.svg';
// @ts-ignore
import githubIcon from '/node_modules/uswds/dist/img/usa-icons/github.svg';
// @ts-ignore
import ecoIcon from '/node_modules/uswds/dist/img/usa-icons/eco.svg';
// @ts-ignore
import busIcon from '/node_modules/uswds/dist/img/usa-icons/directions_bus.svg';
// @ts-ignore
import homeIcon from '/node_modules/uswds/dist/img/usa-icons/home.svg';
// @ts-ignore
import groupsIcon from '/node_modules/uswds/dist/img/usa-icons/groups.svg';
// todo: fix svg overlay
// @ts-ignore
import pollutionIcon from '/node_modules/uswds/dist/img/usa-icons/warning.svg';
// @ts-ignore
// eslint-disable-next-line max-len
import washIcon from '/node_modules/uswds/dist/img/usa-icons/wash.svg';


// markup
const IndexPage = () => {
  const readMoreList: (any | string)[][] = [
    [publicIcon, 'Climate change'],
    [ecoIcon, 'Clean energy and energy efficiency'],
    [busIcon, 'Clean transit'],
    [homeIcon, 'Affordable and sustainable housing'],
    [groupsIcon, 'Training and workforce development'],
    [pollutionIcon, 'Remediation of legacy pollution'],
    [washIcon, 'Clean water infrastructure'],
  ];

  return (
    <Layout>

      <main id="main-content" role="main">
        <section className="grid-container">
          <div className="grid-row grid-gap">

            <div className="desktop:grid-col">
              <div className="grid-row grid-gap">
                <div
                  className="desktop:grid-col-10 \
                            usa-prose text-asset-container">
                  <h2>Our Team</h2>
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
                    Biden’s Executive Order on Tackling the Climate Crisis at
                    Home and Abroad.
                  </p>
                </div>
              </div>

              <div className="tablet:grid-col-10">
                <ul className="usa-icon-list j40-two-column">
                  {readMoreList.map((item, index) => {
                    return (
                      <li
                        key={`readmore_li_${index}`}
                        className="usa-icon-list__item">
                        <div className="usa-icon-list__icon">
                          <img
                            className="j40-two-column-icons-spacing"
                            key={`readmore_img_${index}`}
                            src={item[0]} alt={item[1] + ' icon'}/>
                        </div>
                        <div
                          className="usa-icon-list__content"> {item[1]} </div>
                      </li>
                    );
                  })
                  }
                </ul>
              </div>


              <div className="grid-row grid-gap">
                <div
                  className="desktop:grid-col-10 \
                            usa-prose text-asset-container">
                  <h3>A Transparent, Community-First Approach</h3>

                  <p>
                    Successful initiatives are guided by direct input from the
                    communities they are serving. CEQ
                    commits
                    to transparency, inclusivity, and iteration in building this
                    screening tool.
                  </p>

                  <p>
                    Transparent: The code and data behind the screening tool are
                    open source, meaning it is available
                    for the public to review and contribute to. This tool is
                    being developed publicly so that
                    communities,
                    academic experts, and anyone who’s interested can be
                    involved in the tool-building process.
                  </p>

                  <p>
                    Inclusive: Many areas which lack investments also lack
                    environmental data and would be overlooked
                    using available environmental data. CEQ is actively reaching
                    out to groups that have historically
                    been excluded from decision-making, such as groups in rural
                    and tribal areas, to understand their
                    needs
                    and ask for their input.
                  </p>

                  <p>
                    Iterative: The initial community prioritization list
                    provided by the screening tool is the
                    beginning
                    of a collaborative process in score refinement, rather than
                    a final answer. CEQ has received
                    recommendations on data sets from community interviews, the
                    White House Environmental Justice
                    Advisory Council, and through public comment, but
                    establishing a score that is truly
                    representative
                    will be a long-term, ongoing process. As communities submit
                    feedback and recommendations, CEQ will
                    continue to improve the tools being built and the processes
                    for stakeholder and public engagement.
                  </p>
                </div>
              </div>

              <div className="grid-row grid-gap">
                <div
                  className="desktop:grid-col-10 \
                            usa-prose text-asset-container">
                  <h3>Timeline</h3>
                  <p>
                    [timeline image here]
                  </p>

                  <p>
                    Continuously engage with stakeholders and community members
                    to get feedback on the screening tool,
                    scoring, and overall process.
                  </p>

                  <p>
                    Continuously source data that meets data principles as
                    defined through community input.
                  </p>
                </div>
              </div>

            </div>

            {/* aside*/}
            <aside
              aria-labelledby="left-sidebar"
              className="desktop:grid-col-2 usa-prose"
              id="left-sidebar">
              <h2 className={'usa-graphic-list__heading'}>Get Involved</h2>
              <h3>
                <img
                  className={'flex-align-self-center width-5'} src={chatIcon}
                  alt={'chat icon'}/>
                <br/>
                Send Feedback
              </h3>
              <p>Have ideas about how to
                acknowledge the on-the-ground
                experiences of your community?
              </p>
              Email: <a href="mailto: justice40open@usds.gov">
              justice40open@usds.gov</a>
              <p>&nbsp;</p>
              <h3>
                <img
                  className={'flex-align-self-center width-5'}
                  src={githubIcon} alt={'github icon'}/>
                <br/>
                Join the open source community</h3>
              <p>
                Justice40’s code is open source, which means it is available for
                the public to view and contribute.
                Anyone can view and contribute on GitHub.
              </p>
              <p>
                <a href={'https://github.com/usds/justice40-tool'}>Check it out
                  on GitHub</a></p>

            </aside>
          </div>

        </section>
      </main>
    </Layout>
  );
};

export default IndexPage;
