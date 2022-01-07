/* eslint-disable react/no-danger */
import React from 'react';
import { getSiteData, getAllUses, getAllMenu } from '@/lib/api';
import { useRouter } from 'next/router';

export default function Uses({ page }) {
  const router = useRouter();

  return (
    <section key={router.route} className="uses">
      <h1>Uses</h1>
      <p>Here the specifics of some piece of software or hardware I regularly use.</p>
      {page &&
        page.map(use => (
          <article key={use.id} className="uses__use">
            <h2>{use.title}</h2>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="job__description" dangerouslySetInnerHTML={{ __html: use.description }} />
          </article>
        ))}
    </section>
  );
}

export async function getStaticProps({ preview = false }) {
  const page = (await getAllUses(preview)) || null;
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
