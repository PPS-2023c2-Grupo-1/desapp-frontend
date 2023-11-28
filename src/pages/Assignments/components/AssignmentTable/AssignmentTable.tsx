import React, { useEffect, useState } from "react"
import { getAssignmentColumns } from "./AssignmentColumns"
import { AssignmentSelector, CourseSelector, CourseSelectorYear, Field, JtpSelector, Table } from '@components'
import { IAssignment, ICourse, IJtp } from '@models'
import { selectAssignments, selectCourses, selectJtps, selectRole } from '@store'
import { AssignmentDetailModal } from "../Modals"
import { SelectChangeEvent } from "@mui/material"
import { CalendarMonthOutlined, ClassOutlined, CoPresentOutlined } from "@mui/icons-material"


export const AssignmentTable = () => {
  const role = selectRole().toLocaleLowerCase()
  const assignments: IAssignment[] = selectAssignments()
  const jtps = selectJtps()
  const courses = selectCourses()
  const [value, setValue] = useState<string>('')
  const [filtered, setFiltered] = useState<IAssignment[]>(assignments)
  const [course, setCourse] = useState<ICourse>()
  const [jtp, setJtp] = useState<IJtp>()

  useEffect(() => {
    if(course) {
      setJtp(undefined)
      setFiltered(assignments.filter(x => x.course?.id === course?.id))
    }
    if(value) setValue('')

  }, [course])

  useEffect(() => {
    if(jtp) {
      setCourse(undefined)
      setFiltered(assignments.filter(x => x.jtp?.id === jtp?.id))
    }
    if(value) setValue('')
  }, [jtp])

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = event.target.value.toString()
    setValue(value)
    value = value.toLocaleLowerCase()
    let assignmentsFiltered = assignments.filter(x => x.name.toLocaleLowerCase().includes(value))

    if(course) assignmentsFiltered = assignmentsFiltered
      .filter(x => x.course?.name === course?.name)

    if(jtp) assignmentsFiltered = assignmentsFiltered
      .filter(x => x.jtp?.id === jtp.id)

    setFiltered(assignmentsFiltered)
  }

  const handleCourse = (event: SelectChangeEvent<unknown>) => {
    setCourse(courses.find(x => x.id === event.target.value as number))
  }

  const handleCourseYear = (event: SelectChangeEvent<unknown>) => {
    const selectedStart = event.target.value as string;
    const filteredAssignments = assignments.filter(x => x.date.start.toString() === selectedStart);
    setFiltered(filteredAssignments);
}

  const handleJtp = (event: SelectChangeEvent<unknown>) => {
    setJtp(jtps.find(x => x.id === event.target.value as number))
  }

  return (
    <>
      <AssignmentDetailModal />
      <Table
        columns={[]}
        handleColumns={getAssignmentColumns}
        search={<Field variant='search' value={value} onChange={onChange} placeholder='Buscar...'/>}
        filters={ role === 'admin' &&
          <>
            <CourseSelector
              onChange={handleCourse}
              value={course?.id || -1}
            />
          <CourseSelectorYear
              onChange={handleCourseYear}
              value={assignments[0]?.date.start.getFullYear() || -1}
              />
            
            <JtpSelector
              onChange={handleJtp}
              value={jtp?.id || -1}
            />
          </>
        }
        loading={!assignments.length}
        rows={(!!value || course || jtp) ? filtered : assignments}
      />
    </>
  )
}
