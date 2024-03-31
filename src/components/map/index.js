import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Map from './MapDisplay';

export default () => {
  const {
    map: {
      frontmatter: {
        content
      }
    }
  } = useStaticQuery(graphql`query MapQuery {
  map: markdownRemark(frontmatter: {contentType: {eq: "homepageMapSettings"}}) {
    frontmatter {
      content {
        language
        isEnabled
        link
        linkTitle
        image {
          relativePath
          childImageSharp {
            gatsbyImageData(breakpoints: [768], layout: FULL_WIDTH)
          }
        }
        imageAlt
      }
    }
  }
}`);
  const language = useContext(LanguageContext);
  const defaultContent = content[0];
  const mapProps = content.find(c => c.language === language) || defaultContent;
  const { isEnabled } = mapProps;
  if (!isEnabled) {
    return false;
  }
  return (<Map {...mapProps} />);
};
