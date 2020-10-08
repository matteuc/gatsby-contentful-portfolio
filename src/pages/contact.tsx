import * as React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import { Box, Grid, ButtonBase, makeStyles } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import Layout from '../components/layout'
import { ContactIndexQueryQuery } from '../../types/graphql-types' // eslint-disable-line import/no-unresolved
import Statement from '../components/statement'
import RawHtml from '../components/rawHtml'

const useStyles = makeStyles((theme) => ({
  textSection: {
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  lnBtn: {
    fontSize: '1.5rem',
    margin: 'auto',
    '&:hover': {
      color: theme.palette.grey[500],
    },
  },
  actionContainer: {
    display: 'flex',
  },
}))

const ContactIndex: React.FC = (props) => {
  const siteTitle: ContactIndexQueryQuery['contentfulSiteMetadata'] = get(
    props,
    'data.contentfulSiteMetadata.headerPageTitle'
  )
  const layout: ContactIndexQueryQuery['contentfulContactLayout'] = get(
    props,
    'data.contentfulContactLayout'
  )

  const classes = useStyles()

  return (
    <Layout>
      <Helmet
        title={`Contact — ${
          typeof siteTitle === 'string' ? siteTitle : 'My Portfolio'
        }`}
      />
      <Statement text={layout?.statement} />
      <div className="wrapper">
        <Box pt={6} pb={6}>
          <Grid container justify="center">
            <Grid item xs={12} className={classes.textSection}>
              <RawHtml
                html={layout?.description?.childMarkdownRemark?.html || ''}
              />
            </Grid>
            <Grid item xs={12} className={classes.actionContainer}>
              <ButtonBase
                className={classes.lnBtn}
                onClick={() =>
                  window.open(layout?.linkedInUrl || '#', '_blank')
                }
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </ButtonBase>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Layout>
  )
}

export default ContactIndex

export const pageQuery = graphql`
  query ContactIndexQuery {
    contentfulSiteMetadata(platform: { eq: "main" }) {
      headerPageTitle
    }
    contentfulContactLayout(platform: { eq: "main" }) {
      statement
      linkedInUrl
      description {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
