import React, { useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import About from '../components/About';
import What from '../components/What';

const indexQuery = graphql`
  {
    datoCmsHome {
      hi
      heading1
      heading2A
      heading2B
      heading2C
      aboutHeading
      aboutDescription1
      aboutDescription2
      aboutPicture {
        alt
        url
        fluid(maxWidth: 630, sizes: "(min-width: 17em) 50vw, 100vw", imgixParams: {fm: "jpg", auto: "compress"}) {
          ...GatsbyDatoCmsSizes
        }
      }
      aboutDescription3
      aboutDescription4
      whatidoHeading
      whatido {
        title
        description
      }
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;


// eslint-disable-next-line react/prop-types
const IndexPage = ({ path }) => {
  const data = useStaticQuery(indexQuery);
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (isClient) {
      // eslint-disable-next-line no-undef
      document.querySelector('body').classList.add('loaded');
    }
  });

  const heroData = {
    hi: data.datoCmsHome.hi,
    heading1: data.datoCmsHome.heading1,
    heading2A: data.datoCmsHome.heading2A,
    heading2B: data.datoCmsHome.heading2B,
    heading2C: data.datoCmsHome.heading2C
  };

  const aboutData = {
    aboutHeading: data.datoCmsHome.aboutHeading,
    aboutDescription1: data.datoCmsHome.aboutDescription1,
    aboutDescription2: data.datoCmsHome.aboutDescription2,
    aboutDescription3: data.datoCmsHome.aboutDescription3,
    aboutDescription4: data.datoCmsHome.aboutDescription4,
    aboutPicture: data.datoCmsHome.aboutPicture
  };

  const whatido = {
    heading: data.datoCmsHome.whatidoHeading,
    items: data.datoCmsHome.whatido
  };

  return (
    <Layout path={path}>
      <Seo meta={data.datoCmsHome.seoMetaTags}/>
      <Hero hero={heroData}/>
      <About about={aboutData}/>
      <What whatido={whatido}/>
    </Layout>
  );
};

export default IndexPage;
