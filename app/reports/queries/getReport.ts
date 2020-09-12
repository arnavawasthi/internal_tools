import { NotFoundError } from "blitz"
import db, { FindOneReportArgs } from "db"

type GetReportInput = {
  where: FindOneReportArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneReportArgs['include']
}

export default async function getReport(
  { where /* include */ }: GetReportInput,
  ctx: Record<any, any> = {}
) {
  const report = await db.report.findOne({ where })

  if (!report) throw new NotFoundError()

  return report
}
