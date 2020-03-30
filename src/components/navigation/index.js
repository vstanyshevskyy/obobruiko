import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';

import Navbar from './NavigationDisplay';

export default ({ isImageFullscreen }) => (
  <StaticQuery
    query={graphql`
      query NavigationQuery {
        navigation: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "navbar_settings"} }}){
          edges{
            node{
              frontmatter{
                links {
                  text
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={({ navigation: { edges: [{ node: { frontmatter: { links, socialIcons } } }] } }) => (
      <Location>
        {
          ({ location }) => (
            <Navbar
              location={location.pathname}
              links={links}
              socialIcons={socialIcons}
              isImageFullscreen={isImageFullscreen}
            />
          )
        }
      </Location>
    )}
  />
);
