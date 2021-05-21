import React from 'react';
import { GovBanner, Header, Title, PrimaryNav } from '@trussworks/react-uswds';
import { useStaticQuery, graphql, Link } from "gatsby";

const headerLinks = [
    <Link to="/">Home</Link>
];

const J40Header = () => {
    const data: any = useStaticQuery(graphql`
      query MyQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
  `)

  const siteTitle: string = data.site.siteMetadata?.title || `Title`
    return (
        <>
        <GovBanner />
        <Header>
            <Title>{siteTitle}</Title>
            <PrimaryNav items={headerLinks}/>
        </Header>
        </>
    );
};

export default J40Header;