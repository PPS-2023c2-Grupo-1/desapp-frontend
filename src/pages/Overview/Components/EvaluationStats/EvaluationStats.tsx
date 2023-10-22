import React from 'react'
import { FloatingCard } from '@components'
import {
  AssignmentCounterContainer,
  EvaluationStatsContainer
} from './styles'
import { selectEvaluations, selectSubmitted } from '@store'
import {Skeleton} from "@mui/material";

interface assignmentCounterProps {
  small?: boolean,
  vertical?: boolean,
  color?: string,
  count: number | string,
  label: string,
}
const AssignmentCounter = ({color, count, label, small, vertical}: assignmentCounterProps) => {
  return (
    <AssignmentCounterContainer small={small} color={color} vertical={vertical}>
      <span />
      {
        count
          ? <><h2>{count}</h2> <p>{label}</p></>
          : <Skeleton variant={"text"} width={"100%"} />
      }
    </AssignmentCounterContainer>
  )
}

export const EvaluationStats = () => {
  const total = selectEvaluations().map(x => x.variables.map(parseFloat).reduce((a, b) => a + b, 0))
  const approved = total.filter(x => x >= 4 && x !== 0).length
  const disapproved = total.filter(x => x < 4 && x !== 0).length
  const unrated = total.length - approved - disapproved
 
  return (
    <EvaluationStatsContainer>
      <FloatingCard title='Entregas' width='220px'>
        <div style={{ display: 'flex', width: '220px', justifyContent: 'space-evenly'}}>
          <AssignmentCounter vertical count={total.length} label='Total' />
          <AssignmentCounter vertical count={total.length - unrated} label='Corregidos' />
        </div>
      </FloatingCard>
      <AssignmentCounter color='var(--unahurGreen)' count={approved} label='Aprobados' />
      <AssignmentCounter color='var(--unahurRed)' count={disapproved} label='No Aprobados' />
      <AssignmentCounter color='var(--unahurGrey)' count={unrated} label='Sin Calificar' />
    </EvaluationStatsContainer>
  )
}
