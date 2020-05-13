module.exports = {
  base: '/eom-form-docs/',
  title: 'EOM+ Form',
  lastUpdated: 'Last Updated',
  description: 'A schema-based form generator component for Vue.js',
  themeConfig: {
    editLinks: true,
    docsDir: 'docs',
    repo: 'scramatte/eom-form',
    nav: [
      { text: 'Guide', link: '/guide/' },
    ],
    sidebar: 'auto'
  },
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "/vendor/fonts/fontawesome.css"
      }
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "/vendor/fonts/ionicons.css"
      }
    ]
  ]
}
