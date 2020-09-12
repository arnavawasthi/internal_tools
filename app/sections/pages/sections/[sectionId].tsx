import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getSection from "app/sections/queries/getSection"
import deleteSection from "app/sections/mutations/deleteSection"

export const Section = () => {
  const router = useRouter()
  const sectionId = useParam("sectionId", "number")
  const [section] = useQuery(getSection, { where: { id: sectionId } })

  return (
    <div>
      <h1>Section {section.id}</h1>
      <pre>{JSON.stringify(section, null, 2)}</pre>

      {
        <Link href="/sections/[sectionId]/edit" as={`/sections/${section.id}/edit`}>
          <a>Edit</a>
        </Link>
      }

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteSection({ where: { id: section.id } })
            router.push("/sections")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowSectionPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Section</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>
          {
            <Link href="/sections">
              <a>Sections</a>
            </Link>
          }
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Section />
        </Suspense>
      </main>
    </div>
  )
}

export default ShowSectionPage
