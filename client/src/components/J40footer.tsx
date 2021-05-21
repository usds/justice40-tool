import React from 'react';
import { Footer } from '@trussworks/react-uswds';
import {Link} from 'gatsby';

const footerLinks = [
    <Link to="/">Home</Link>
];

const J40Footer = () => {
    return (
        <>
        <Footer primary={[]} secondary={footerLinks} />
        </>
    );
};

export default J40Footer;