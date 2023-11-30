import React, { useContext,useEffect, useState } from "react"
import { Modal, Quote, ReadOnlyField } from "@components"
import { Jtp, Student, Submitted, IAssignment, ICourse, IEvaluation } from "@models"
import { selectAssignments, selectEvaluations } from '@store'
import { TagsContainer} from './styles'
import { ModalContext, SelectedContext } from "../../context"
import { CalendarMonthOutlined, ClassOutlined, CoPresentOutlined, NumbersOutlined, SchoolOutlined, ScoreOutlined } from "@mui/icons-material"
import { Radar } from "../Radar/Radar"
import { fetchEvaluation, fetchEvaluationByCourse } from '@src/services'
import { getAllStudents } from "@src/services"


export const EvaluationDetailModal = () => {
  const { isOpenSubmitted, closeSubmitted } = useContext(ModalContext)
  const totalEvaluations = selectEvaluations()
  const assignments: IAssignment[] = selectAssignments()
  const [evaluations, setEvaluations] = useState(totalEvaluations)
  const {
    assignment,
    evaluation,
    jtp,
    student,
    submitted,
  } = useContext(SelectedContext)
  const [value, setValue] = useState<string>('')
  const [course, setCourse] = useState<ICourse>()
  const [filtered, setFiltered] = useState<IEvaluation[]>(evaluations)

// Determina si es una autoevaluación
const isAutoevaluation = !jtp;
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

useEffect(() => {
  let _filtered = evaluations.filter(x => x.type === 1); // Agregar filtro por tipo
  if (assignment) {
    _filtered = _filtered.filter(x => x.assignment?.id === assignment?.id);
  }
  if (jtp) {
    setCourse(undefined);
    _filtered = _filtered.filter(x => x.jtp?.id === jtp?.id);
  }
  if (value) {
    setValue('');
  }
  setFiltered(_filtered);
}, [jtp]);
// Realiza la suma de las variables
const totalSum = evaluation?.variables.reduce((acc, variable) => acc + parseFloat(variable), 0);
// Convierte el resultado nuevamente a una cadena
const totalSumAsString = totalSum?.toString();
const professorEvaluations = evaluations.filter((evaluation) => evaluation.type === 1);
const studentEvaluations = evaluations.filter((evaluation) => evaluation.type === 2 && evaluation.student?.id === submitted?.student?.id);
const [showFullText, setShowFullText] = useState(false);
const [studentsSums, setStudentsSums] = useState({});

const reflections = submitted?.reflections || ''
const members = submitted?.members || []

// Declarar reflectionsObj a partir de las reflexiones y los miembros
const reflectionsObj: { [key: number]: string } = {};
if (evaluation?.reflectionsObj && submitted?.members) {
submitted.members.forEach((studentId) => {
  if (evaluation.reflectionsObj[studentId]) {
    reflectionsObj[studentId] = evaluation.reflectionsObj[studentId];
  }
});
}

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
        <ReadOnlyField icon={<NumbersOutlined />} label='Evaluacion' text={submitted?.qualification || '-'} />

    


<ReadOnlyField icon={<NumbersOutlined />} label='Autoevaluacion' text={totalSumAsString || '-'} />      
{submitted?.members?.map((studentId, index) => {
  // Asegurarse de que 'evaluation' no sea undefined antes de intentar usar 'evaluation.variables'.
  if (evaluation && evaluation.variables) {
    const notasPorEstudiante = 5;  // Reemplazar con el número real de notas por estudiante si es necesario.
    const start = index * notasPorEstudiante;
    const end = start + notasPorEstudiante;
    const studentNotes = evaluation.variables.slice(start, end);

    const studentTotal = studentNotes.reduce((acc, note) => acc + parseFloat(note), 0);
    const studentTotalAsString = studentTotal.toFixed(2); // Convierte a string con dos decimales para la presentación.

    return (
      <div key={studentId}>
        <ReadOnlyField
          icon={<SchoolOutlined />}
          label={`Autoevaluación de ${studentId}`}
          
          text={studentTotalAsString || '-'} />
      </div>
    );
  } else {
    // Maneja el caso en que 'evaluation' o 'evaluation.variables' sea undefined.
    // Puede ser retornando null o algún marcador de posición.
    return null;
  }
})}
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