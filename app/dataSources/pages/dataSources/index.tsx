import React, { Suspense } from "react"
import { Head, Link, useQuery, BlitzPage } from "blitz"
import getDataSources from "app/dataSources/queries/getDataSources"

export const DataSourcesList = () => {
  const [dataSources] = useQuery(getDataSources, { orderBy: { id: "desc" } })

  return (
    <ul>
      {dataSources.map((dataSource) => (
        <li key={dataSource.id}>
          <Link href="/dataSources/[dataSourceId]" as={`/dataSources/${dataSource.id}`}>
            <a>{dataSource.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const DataSourcesPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>DataSources</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>DataSources</h1>

        <p>
          {
            <Link href="/dataSources/new">
              <a>Create DataSource</a>
            </Link>
          }
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <DataSourcesList />
        </Suspense>
      </main>
    </div>
  )
}

export default DataSourcesPage
