import React, { useEffect, useState } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getSectionResult from "../queries/getSectionResult"

import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import { Collapse, IconButton, Button } from "@material-ui/core"
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  PlayCircleFilledWhite,
  Delete,
} from "@material-ui/icons"
import deleteSection from "../mutations/deleteSection"
import getGenericSectionResult from "../queries/getGenericSectionResult"
import { mapToQueryString } from "app/utils/Helper"
import getHttpSectionResult from "../queries/getHttpSectionResult"

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const HttpSection = ({ section, datasource, params, actionButtons }) => {
  const router = useRouter()

  let resp
  if (section.datasource == "http") {
    //TODO
  } else {
    resp = useQuery(getGenericSectionResult, {
      query: section.query,
      datasource: section.datasource || datasource,
      params: params,
      field: "",
    })
  }
  const result = resp[0]
  const classes = useStyles()

  const [open, setOpen] = React.useState(true)
  function drillDown(section, row) {
    if (!section.drilldown) return
    const drillDownParams = JSON.parse(section.drilldown)
    console.log("drilldown", drillDownParams)
    const reportId = drillDownParams["reportId"]
    if (!reportId) return
    let queryStr = ""
    for (var field of drillDownParams["params"]) {
      queryStr = queryStr.concat(field, "=", row[field] || params[field], "&")
    }
    return `/reports/${reportId}?${queryStr}`
  }

  if (!result) {
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
          <pre>{JSON.stringify(result, null, 2)}</pre>
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

export default HttpSection
