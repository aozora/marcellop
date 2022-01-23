import RSS from 'rss';
import fs from 'fs';
// import { getSiteData, getAllPosts, getAllMenu } from '@/lib/api';
import config from '../package.json';

// eslint-disable-next-line import/prefer-default-export
export const generateRSS = async posts => {
  const feed = new RSS({
    title: config.name,
    description: config.description,
    feed_url: `${config.author.url}/rss.xml`,
    site_url: config.author.url,
    image_url: `${config.author.url}/favicon.png`,
    // managingEditor: config.email,
    // webMaster: config.email,
    copyright: `${new Date().getFullYear()} ${config.author.name}`,
    language: 'en',
    // pubDate: config.siteCreationDate,
    ttl: 60
  });

  let isValid = true;
  // for (const post of posts) {
  // eslint-disable-next-line array-callback-return
  posts.map(post => {
    const html = post.body;

    if (!post.publishedAt) {
      isValid = false;
      // eslint-disable-next-line no-console
      console.warn('All posts must have a publishedDate timestamp when generating RSS feed.');
      // eslint-disable-next-line no-console
      console.warn('Not generating rss.xml.');
    }

    feed.item({
      title: post.title,
      description: html,
      url: `https://vriad.com/writings/${post.slug}`,
      categories: [...post.category] || [],
      author: config.author.name,
      date: new Date(post.publishedAt || 0).toISOString()
    });
  });

  if (!isValid) {
    return;
  }

  // writes RSS.xml to public directory
  const path = `${process.cwd()}/public/rss.xml`;
  fs.writeFileSync(path, feed.xml(), 'utf8');
  // eslint-disable-next-line no-console
  console.log('generated RSS feed');
};
