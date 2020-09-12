import React, { Suspense } from "react"
import { Head, Link, useRouter, BlitzPage, useRouterQuery } from "blitz"
import createSection from "app/sections/mutations/createSection"
import SectionForm from "app/sections/components/SectionForm"
import { mapToQueryString } from "app/utils/Helper"

export const NewSection = () => {
  const router = useRouter()
  const queryParams = useRouterQuery()
  const reportId = queryParams.reportId as string
  const datasource = queryParams["datasource"] as string
  console.log("reportId", reportId)

  return (
    <div>
      <Head>
        <title>New Section</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create New Section </h1>

        <SectionForm
          initialValues={{ reportId: parseInt(reportId), userId: 1 }}
          params={queryParams}
          onSubmit={async (values) => {
            console.log(values)
            try {
              const section = await createSection({
                data: {
                  description: values["description"],
                  datasource: values["datasource"],
                  query: values["query"],
                  userId: values["userId"],
                  report: { connect: { id: values["reportId"] } },
                },
              })
              // alert("Success!" + JSON.stringify(section))
              router.push(
                "/reports/[reportId]",
                `/reports/${values["reportId"]}?${mapToQueryString(queryParams)}`
              )
            } catch (error) {
              alert("Error creating section " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </main>
    </div>
  )
}

const NewSectionPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>New Section</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <NewSection />
        </Suspense>
      </main>
    </div>
  )
}

export default NewSectionPage
