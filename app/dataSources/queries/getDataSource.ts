import { NotFoundError } from "blitz"
import db, { FindOneDataSourceArgs } from "db"

type GetDataSourceInput = {
  where: FindOneDataSourceArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneDataSourceArgs['include']
}

export default async function getDataSource(
  { where /* include */ }: GetDataSourceInput,
  ctx: Record<any, any> = {}
) {
  const dataSource = await db.dataSource.findOne({ where })

  if (!dataSource) throw new NotFoundError()

  return dataSource
}
