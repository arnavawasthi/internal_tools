import db, { ReportCreateArgs } from "db"

type CreateReportInput = {
  data: ReportCreateArgs["data"]
}
export default async function createReport(
  { data }: CreateReportInput,
  ctx: Record<any, any> = {}
) {
  const report = await db.report.create({ data })

  return report
}
