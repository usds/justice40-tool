import React from 'react';
import {SideNav} from '@trussworks/react-uswds';

import LinkTypeWrapper from '../LinkTypeWrapper';


const SubPageNav = () => {
  const subPages = [
    <LinkTypeWrapper key={1} url={'/methodology'} internal={true} linkText={'Methodology & Data'} />,
    <LinkTypeWrapper key={2} url={'/downloads'} internal={true} linkText={'Downloads'} />,
  ];

  return (
    <SideNav items={subPages} />
  );
};

export default SubPageNav;
