import db, { SectionDeleteArgs } from "db"

type DeleteSectionInput = {
  where: SectionDeleteArgs["where"]
}

export default async function deleteSection(
  { where }: DeleteSectionInput,
  ctx: Record<any, any> = {}
) {
  const section = await db.section.delete({ where })

  return section
}
