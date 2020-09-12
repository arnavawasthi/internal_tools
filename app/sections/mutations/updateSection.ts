import db, { SectionUpdateArgs } from "db"

type UpdateSectionInput = {
  where: SectionUpdateArgs["where"]
  data: SectionUpdateArgs["data"]
}

export default async function updateSection(
  { where, data }: UpdateSectionInput,
  ctx: Record<any, any> = {}
) {
  const section = await db.section.update({ where, data })

  return section
}
