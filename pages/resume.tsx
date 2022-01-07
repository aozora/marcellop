import React from 'react';
import { motion } from 'framer-motion';
import { getSiteData, getAllResumeJobs, getAllMenu } from '@/lib/api';
import Job from '@/components/Job';
import { useRouter } from 'next/router';

export default function Resume({ page }) {
  const router = useRouter();
  return (
    <section key={router.route} className="resume">
      <h1>Resume</h1>

      {page && page.map(job => <Job job={job} key={job.id} />)}
    </section>
  );
}

export async function getStaticProps({ preview = false }) {
  const page = (await getAllResumeJobs(preview)) || null;
  const menu = (await getAllMenu(preview)) || null;
  const site = (await getSiteData(preview)) || null;

  return {
    props: {
      site,
      page,
      menu
    }
  };
}
