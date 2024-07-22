import type { DefaultSeoProps } from "next-seo";

const APP_URL = "TODO";
const FULL_APP_URL = `https://${APP_URL}/`;

const defaultSEO: DefaultSeoProps = {
  titleTemplate: `%s | ${APP_URL}`,
  defaultTitle: "ReadmeQuik",
  description: "",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: FULL_APP_URL,
    title: "Readme Quik",
    description: ``,
    site_name: "ReadmeQuik",
  },
};

export default defaultSEO;
