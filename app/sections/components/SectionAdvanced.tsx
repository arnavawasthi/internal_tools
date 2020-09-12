import React, { useEffect, useState, forwardRef } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"

import { makeStyles } from "@material-ui/core/styles"
import { Collapse, IconButton, Button, TextField } from "@material-ui/core"
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  PlayCircleFilledWhite,
  Delete,
} from "@material-ui/icons"
import deleteSection from "../mutations/deleteSection"
import getGenericSectionResult from "../queries/getGenericSectionResult"
import { mapToQueryString } from "app/utils/Helper"
import MUIDataTable from "mui-datatables"
import SectionForm from "./SectionForm"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const SectionAdvanced = ({ section, datasource, params, actionButtons }) => {
  const router = useRouter()

  let resp
  if (section.datasource == "http") {
    //TODO:
  } else {
    resp = useQuery(getGenericSectionResult, {
      query: section.query,
      datasource: section.datasource || datasource,
      params: params,
      field: "",
    })
  }
  let result = resp[0]
  if (!result || result.length == 0) {
    result = [{}]
  }
  const classes = useStyles()

  const [open, setOpen] = React.useState(true)
  // const [actions, setActions] = React.useState([])
  const [rowsSelected, setRowsSelected] = React.useState([])
  // const classes = useRowStyles()

  const columns = result && result.length > 0 ? Object.keys(result[0]) : null

  if (section.drilldown) {
    columns?.push("")
  }

  const transformParams = {
    query: `
    //TODO:
    `,
    params: ["TBD"],
  }

  let actions = ""
  // columns?.push("Action")
  for (var rowSelected of rowsSelected) {
    let row = result[rowSelected]
    let queryStr = transformParams.query
    for (var field of transformParams["params"]) {
      queryStr = queryStr.replaceAll("$" + field, row[field] || params[field])
    }
    actions = actions.concat(queryStr)
  }

  for (var row of result) {
    if (!section.drilldown) break
    const drillDownParams = JSON.parse(section.drilldown)
    console.log("drilldown", drillDownParams)
    const reportId = drillDownParams["reportId"]
    if (!reportId) break
    // console.log(params)
    let queryStr = ""
    for (var field of drillDownParams["params"] as string) {
      queryStr = queryStr.concat(field, "=", row[field] || params[field], "&")
    }
    // router.push("/reports/[reportId]", `/reports/${reportId}?${queryStr}`)
    let url = `/reports/${reportId}?${queryStr}`

    row["drilldown"] = (
      <Button onClick={() => window.open(url)} variant="contained" color="secondary">
        Drilldown
      </Button>
    )
  }

  function handleRowSelection(currentRowsSelected, allRowsSelected, rowsSelected) {
    setRowsSelected(rowsSelected)
  }

  if (result.length == 0) {
    return <div></div>
  } else {
    return (
      <div>
        <h2>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>{" "}
          {section.description}
        </h2>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <pre>{section.query}</pre>
          <MUIDataTable
            title={section.description}
            columns={columns}
            data={result}
            options={{
              onRowSelectionChange: handleRowSelection,
              rowsSelected: rowsSelected,
            }}

            // components={{ TableToolbarSelect: SectionForm }}
          ></MUIDataTable>
          <TextField id="actions" multiline rowsMax={10} value={actions} fullWidth />

          <Button variant="contained" color="primary" disabled={!actionButtons}>
            <Link
              href="/sections/[sectionId]/edit"
              as={`/sections/${section.id}/edit?${mapToQueryString(params)}`}
            >
              <span style={{ color: "#fff" }}>Edit</span>
            </Link>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={!actionButtons}
            startIcon={<Delete />}
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteSection({ where: { id: section.id } })
                // router.refre
              }
            }}
          >
            Delete
          </Button>
        </Collapse>
      </div>
    )
  }

  // return <div>{JSON.stringify(result)}</div>
}

export default SectionAdvanced
