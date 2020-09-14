import React from "react"
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core"

type DataSourceFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const DataSourceForm = ({ initialValues, onSubmit }: DataSourceFormProps) => {
  const [values, setValues] = React.useState(initialValues)
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <div>
        <TextField
          id="id"
          label="Id"
          disabled={true}
          variant="outlined"
          fullWidth
          margin="normal"
          value={values.id}
          onChange={handleChange("id")}
        ></TextField>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={values.name}
          onChange={handleChange("name")}
        ></TextField>
        <TextField
          id="sourceKey"
          label="Source Key"
          variant="outlined"
          fullWidth
          margin="normal"
          value={values.sourceKey}
          onChange={handleChange("sourceKey")}
        ></TextField>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id={"sourceType_label"}>{"Source Type"}</InputLabel>
          <Select
            id="sourceType"
            labelId="sourceType_label"
            label="Source Type"
            variant="outlined"
            fullWidth
            value={values.sourceType}
            onChange={handleChange("sourceType")}
          >
            <MenuItem value="db">db</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="params"
          label="Params"
          helperText="Used as is for creating DB connection. Refer to ormconfig.json"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          value={values.params}
          onChange={handleChange("params")}
        ></TextField>
        <TextField
          id="env"
          label="Environment"
          variant="outlined"
          fullWidth
          margin="normal"
          value={values.env}
          onChange={handleChange("env")}
        ></TextField>
      </div>
      <div>{JSON.stringify(values)}</div>
      <Button variant="contained" color="primary" onClick={() => onSubmit(values)}>
        Submit
      </Button>
    </form>
  )
}

export default DataSourceForm
