import React, { Suspense } from "react"
import { Head, Link, useQuery, BlitzPage } from "blitz"
import getReports from "app/reports/queries/getReports"

export const ReportsList = () => {
  const [reports] = useQuery(getReports, { orderBy: { id: "desc" } })

  return (
    <ul>
      {reports.map((report) => (
        <li key={report.id}>
          <Link href="/reports/[reportId]" as={`/reports/${report.id}`}>
            <a>{report.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const ReportsPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Reports</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Reports</h1>

        <p>
          {
            <Link href="/reports/new">
              <a>Create Report</a>
            </Link>
          }
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ReportsList />
        </Suspense>
      </main>
    </div>
  )
}

export default ReportsPage
