import { NotFoundError } from "blitz"
import db, { FindOneSectionArgs } from "db"

type GetSectionInput = {
  where: FindOneSectionArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneSectionArgs['include']
}

export default async function getSection(
  { where /* include */ }: GetSectionInput,
  ctx: Record<any, any> = {}
) {
  const section = await db.section.findOne({ where })

  if (!section) throw new NotFoundError()

  return section
}
