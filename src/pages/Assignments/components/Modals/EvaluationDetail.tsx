import React, { useContext,useEffect, useState } from "react"
import { Modal, Quote, ReadOnlyField } from "@components"
import { Jtp, Student, Submitted, IAssignment  } from "@models"
import { selectAssignments, selectEvaluations } from '@store'
import { TagsContainer} from './styles'
import { ModalContext, SelectedContext } from "../../context"
import { CalendarMonthOutlined, ClassOutlined, CoPresentOutlined, NumbersOutlined, SchoolOutlined, ScoreOutlined } from "@mui/icons-material"
import { Radar } from "../Radar/Radar"
import { fetchEvaluation, fetchEvaluationByCourse } from '@src/services'
import { getAllStudents } from "@src/services"

export const EvaluationDetailModal = () => {

  const totalEvaluations = selectEvaluations()
  const assignments: IAssignment[] = selectAssignments()
  const [evaluations, setEvaluations] = useState(totalEvaluations)
  const { isOpenSubmitted, closeSubmitted } = useContext(ModalContext)
  const {
    assignment,
    course,
    evaluation,
    jtp,
    student,
    submitted,
  } = useContext(SelectedContext)

  // Determina si es una autoevaluación
  const isAutoevaluation = !jtp;
  
  return (
    
    <Modal
      onClose={() => { closeSubmitted() }}
      open={isOpenSubmitted}
      title='Entrega'
      
    >

      { submitted?.reflections && <Quote label='Reflexion' text={submitted?.reflections} /> }
      { evaluation?.reflections && <Quote label='Devolución' text={evaluation?.reflections} /> }
      <TagsContainer>
        
        
        { student && <ReadOnlyField icon={<SchoolOutlined />} label='Estudiante' text={new Student(student).fullName()} /> }
        { student && <ReadOnlyField icon={<SchoolOutlined />} label='Estudiantes' text={submitted?.members.join(', ') || '-'} /> }
        { jtp && <ReadOnlyField icon={<CoPresentOutlined />} label='Responsable' text={new Jtp(jtp).fullName()} /> }
        { course && <ReadOnlyField icon={<ClassOutlined />} label='Curso' text={course.name} /> }
        { submitted && <ReadOnlyField icon={<CalendarMonthOutlined />} label='Fecha Entrega' text={new Submitted(submitted).date} /> }
         <ReadOnlyField icon={<NumbersOutlined />} label='Evaluacion' text={submitted?.qualification.toString() || '-'} />
        <ReadOnlyField icon={<NumbersOutlined />} label='Autoevaluacion' text={evaluation?.variables.toString() || '-'} />
        {submitted?.members && submitted?.members.map((studentId) => (
  <div key={studentId}>
    <ReadOnlyField
      icon={<SchoolOutlined />}
      label={`Autoevaluación de ${studentId}`}
      text={evaluation?.variables.toString() || '-'}
    />
  </div>
))}


      </TagsContainer>
      {
        assignment && assignment.variables[0]  !== 'Esta actividad no será evaluada'  && evaluation   &&
        <div style={{ height: '360px', width: '100%' }}>


 

        <Radar data={[
          {
            //variable: assignment.variables[0],
            //evaluacion: evaluation.variables[0],
         
            variable:  assignment.variables[0],
            evaluacion:  evaluation.variables[0],
            
            variable2:assignment.variables2[0],
            autoevaluation: evaluation.variables2[0],
          
            
          },  
         
          {
            variable: assignment.variables[1], 
            evaluacion: evaluation.variables[1],
            variable2:assignment.variables2[1],
            autoevaluation: evaluation.variables2[1],
       
          }, 
            
          {
            variable: assignment.variables[2],
            evaluacion: evaluation.variables[2],
           variable2:assignment.variables2[2],
           autoevaluation: evaluation.variables2[2],
        
          }, {
            variable: assignment.variables[3],
            evaluacion: evaluation.variables[3],
            variable2:assignment.variables2[3],
            autoevaluation: evaluation.variables2[3],
           
          }, {
            variable: assignment.variables[4],
            evaluacion: evaluation.variables[4],
           variable2:assignment.variables2[4],
           autoevaluation: evaluation.variables2[4],
       
          }, 

    




          ]}/>

  
        </div>
      }
    </Modal>
  )
}