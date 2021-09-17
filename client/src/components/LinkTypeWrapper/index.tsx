import React from 'react';
import {Link} from 'gatsby-plugin-intl';

interface ILinkTypeWrapper {
    linkText?: string;
    internal?: boolean;
    url?: string;
    openUrlNewTab?: boolean;
    className?: string;
  }

// eslint-disable-next-line valid-jsdoc
/**
 * This function wraps the two types of links we have. Internal links and
 * external links. Internal links should use the <Link> component, while
 * eternal links can use the standard <a> tag. This function allows the
 * instance to choose the type of link along with the props necessary to
 * set new tabs, classes.
 *
 * @param props
 * @returns
 */
const LinkTypeWrapper = (props:ILinkTypeWrapper) => {
  if (props.internal) {
    return (
      <Link to={`${props.url}`}>
        {props.linkText}
      </Link>
    );
  } else {
    return props.openUrlNewTab ?
    <a
      className={props.className}
      href={props.url}
      target="_blank"
      rel="noreferrer">{props.linkText}
    </a> :
    <a
      className={props.className}
      href={props.url}>{props.linkText}
    </a>;
  }
};

export default LinkTypeWrapper;
