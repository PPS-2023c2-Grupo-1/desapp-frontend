import React, { useContext, useEffect, useState } from 'react'
import { Box } from '@components'
import { Bar } from './Components'
import { selectAssignments, selectEvaluations } from '@store'
import { SelectedContext } from './context/SelectedContext'
import { fetchEvaluation, fetchEvaluationByCourse } from '@src/services'
import { IAssignment } from '@src/models'

export const AssignmentsBar = () => {
  const totalEvaluations = selectEvaluations()
  const assignments: IAssignment[] = selectAssignments()
  const [evaluations, setEvaluations] = useState(totalEvaluations)
  const { studentCourse } = useContext(SelectedContext)

  useEffect(
    () => {
      const fetchEaluations = async () => {
        if(studentCourse) {
          setEvaluations(await fetchEvaluationByCourse(studentCourse.id))
        } else {
          setEvaluations(await fetchEvaluation())
        }
      }
      fetchEaluations()
    },
    [studentCourse]
  )

  let qualifications = assignments
    .filter(x => studentCourse ? x.course?.id === studentCourse.id : true)
    .map(assignment => {
      const qualifications = evaluations
        .filter(x => x.assignment?.id === assignment.id)
        .map(x => x.variables.map(parseFloat).reduce((a, b) => a + b, 0))
        .filter(x => x > 0)
        .sort((a, b) => a - b)

      return {
        tp: `TP: ${assignment.id} - ${assignment.name}`,
        minimo: qualifications[0],
        promedio: parseInt((qualifications.reduce((a, b) => a + b, 0) / qualifications.length).toFixed(2)),
        maximo: qualifications.at(-1) || 0,
      }
    })
    .filter(x => x.minimo > 0 || x.maximo > 0)

  return (
    <Box
      sx={{
        backgroundColor: 'var(--unahurWhite)',
        borderRadius: '20px',
        margin: '24px',
        boxShadow: 'var(--box-shadow)',
        height: 1500,
        width: '100%',
      }}
    >
      <Bar data={qualifications} />
    </Box>
  )
}
