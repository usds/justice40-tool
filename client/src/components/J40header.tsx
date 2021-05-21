import React from 'react';
import { GovBanner, Header, Title, PrimaryNav } from '@trussworks/react-uswds';
import { Link } from "gatsby";

const headerLinks = [
    <Link to="/">Home</Link>
];

const J40Header = () => {
    return (
        <>
        <GovBanner />
        <Header>
            <Title>Justice 40</Title>
            <PrimaryNav items={headerLinks}/>
        </Header>
        </>
    );
};

export default J40Header;