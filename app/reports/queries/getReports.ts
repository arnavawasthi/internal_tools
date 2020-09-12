import db, { FindManyReportArgs } from "db"

type GetReportsInput = {
  where?: FindManyReportArgs["where"]
  orderBy?: FindManyReportArgs["orderBy"]
  cursor?: FindManyReportArgs["cursor"]
  take?: FindManyReportArgs["take"]
  skip?: FindManyReportArgs["skip"]
  // Only available if a model relationship exists
  // include?: FindManyReportArgs['include']
}

export default async function getReports(
  { where, orderBy, cursor, take, skip }: GetReportsInput,
  ctx: Record<any, any> = {}
) {
  const reports = await db.report.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
  })

  return reports
}
