import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getDataSource from "app/dataSources/queries/getDataSource"
import deleteDataSource from "app/dataSources/mutations/deleteDataSource"

export const DataSource = () => {
  const router = useRouter()
  const dataSourceId = useParam("dataSourceId", "number")
  const [dataSource] = useQuery(getDataSource, { where: { id: dataSourceId } })

  return (
    <div>
      <h1>DataSource {dataSource.id}</h1>
      <pre>{JSON.stringify(dataSource, null, 2)}</pre>

      {
        <Link href="/dataSources/[dataSourceId]/edit" as={`/dataSources/${dataSource.id}/edit`}>
          <a>Edit</a>
        </Link>
      }

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteDataSource({ where: { id: dataSource.id } })
            router.push("/dataSources")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowDataSourcePage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>DataSource</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>
          {
            <Link href="/dataSources">
              <a>DataSources</a>
            </Link>
          }
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <DataSource />
        </Suspense>
      </main>
    </div>
  )
}

export default ShowDataSourcePage
