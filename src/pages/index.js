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
import ContactFrom from '../components/contact-form';
import Map from '../components/map';
import Subscribe from '../components/subscribe';

export default function Template (props) {
  const { pageContext: { language } } = props;
  return (
    <Layout isImageFullscreen language={language}>
      <div id="content">
        <SEO />
        <Hero />
        <Quote />
        <AboutMe />
        <HowTo />
        <Services />
        <ContactFrom />
        <FAQ />
        <Articles />
        <Subscribe />
        <Map />
      </div>
    </Layout>
  );
}
