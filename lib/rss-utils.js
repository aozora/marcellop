import RSS from 'rss';
import fs from 'fs';
import {
  getSiteData, getAllPosts, getAllMenu
} from '@/lib/api';
import config from '../package.json';

export const generateRSS = async (posts) => {
  const feed = new RSS({
    title: config.name,
    description: config.description,
    feed_url: `${config.url}/rss.xml`,
    site_url: config.url,
    image_url: `${config.url}/favicon/icon.png`,
    managingEditor: config.email,
    webMaster: config.email,
    copyright: `${new Date().getFullYear()} ${config.yourName}`,
    language: 'en',
    pubDate: config.siteCreationDate,
    ttl: 60
  });

  let isValid = true;
  // for (const post of posts) {
  posts.map((post) => {
    const converter = new showdown.Converter();
    const html = converter.makeHtml(post.content);

    if (!post.datePublished) {
      isValid = false;
      console.warn('All posts must have a publishedDate timestamp when generating RSS feed.');
      console.warn('Not generating rss.xml.');
    }

    feed.item({
      title: post.title,
      description: html,
      url: `https://vriad.com/${post.path}`,
      categories: post.tags || [],
      author: post.author || 'Colin McDonnell',
      date: new Date(post.datePublished || 0).toISOString()
    });
  });

  if (!isValid) {
    return;
  }

  // writes RSS.xml to public directory
  const path = `${process.cwd()}/public/rss.xml`;
  fs.writeFileSync(path, feed.xml(), 'utf8');
  console.log('generated RSS feed');
};
