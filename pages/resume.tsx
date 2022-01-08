/* eslint-disable indent */
import React from 'react';
import Job from '@/components/Job';
import { useRouter } from 'next/router';
import { QueryListenerOptions, useQuerySubscription } from 'react-datocms';
import { GetStaticProps } from 'next';
import { request, RequestType } from '@/lib/datocms';
import { resumeQuery } from '@/queries/resume.query';
import { ResumeJob } from '@/types/index';

export type ResumeProps = {
  subscription: QueryListenerOptions<any, any>;
};

export type ResumeData = {
  allResumeJobs: Array<ResumeJob>;
};

export default function Resume({ subscription }: ResumeProps) {
  const router = useRouter();
  // implement client-side updates of the page as soon as the content changes
  // see: https://github.com/datocms/react-datocms/#live-real-time-updates
  const { data } = useQuerySubscription(subscription);
  const { allResumeJobs }: ResumeData = data;

  return (
    <section key={router.route} className="resume">
      <h1>Resume</h1>

      {allResumeJobs && allResumeJobs.map(job => <Job job={job} key={job.id} />)}
    </section>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const graphqlRequest: RequestType = {
    query: resumeQuery,
    preview
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.DATOCMS_API_TOKEN
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest)
          }
    }
  };
};
