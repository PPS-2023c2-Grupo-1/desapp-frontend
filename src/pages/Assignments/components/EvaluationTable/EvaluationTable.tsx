import React, { useEffect, useState } from "react"
import { getEvaluationColumns } from "./EvaluationColumns"
import { IAssignment, ICourse, IEvaluation, IJtp } from '@models'
import { selectAssignments, selectCourses, selectEvaluations, selectJtps, selectRole } from "@store"
import { AssignmentSelector, CourseSelector, CourseSelectorYear, Field, JtpSelector, Table } from '@components'
import {
  AssignmentDetailModal,
  EvaluationDetailModal,
  StudentDetailModal,
} from "../Modals"
import { SelectChangeEvent } from "@mui/material"

export const EvaluationTable = () => {
  const role = selectRole().toLocaleLowerCase()
  const evaluations: IEvaluation[] = selectEvaluations()
  const assignments: IAssignment[] = selectAssignments()
  const jtps: IJtp[] = selectJtps()
  const courses: ICourse[] = selectCourses()

  const [value, setValue] = useState<string>('')
  const [filtered, setFiltered] = useState<IEvaluation[]>(evaluations)
  const [assignment, setAssignment] = useState<IAssignment>()
  const [course, setCourse] = useState<ICourse>()
  const [jtp, setJtp] = useState<IJtp>()

  useEffect(() => {
    if(assignment) setFiltered(evaluations.filter(x => x.assignment?.id === assignment?.id))
    if(value) setValue('')
  }, [assignment])

  useEffect(() => {
    let _filtered = evaluations
    if(assignment) {
      _filtered = _filtered.filter(x => x.assignment?.id === assignment?.id)
    }
    if(course) {
      setJtp(undefined)
      _filtered = _filtered.filter(x => x.course?.id === course?.id)
    }
    if(value) setValue('')
    setFiltered(_filtered)
  }, [course])

  useEffect(() => {
    let _filtered = evaluations
    if(assignment) {
      _filtered = _filtered.filter(x => x.assignment?.id === assignment?.id)
    }
    if(jtp) {
      setCourse(undefined)
      _filtered = _filtered.filter(x => x.jtp?.id === jtp?.id)
    }
    if(value) setValue('')
    setFiltered(_filtered)
  }, [jtp])

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = event.target.value.toString()
    setValue(value)
    value = value.toLocaleLowerCase()
    let _filtered = evaluations.filter(x =>
      x.student?.name.first.toLocaleLowerCase().includes(value) ||
      x.student?.name.last.toLocaleLowerCase().includes(value) ||
      x.jtp?.name.first.toLocaleLowerCase().includes(value) ||
      x.jtp?.name.last.toLocaleLowerCase().includes(value) ||
      x.course?.name.toLocaleLowerCase().includes(value) ||
      x.assignment?.name.toLocaleLowerCase().includes(value)
    )

    if(assignment) {
      _filtered = _filtered.filter(x => x.assignment?.id === assignment?.id)
    }

    if(course) {
      _filtered = _filtered.filter(x => x.course?.id === course?.id)
    } else if(jtp) {
      _filtered = _filtered.filter(x => x.jtp?.id === jtp.id)
    }

    setFiltered(_filtered)
  }

  const handleCourse = (event: SelectChangeEvent<unknown>) => {
    setCourse(courses.find(x => x.id === event.target.value as number))
  }

  const handleJtp = (event: SelectChangeEvent<unknown>) => {
    setJtp(jtps.find(x => x.id === event.target.value as number))
  }

  const handleAssignment = (event: SelectChangeEvent<unknown>) => {
    setAssignment(assignments.find(x => x.id === event.target.value as number))
  }

  return (
    <>
      <AssignmentDetailModal />
      <EvaluationDetailModal />
      <StudentDetailModal />
      <Table
        columns={[]}
        handleColumns={getEvaluationColumns}
        search={<Field variant='search' value={value} onChange={onChange} placeholder='Buscar...'/>}
        filters={
          role === 'admin'
          ? (
            <>
              <CourseSelector
                onChange={handleCourse}
                value={course?.id || -1}
              />
              
            
              <JtpSelector
                onChange={handleJtp}
                value={jtp?.id || -1}
              />
            </>
          ): (
            <AssignmentSelector
              onChange={handleAssignment}
              value={assignment?.id || -1}
            />
          )
        }
        loading={!evaluations.length}
        rows={(!!value || course || jtp || assignment?.id) ? filtered : evaluations}
      />
    </>
  )
}
