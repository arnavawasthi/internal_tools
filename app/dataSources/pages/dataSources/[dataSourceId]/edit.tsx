import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getDataSource from "app/dataSources/queries/getDataSource"
import updateDataSource from "app/dataSources/mutations/updateDataSource"
import DataSourceForm from "app/dataSources/components/DataSourceForm"

export const EditDataSource = () => {
  const router = useRouter()
  const dataSourceId = useParam("dataSourceId", "number")
  const [dataSource, { mutate }] = useQuery(getDataSource, { where: { id: dataSourceId } })

  return (
    <div>
      <h1>Edit DataSource {dataSource.id}</h1>
      <pre>{JSON.stringify(dataSource)}</pre>

      <DataSourceForm
        initialValues={dataSource}
        onSubmit={async (values) => {
          delete values["id"]
          try {
            const updated = await updateDataSource({
              where: { id: dataSource.id },
              data: values,
            })
            mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/dataSources/[dataSourceId]", `/dataSources/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating dataSource " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditDataSourcePage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit DataSource</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditDataSource />
        </Suspense>

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

export default EditDataSourcePage
