import React from 'react'
import { AppLayout, Box, FloatingCard } from '@components'
import { Cards, EvaluationStats, Pie } from './Components'
import { AssignmentsBar } from './AssignmentsBar'
import { selectEvaluations } from '@src/store'
import { SelectedProvider } from './context/SelectedContext'
import { Skeleton } from "@mui/material"


export const OverviewPage = () => {
  const total = selectEvaluations().map(x => x.variables.map(parseFloat).reduce((a, b) => a + b, 0))

  const approved = total.filter(x => x >= 4 && x !== 0).length
  const disapproved = total.filter(x => x < 4 && x !== 0).length
  const unrated = total.length - approved - disapproved

  const stats = [
    {
      id: "Aprobados",
      label: "Aprobados",
      value: approved
    }, {
      id: "Desaprobados",
      label: "Desaprobados",
      value: disapproved
    }, {
      id: "Sin Calificar",
      label: "Sin Calificar",
      value: unrated
    }
  ]

  return (
    <SelectedProvider>
    <AppLayout title='Vista General'>
      <Cards />
      <Box
        display='flex'
        gap='40px'
        flexWrap='wrap'
        width='100%'
        maxWidth='1800px'
        justifyContent='space-evenly'
      >
        <FloatingCard
            title='PORCENTAJE DE APROBACIÓN'
            width='40%'
            height='368px'
            minWidth='368px'
            children={
              total.length > 0
                ? <Pie data={stats}/>
                : <Skeleton variant="circular" animation="wave" width={320} height={320} />
            }
          />
          <EvaluationStats/>
        <AssignmentsBar />
      </Box>
    </AppLayout>
    </SelectedProvider>
  )
}
