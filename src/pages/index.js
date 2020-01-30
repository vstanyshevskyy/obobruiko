import React from 'react';
import { withPrefix } from 'gatsby';
import './index.less';
import Layout from '../layouts';
import SEO from '../components/SEO';
import Hero from '../components/Hero';

export default function Template () {
  return (
    <Layout>
      <div id="content">
        <SEO />
        <Hero />
      </div>
    </Layout>
  );
}
