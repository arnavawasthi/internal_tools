import React from "react"
import { useQuery } from "blitz"
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core"
import getDataSources from "app/dataSources/queries/getDataSources"

type ReportFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const ReportForm = ({ initialValues, onSubmit }: ReportFormProps) => {
  const [values, setValues] = React.useState(initialValues)
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const [dataSources] = useQuery(getDataSources, {})

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <div>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={values.name}
          onChange={handleChange("name")}
        ></TextField>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id={"datasource_label"}>{"Datasource"}</InputLabel>
          <Select
            id="datasource"
            labelId="datasource_label"
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
        </FormControl>
      </div>
      <div>{JSON.stringify(initialValues)}</div>
      <Button variant="contained" color="primary" onClick={() => onSubmit(values)}>
        Submit
      </Button>
    </form>
  )
}

export default ReportForm
