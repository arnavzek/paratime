const withPWA = require("next-pwa")({
  dest: "public",
});

// module.exports = withPWA({
//   reactStrictMode: true,
//   distDir: "build",
//   compiler: {
//     styledComponents: true,
//   },
//   env: {},
//   async rewrites() {
//     return [
//       {
//         source: "/sitemap.xml",
//         destination: "/api/v1/sitemap",
//       },
//       {
//         source: "/sitemap/:type/:offset",
//         destination: "/api/v1/sitemap",
//       },
//     ];
//   },
// });

module.exports = {
  // reactStrictMode: true,
  distDir: "build",
  compiler: {
    styledComponents: true,
  },
  env: {},
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/v1/sitemap",
      },
      {
        source: "/sitemap/:type/:offset",
        destination: "/api/v1/sitemap",
      },
    ];
  },
};

/*

module.exports = {
  distDir: 'build',
}
*/

// function redirects() {
//   return [
//     {
//       source: '/post-window/:authorID/:postID',
//       destination: '/blog/:post',
//       permanent: false
//     }
//   ]
// }
