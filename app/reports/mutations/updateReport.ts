import db, { ReportUpdateArgs } from "db"

type UpdateReportInput = {
  where: ReportUpdateArgs["where"]
  data: ReportUpdateArgs["data"]
}

export default async function updateReport(
  { where, data }: UpdateReportInput,
  ctx: Record<any, any> = {}
) {
  const report = await db.report.update({ where, data })

  return report
}
