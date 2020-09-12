import { createConnection, getConnection, Connection } from "typeorm"

type GenericSectionResultInput = {
  query: string
  datasource: string
  params: {}
  field: string | undefined
}

export default async function getGenericSectionResult({
  query,
  datasource,
  params,
  field,
}: GenericSectionResultInput) {
  let connection: Connection

  /*
  TODO: Ideally I shouldn't have defined "default2". But for some reason typeorm (or my settings causes) error out 
  for migration script saying "import is not allowed outside of module". For now this is the work-around I have. 
  */
  try {
    connection = getConnection("default2")
  } catch (error) {
    connection = await createConnection("default2")
  }

  /**
   *
   *
   */
  let envSql = ""
  if (params["env"]) {
    envSql = ` and env = '${params["env"]}'`
  }
  const dbSettings = (await connection.manager.query(
    `select * from DataSource where sourceType = 'db' ${envSql}`
  )) as Array<any>
  for (var dbSetting of dbSettings) {
    global[dbSetting["sourceKey"]] =
      global[dbSetting["sourceKey"]] ||
      (await createConnection(JSON.parse(dbSetting["params"]))).manager
  }

  let manager = global[datasource]
  console.log(query, params)
  for (var key in params) {
    if (!key) continue
    query = query.replace("$" + key, params[key])
  }
  try {
    const rawData = (await manager.query(query)) as Array<any>
    // console.log(rawData)
    if (field) {
      return rawData.map((row) => row[field])
    }
    return rawData
  } catch (error) {
    console.log("error", error)
    return [error]
  }
}
