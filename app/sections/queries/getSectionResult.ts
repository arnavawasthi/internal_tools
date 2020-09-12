import { NotFoundError } from "blitz"
import db from "db"

type SectionResultInput = {
  query: string
  database: string
  date: string
}

export default async function getSectionResult(
  { query, database, date }: SectionResultInput,
  ctx: Record<any, any> = {}
) {
  query = query.replace("$db", database)
  query = query.replace("$date", date)
  console.log(query)
  try {
    const result = await db.$queryRaw(query)

    // if (!result) throw new NotFoundError()

    return result
  } catch (error) {
    console.log("error", error)
    return []
  }
}
