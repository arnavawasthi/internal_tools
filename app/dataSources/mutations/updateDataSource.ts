import db, { DataSourceUpdateArgs } from "db"

type UpdateDataSourceInput = {
  where: DataSourceUpdateArgs["where"]
  data: DataSourceUpdateArgs["data"]
}

export default async function updateDataSource(
  { where, data }: UpdateDataSourceInput,
  ctx: Record<any, any> = {}
) {
  const dataSource = await db.dataSource.update({ where, data })

  return dataSource
}
