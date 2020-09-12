import React, { Suspense } from "react"
import { Head, Link, useQuery, BlitzPage } from "blitz"
import getSections from "app/sections/queries/getSections"

export const SectionsList = () => {
  const [sections] = useQuery(getSections, { orderBy: { id: "desc" } })

  return (
    <ul>
      {sections.map((section) => (
        <li key={section.id}>
          <Link href="/sections/[sectionId]" as={`/sections/${section.id}`}>
            <a>{section.description}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const SectionsPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Sections</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Sections</h1>

        <p>
          {
            <Link href="/sections/new">
              <a>Create Section</a>
            </Link>
          }
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SectionsList />
        </Suspense>
      </main>
    </div>
  )
}

export default SectionsPage
