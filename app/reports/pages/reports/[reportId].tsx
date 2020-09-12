import React, { Suspense, useState } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useRouterQuery } from "blitz"
import getReport from "app/reports/queries/getReport"
import deleteReport from "app/reports/mutations/deleteReport"
import getSections from "app/sections/queries/getSections"
import Section from "app/sections/components/Section"
import HttpSection from "app/sections/components/HttpSection"
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core"
import getSectionResult from "app/sections/queries/getSectionResult"
import getGenericSectionResult from "app/sections/queries/getGenericSectionResult"
import { mapToQueryString } from "app/utils/Helper"
import dynamic from "next/dynamic"

const SectionAdvanced = dynamic(() => import("app/sections/components/SectionAdvanced"), {
  ssr: false,
})

export const Report = () => {
  const router = useRouter()
  const queryParams = useRouterQuery()
  const reportId = useParam("reportId", "number") || Number(queryParams["reportId"])
  const [report] = useQuery(getReport, { where: { id: reportId } })
  const [sections] = useQuery(getSections, { where: { reportId: reportId } })
  const datasource = report.datasource

  const params = JSON.parse(report.params) //temp[report.id] //

  let initReportInput = { ...queryParams, datasource: datasource, reportId: reportId }
  for (let key in params) {
    const param = params[key]
    param["params"] = initReportInput
    if (param.datasource) {
      // console.log(param)
      const [paramValues] = useQuery(getGenericSectionResult, param)
      // console.log(key, paramValues)
      params[key]["values"] = paramValues

      // console.log(paramValues)
    }
  }

  const [reportInput, setReportInput] = useState(initReportInput)
  function changeReportInput(field, value) {
    reportInput[field] = value
    // console.log(reportInput)
    setReportInput(reportInput)
    let queryStr = mapToQueryString(reportInput)

    router.push("/reports/[reportId]", `/reports/${reportId}?${queryStr}`)
  }

  function renderInput(field, data) {
    // console.log(reportInput)
    if (data["values"]) {
      return (
        <FormControl variant="outlined" fullWidth>
          <InputLabel id={field + "_label"}>{data["label"]}</InputLabel>
          <Select
            label={data["label"]}
            labelId={field + "_label"}
            id={field + "_select"}
            value={reportInput[field + "Select"]}
            fullWidth
            onChange={(db) => changeReportInput(field, db.target.value)}
          >
            {data["values"].map((db) => (
              <MenuItem value={db}>{db}</MenuItem>
            ))}
          </Select>
          <TextField
            id={field + "_input"}
            label={data["label"]}
            variant="outlined"
            fullWidth
            margin="normal"
            value={reportInput[field]}
            onChange={(db) => changeReportInput(field, db.target.value)}
          ></TextField>
        </FormControl>
        // <Autocomplete
        //   id={field + "_combo_input"}
        //   options={data["values"]}
        //   getOptionLabel={(option) => option + ""}
        //   renderInput={(params) => (
        //     <TextField
        //       id={field + "_input"}
        //       label={data["label"]}
        //       variant="outlined"
        //       fullWidth
        //       margin="normal"
        //       value={reportInput[field]}
        //       onChange={(db) => changeReportInput(field, db.target.value)}
        //     ></TextField>
        //   )}
        // />
      )
    } else {
      return (
        <TextField
          id={field + "_input"}
          label={data["label"]}
          variant="outlined"
          fullWidth
          margin="normal"
          value={reportInput[field]}
          onBlur={(db) => changeReportInput(field, db.target.value)}
        ></TextField>
      )
    }
  }

  function getSection(section) {
    if (section.datasource == "http") {
      return (
        <HttpSection
          section={section}
          datasource={section.datasource || datasource}
          params={reportInput}
          actionButtons={true}
        ></HttpSection>
      )
    } else {
      return (
        <SectionAdvanced
          section={section}
          datasource={section.datasource || datasource}
          params={reportInput}
          actionButtons={true}
        ></SectionAdvanced>
      )
    }
  }

  return (
    <div>
      <h1>{report.name}</h1>
      <div>
        {Object.keys(params).map((field) => renderInput(field, params[field]))}
        {sections.map((section) =>
          // JSON.stringify(section)
          getSection(section)
        )}
      </div>
      <Button variant="contained" color="primary">
        <Link href={`/sections/new?${mapToQueryString(reportInput)}`}>
          <span style={{ color: "#fff" }}>Add Section</span>
        </Link>
      </Button>
    </div>
  )
}

const ShowReportPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Report</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>
          {
            <Link href="/reports">
              <a>Reports</a>
            </Link>
          }
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Report />
        </Suspense>
      </main>
    </div>
  )
}

export default ShowReportPage
