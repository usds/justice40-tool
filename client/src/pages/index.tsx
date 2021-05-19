import * as React from "react"
import Layout from '../components/layout';
import { useIntl, FormattedMessage } from "gatsby-plugin-intl"
// markup
const IndexPage = () => {
  const intl = useIntl()
  return (
    <Layout>
      <main>
        <title>Justice40</title>
        <h1>
          <FormattedMessage
            defaultMessage="Justice40"
            description="Title of the project"
          />
        </h1>
      </main>
    </Layout>
  )
}

export default IndexPage
