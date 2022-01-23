import { graphql, useStaticQuery } from 'gatsby';

export interface SiteMetadata {
  title: string;
  description: string;
  author: {
    name: string;
    content: string;
  };
  social: {
    github: string;
  };
}

type QueryType = {
  site: {
    siteMetadata: SiteMetadata;
  };
};

const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery<QueryType>(graphql`
    {
      site {
        buildTime
        siteMetadata {
          title
        }
      }
    }
  `);

  return data.site.siteMetadata;
};

export default useSiteMetadata;
