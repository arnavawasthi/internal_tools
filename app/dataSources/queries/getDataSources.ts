import db, { FindManyDataSourceArgs } from "db"

type GetDataSourcesInput = {
  where?: FindManyDataSourceArgs["where"]
  orderBy?: FindManyDataSourceArgs["orderBy"]
  cursor?: FindManyDataSourceArgs["cursor"]
  take?: FindManyDataSourceArgs["take"]
  skip?: FindManyDataSourceArgs["skip"]
  // Only available if a model relationship exists
  // include?: FindManyDataSourceArgs['include']
}

export default async function getDataSources(
  { where, orderBy, cursor, take, skip }: GetDataSourcesInput,
  ctx: Record<any, any> = {}
) {
  const dataSources = await db.dataSource.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
  })

  return dataSources
}
