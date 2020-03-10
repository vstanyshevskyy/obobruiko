import React from 'react';
import './index.less';
import Layout from '../layouts';
import SEO from '../components/SEO';
import Hero from '../components/hero';
import Quote from '../components/quote';
import AboutMe from '../components/about-me';
import HowTo from '../components/how-to';
import Services from '../components/services-list';
import Articles from '../components/articles-list';
import FAQ from '../components/faq';

export default function Template () {
  return (
    <Layout>
      <div id="content">
        <SEO />
        <Hero />
        <Quote />
        <AboutMe />
        <HowTo />
        <Services />
        <FAQ />
        <Articles />
      </div>
    </Layout>
  );
}
