import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import Job from '../components/Job';
// import SEO from '../components/seo';

const query = graphql`
  {
    allDatoCmsResumeJob(sort: {order: DESC, fields: from}) {
      nodes {
        id
        title
        from
        to
        company
        description
        seoMetaTags {
          id
        }
      }
    }
  }
`;

const Resume = () => {
  const jobs = useStaticQuery(query);

  return (
    <Layout>
      {/* <SEO title="Page two" /> */}
      <section className="resume">
        <h1>Resume</h1>

        {jobs && jobs.allDatoCmsResumeJob && jobs.allDatoCmsResumeJob.nodes && jobs.allDatoCmsResumeJob.nodes.map((job) => (
          <Job job={job} key={job.id}/>
        ))}
      </section>
    </Layout>
  );
};

export default Resume;
