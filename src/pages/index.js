import React from 'react'
import './index.less'
import Layout from '../layouts'
import SEO from '../components/SEO'
import Hero from '../components/hero'
import Quote from '../components/quote'
import AboutMe from '../components/about-me'
import HowTo from '../components/how-to'
import Services from '../components/services-list'
import Articles from '../components/articles-list'
import FAQ from '../components/faq'
import Map from '../components/map'
import Reviews from '../components/reviews'
import ContactForm from '../components/contact-form'

export const Head = (props) => {
  const language = props.pageContext?.language || 'UK'
  return <SEO language={language} pageType="home" />
}

export default function Template(props) {
  const {
    pageContext: { language },
  } = props
  return (
    <Layout isImageFullscreen language={language}>
      <div id="content">
        <Hero />
        <Reviews />
        <Quote />
        <AboutMe />
        <HowTo />
        <Services />
        <FAQ />
        <Articles />
        <Map />
        <ContactForm />
      </div>
    </Layout>
  )
}
