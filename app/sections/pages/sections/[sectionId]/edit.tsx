import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useRouterQuery } from "blitz"
import getSection from "app/sections/queries/getSection"
import updateSection from "app/sections/mutations/updateSection"
import SectionForm from "app/sections/components/SectionForm"
import { mapToQueryString } from "app/utils/Helper"

export const EditSection = () => {
  const router = useRouter()
  const routerQuery = useRouterQuery()
  // const database = routerQuery["database"] as string
  const sectionId = useParam("sectionId", "number")
  const [section, { mutate }] = useQuery(getSection, { where: { id: sectionId } })

  return (
    <div>
      <h1>Edit Section {section.description}</h1>
      {/* <pre>{JSON.stringify(section)}</pre> */}

      <SectionForm
        initialValues={section}
        params={routerQuery}
        onSubmit={async (values) => {
          try {
            const updated = await updateSection({
              where: { id: section.id },
              data: {
                description: values["description"],
                query: values["query"],
              },
            })
            mutate(updated)
            // alert("Success!" + JSON.stringify(updated))
            router.push(
              "/reports/[reportId]",
              `/reports/${values["reportId"]}?${mapToQueryString(routerQuery)}`
            )
          } catch (error) {
            console.log(error)
            alert("Error creating section " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditSectionPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Section</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditSection />
        </Suspense>
      </main>
    </div>
  )
}

export default EditSectionPage
