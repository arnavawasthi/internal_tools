import React from "react"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createDataSource from "app/dataSources/mutations/createDataSource"
import DataSourceForm from "app/dataSources/components/DataSourceForm"

const NewDataSourcePage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New DataSource</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create New DataSource </h1>

        <DataSourceForm
          initialValues={{}}
          onSubmit={async (values) => {
            try {
              const dataSource = await createDataSource({ data: values })
              alert("Success!" + JSON.stringify(dataSource))
              router.push("/dataSources/[dataSourceId]", `/dataSources/${dataSource.id}`)
            } catch (error) {
              alert("Error creating dataSource " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          {
            <Link href="/dataSources">
              <a>DataSources</a>
            </Link>
          }
        </p>
      </main>
    </div>
  )
}

export default NewDataSourcePage
