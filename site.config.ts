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
      title: "About CatNose",
      href: "/about",
    },
    {
      title: "GitHub",
      href: "https://github.com/catnose99",
    },
  ],
};
