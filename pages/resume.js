import React from 'react';
import { motion } from 'framer-motion';
import { getSiteData, getAllResumeJobs, getAllMenu } from '@/lib/api';
import Job from '@/components/Job';
import { motionVariants } from '@/lib/helpers';
import { useRouter } from 'next/router';

export default function Resume({ site, page, menu }) {
  const router = useRouter();
  return (
    <motion.section
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      variants={motionVariants}
      className="resume"
    >
      <h1>Resume</h1>

      {page && page.map(job => <Job job={job} key={job.id} />)}
    </motion.section>
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
