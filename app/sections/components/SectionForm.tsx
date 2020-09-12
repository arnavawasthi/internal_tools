import React from "react"
import { TextField, Button, Select, MenuItem } from "@material-ui/core"
import { useRouterQuery, useQuery } from "blitz"
import SectionAdvanced from "./SectionAdvanced"
import getDataSources from "app/dataSources/queries/getDataSources"

type SectionFormProps = {
  initialValues: any
  params: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const SectionForm = ({ initialValues, params, onSubmit }: SectionFormProps) => {
  const queryParams = useRouterQuery()
  // const database = queryParams["datasource"] as string
  const localValues = { description: "", query: "select now()", ...params, ...initialValues }
  const [values, setValues] = React.useState(localValues)
  const [dryRunValues, setDryRunValues] = React.useState(localValues)
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const [dataSources] = useQuery(getDataSources, {})

  return (
    <div>
      <form>
        <div>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.description}
            onChange={handleChange("description")}
          ></TextField>
          <Select
            id="datasource"
            label="Datasource"
            variant="outlined"
            fullWidth
            value={values["datasource"]}
            onChange={handleChange("datasource")}
          >
            {dataSources.map((dataSource) => (
              <MenuItem value={dataSource.sourceKey}>{dataSource.name}</MenuItem>
            ))}
          </Select>
          <TextField
            id="query"
            label="Query"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.query}
            onChange={handleChange("query")}
          ></TextField>
          <TextField
            id="reportId"
            label="Report Id"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.reportId}
            onChange={handleChange("reportId")}
            disabled
          ></TextField>
          <TextField
            id="userId"
            label="User Id"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.userId}
            onChange={handleChange("userId")}
            disabled
          ></TextField>
        </div>
        {/* <div>{JSON.stringify(values)}</div> */}
        <Button variant="contained" color="secondary" onClick={() => setDryRunValues(values)}>
          Dry Run
        </Button>
        <Button variant="contained" color="primary" onClick={() => onSubmit(values)}>
          Submit
        </Button>
      </form>
      <SectionAdvanced
        section={dryRunValues}
        datasource={dryRunValues["datasource"]}
        params={dryRunValues}
        actionButtons={false}
      ></SectionAdvanced>
    </div>
  )
}

export default SectionForm
