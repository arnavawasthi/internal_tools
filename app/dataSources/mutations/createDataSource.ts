import db, { DataSourceCreateArgs } from "db"

type CreateDataSourceInput = {
  data: DataSourceCreateArgs["data"]
}
export default async function createDataSource(
  { data }: CreateDataSourceInput,
  ctx: Record<any, any> = {}
) {
  const dataSource = await db.dataSource.create({ data })

  return dataSource
}
