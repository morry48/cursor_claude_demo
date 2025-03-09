export const config = {
  siteMeta: {
    title: "CatNose Blog",
    teamName: "catnose Inc.",
    description: "CatNoseのブログです。デザインが好きなプログラマー。",
  },
  siteRoot:
    process.env.NODE_ENV === "production"
      ? "https://team-blog-hub.vercel.app"
      : "http://localhost:3000",
  headerLinks: [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Company",
      href: "https://zenn.dev/catnose99/articles/cb72a73368a547756862",
    },
    {
      title: "GitHub",
      href: "https://github.com/catnose99",
    },
  ],
};
