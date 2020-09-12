import React from "react"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createReport from "app/reports/mutations/createReport"
import ReportForm from "app/reports/components/ReportForm"

const NewReportPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Report</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create New Report </h1>

        <ReportForm
          initialValues={{}}
          onSubmit={async () => {
            try {
              const report = await createReport({ data: { name: "MyName" } })
              alert("Success!" + JSON.stringify(report))
              router.push("/reports/[reportId]", `/reports/${report.id}`)
            } catch (error) {
              alert("Error creating report " + JSON.stringify(error, null, 2))
            }
          }}
        />

        <p>
          {
            <Link href="/reports">
              <a>Reports</a>
            </Link>
          }
        </p>
      </main>
    </div>
  )
}

export default NewReportPage
