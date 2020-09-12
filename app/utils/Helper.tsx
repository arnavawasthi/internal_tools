export function mapToQueryString(obj) {
  let queryStr = ""
  for (var key in obj) {
    queryStr = queryStr.concat(key, "=", obj[key], "&")
  }
  return queryStr
}
