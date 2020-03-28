import { addParameters, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

// a11y init
addDecorator(withA11y);
//
// const cssReq = require.context('!!raw-loader!../src', true, /.\.css$/);
// const cssTokenFiles = cssReq
//   .keys()
//   .map(filename => ({ filename, content: cssReq(filename).default }));
//
// const scssReq = require.context('!!raw-loader!../src', true, /.\.scss$/);
// const scssTokenFiles = scssReq
//   .keys()
//   .map(filename => ({ filename, content: scssReq(filename).default }));
//
// // const svgIconsReq = require.context('!!raw-loader!../src', true, /.\.svg$/);
// // const svgIconTokenFiles = svgIconsReq
// //   .keys()
// //   .map(filename => ({ filename, content: svgIconsReq(filename).default }));
//
// addParameters({
//   designToken: {
//     files: {
//       css: cssTokenFiles,
//       scss: scssTokenFiles
//       // svgIcons: svgIconTokenFiles
//     }
//   }
// });
