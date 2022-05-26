console.log(process.env.VP_BASE||'env get undefined');
module.exports = {
  theme: "",
  title: "VuePress1.x",
  description: "A lightweight creator for VuePress project.",
  base: process.env.VP_BASE || "/vuepress1/",
  head: [
    ["link", { rel: "icon", href: "/assets/logo.png" }]
  ],
  markdown: {
    lineNumbers: true,
    plugins: ['task-lists']
  },
  themeConfig: {
    smoothScroll: true,
    nav: [
      // Nav 1
      {
        text: "Home",
        link: "/"
      },
      // Nav 2
      {
        text: "Category",
        link: "/category/"
      },
    ],
    sidebar: require("../sidebar"),
    lastUpdated: "Last Updated",
    repo: "https://github.com/steven7sheng/vuepress1",
    editLinks: false,
  },
  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ['@vuepress/plugin-back-to-top', '@vuepress/plugin-medium-zoom', 'one-click-copy']
};