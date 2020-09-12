import db, { DataSourceDeleteArgs } from "db"

type DeleteDataSourceInput = {
  where: DataSourceDeleteArgs["where"]
}

export default async function deleteDataSource(
  { where }: DeleteDataSourceInput,
  ctx: Record<any, any> = {}
) {
  const dataSource = await db.dataSource.delete({ where })

  return dataSource
}
