import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

type MetaProperty = {
  property: string;
  content: string;
};

type MetaName = {
  name: string;
  content: string;
};

type Meta = MetaName | MetaProperty;

export interface SEOProps {
  title: string;
  description?: string;
  lang?: string;
  meta?: Meta[];
}

type QueryType = {
  site: {
    buildTime: unknown;
    siteMetadata: {
      title: string;
      author: { name: string };
      description: string;
    };
  };
};
const SEO: FC<SEOProps> = (props) => {
  const { site } = useStaticQuery<QueryType>(
    graphql`
      query {
        site {
          buildTime
          siteMetadata {
            title
            author
          }
        }
      }
    `,
  );

  const metaDescription = props.description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang: props.lang || 'en',
      }}
      title={props.title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: props.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author.name,
        },
        {
          name: `twitter:title`,
          content: props.title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(props.meta || [])}
    />
  );
};

export default SEO;
