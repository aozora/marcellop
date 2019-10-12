import React from 'react';
// import { Link, graphql } from 'gatsby';
// import Img from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';
// import Layout from '../components/layout';
// import Image from '../components/image';
// import SEO from '../components/seo';
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
    }
  }
`;


const IndexPage = () => {
  const data = useStaticQuery(indexQuery);

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
    <Layout>
      <Hero hero={heroData}/>
      <About about={aboutData}/>
      <What whatido={whatido}/>
    </Layout>
  );
};

export default IndexPage;
