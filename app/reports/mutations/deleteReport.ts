import db, { ReportDeleteArgs } from "db"

type DeleteReportInput = {
  where: ReportDeleteArgs["where"]
}

export default async function deleteReport(
  { where }: DeleteReportInput,
  ctx: Record<any, any> = {}
) {
  const report = await db.report.delete({ where })

  return report
}
