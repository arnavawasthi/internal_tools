import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getReport from "app/reports/queries/getReport"
import updateReport from "app/reports/mutations/updateReport"
import ReportForm from "app/reports/components/ReportForm"

export const EditReport = () => {
  const router = useRouter()
  const reportId = useParam("reportId", "number")
  const [report, { mutate }] = useQuery(getReport, { where: { id: reportId } })

  return (
    <div>
      <h1>Edit Report {report.id}</h1>
      <pre>{JSON.stringify(report)}</pre>

      <ReportForm
        initialValues={report}
        onSubmit={async () => {
          try {
            const updated = await updateReport({
              where: { id: report.id },
              data: { name: "MyNewName" },
            })
            mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/reports/[reportId]", `/reports/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating report " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditReportPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Report</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditReport />
        </Suspense>

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

export default EditReportPage
