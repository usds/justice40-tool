
/* this is a hack to fix `gatsby-plugin-sass` from including the
  css in every single file (which is > 120k lines).
  see: https://github.com/gatsbyjs/gatsby/issues/1526
  `ssr` means server-side rendering.
  */
export const onPreRenderHTML = ({getHeadComponents}) => {
  if (process.env.NODE_ENV !== 'production') { // ONLY run in production
    return;
  }

  getHeadComponents().forEach((el) => {
    // Remove inline css. https://github.com/gatsbyjs/gatsby/issues/1526
    if (el.type === 'style' && el.props['data-href']) {
      el.type = 'link';
      el.props['href'] = el.props['data-href'];
      el.props['rel'] = 'stylesheet';
      el.props['type'] = 'text/css';

      delete el.props['data-href'];
      delete el.props['dangerouslySetInnerHTML'];
      delete el.props['children'];
    }
  });
};
