import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
// import SEO from '../components/seo';

const query = graphql`
  {
    allDatoCmsUse {
      nodes {
        id
        title
        descriptionNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`;

const Uses = () => {
  const uses = useStaticQuery(query);

  return (
    <Layout>
      {/* <SEO title="Page two" /> */}
      <section className="uses">
        <h1>Uses</h1>
        <p>Here the specifics of some piece of software or hardware I regularly use.</p>
        {uses && uses.allDatoCmsUse && uses.allDatoCmsUse.nodes && uses.allDatoCmsUse.nodes.map((use) => (
          <article key={use.id} className="uses__use">
            <h2>{use.title}</h2>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="job__description" dangerouslySetInnerHTML={{ __html: use.descriptionNode.childMarkdownRemark.html }}/>
          </article>
        ))}
      </section>
    </Layout>
  );
};

export default Uses;
