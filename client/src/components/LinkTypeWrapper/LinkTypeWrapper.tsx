import React from 'react';
import {Link} from 'gatsby-plugin-intl';
import {Link as TrussLink} from '@trussworks/react-uswds';

interface ILinkTypeWrapper {
    linkText?: string;
    internal?: boolean;
    url?: string;
    openUrlNewTab?: boolean;
    className?: string;
    dataCy?: string;
  }

// eslint-disable-next-line valid-jsdoc
/**
 * This function wraps the two types of links we have. Internal links and
 * external links. Internal links should use the Gatsby <Link> component.
 * Eternal links that will open in a new tab will use the Trussworks
 * <Link> component and external links that stay on the page will use the
 * standard <a> tag. This function allows the instance to choose the type of link
 * along with the props necessary to set new tabs, classes.
 *
 * Note - if the link is an external link and will not open in a new
 * browser tab, ensure that hitting the back button works. This has shown to
 * have errors on edge cases (ie, launching the gmail client with mailto links)
 * and it is the recommendation to not have external links open in the same tab.
 *
 * @param props
 * @returns
 */
const LinkTypeWrapper = (props:ILinkTypeWrapper) => {
  if (props.internal) {
    return (
      <Link to={`${props.url}`}
        className={props.className}
      >
        {props.linkText}
      </Link>
    );
  } else {
    return props.openUrlNewTab ?
    <TrussLink
      variant={'external'}
      className={props.className}
      href={`${props.url}`}
      target="_blank"
      rel="noreferrer"
      data-cy={props.dataCy ? props.dataCy : ''}
    >
      {props.linkText}
    </TrussLink> :
    <a
      className={props.className}
      href={props.url}
      data-cy={props.dataCy? props.dataCy : ''}
    >
      {props.linkText}
    </a>;
  }
};

export default LinkTypeWrapper;
