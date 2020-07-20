const path = require('path');
const fetch = require('node-fetch');
// const { getAllPostsWithSlug } = require('./lib/api');
const sitemap = require('nextjs-sitemap-generator');

const API_URL = 'https://graphql.datocms.com';
const API_TOKEN = process.env.DATOCMS_API_TOKEN;

// sitemap({
//   baseUrl: 'https://www.marcellop.com',
//   pagesDirectory: `${__dirname }/pages`,
//   targetDirectory: 'static/'
// });

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

async function getAllPostsWithSlug() {
  const data = fetchAPI(`
    {
      allPosts {
        slug
      }
    }
  `);
  return data?.allPosts;
}

module.exports = {
  // target: 'serverless',
  exportTrailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
  // async exportPathMap(
  //   defaultPathMap,
  //   {
  //     dev, dir, outDir, distDir, buildId
  //   }
  // ) {
  //   const paths = {
  //     '/': { page: '/' },
  //     '/resume': { page: '/resume' },
  //     '/uses': { page: '/uses' },
  //     '/writings': { page: '/writings' }
  //     // '/writings/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
  //   };
  //
  //   const allPosts = await getAllPostsWithSlug();
  //   console.log('*** DEBUG ***', allPosts);
  //   // eslint-disable-next-line no-return-assign
  //   allPosts?.map((post) => paths[`/writings/${post.slug}`] = { page: `/writings/${post.slug}`, query: { slug: post.slug } });
  //
  //   console.log('*** DEBUG ***', paths);
  //
  //   return paths;
  // }
};
