import * as React from 'react'
import { graphql, PageProps } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { Grid, Box } from '@material-ui/core'
import Layout from '../components/layout'
import ProjectPreview from '../components/project-preview'
import { HomeQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved
import Statement from '../components/statement'
import { LocationContext } from '../context/location'

const RootIndex: React.FC<PageProps> = ({ data, location }) => {
  const siteTitle: HomeQueryQuery['contentfulSiteMetadata'] = get(
    data,
    'contentfulSiteMetadata.headerPageTitle'
  )

  const layout: HomeQueryQuery['contentfulLandingLayout'] = get(
    data,
    'contentfulLandingLayout'
  )

  const projects = layout?.projects

  return (
    <LocationContext.Provider value={{ path: location.pathname }}>
      <Layout>
        <Helmet
          title={typeof siteTitle === 'string' ? siteTitle : 'My Portfolio'}
        />
        <Statement text={layout?.statement} />
        <Box mt={2}>
          <Grid container>
            {projects?.map((project) => {
              return (
                <Grid item xs={12} sm={6} key={project.slug}>
                  <ProjectPreview project={project} />
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Layout>
    </LocationContext.Provider>
  )
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    contentfulSiteMetadata(platform: { eq: "main" }) {
      headerPageTitle
    }
    contentfulLandingLayout(platform: { eq: "main" }) {
      statement
      projects {
        ... on ContentfulProject {
          title
          slug
          preview {
            fluid(maxWidth: 350, maxHeight: 350, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
