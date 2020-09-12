import db, { SectionCreateArgs } from "db"

type CreateSectionInput = {
  data: SectionCreateArgs["data"]
}
export default async function createSection(
  { data }: CreateSectionInput,
  ctx: Record<any, any> = {}
) {
  const section = await db.section.create({ data })

  return section
}
