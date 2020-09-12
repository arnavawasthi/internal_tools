import db, { FindManySectionArgs } from "db"

type GetSectionsInput = {
  where?: FindManySectionArgs["where"]
  orderBy?: FindManySectionArgs["orderBy"]
  cursor?: FindManySectionArgs["cursor"]
  take?: FindManySectionArgs["take"]
  skip?: FindManySectionArgs["skip"]
  // Only available if a model relationship exists
  // include?: FindManySectionArgs['include']
}

export default async function getSections(
  { where, orderBy, cursor, take, skip }: GetSectionsInput,
  ctx: Record<any, any> = {}
) {
  const sections = await db.section.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
  })

  return sections
}
