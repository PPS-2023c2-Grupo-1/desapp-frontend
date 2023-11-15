import React, { useContext, useEffect, useState } from 'react'
import { AppLayout, Box, FloatingCard, Table } from '@components'
import { BarVariables } from '../../../pages/Overview/Components/Charts/BarVariables'
import { courses, selectAssignments, selectEvaluations } from '@store'
import { SelectedContext, SelectedProvider } from '../../../pages/Overview/context/SelectedContext'
import { fetchEvaluation, fetchEvaluationByCourse } from '@src/services'
import {  IAssignment, IEvaluation } from '@src/models'

import * as XLSX from 'xlsx';
import { AssignmentsBar } from '@src/pages/Overview/AssignmentsBar'
import { TagsContainer } from '../components/Modals/styles'

interface CardProps {
  title: string;
  description: string;
  onClick: () => void; // suponiendo que onClick no toma ningún parámetro y no retorna nada
  buttonText: string;
}

export const StatsPage = () => {
  const totalEvaluations = selectEvaluations()
  const assignments: IAssignment[] = selectAssignments()

  const [evaluations, setEvaluations] = useState(totalEvaluations)
  const { studentCourse } = useContext(SelectedContext)
 

  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isStatsVisible1, setIsStatsVisible1] = useState(false);

  // Paso 2: Función para alternar la visibilidad
  const toggleStatsVisibility = () => {
    setIsStatsVisible(!isStatsVisible);
  };

  const toggleStatsVisibility1 = () => {
    setIsStatsVisible1(!isStatsVisible1);
  };

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

  
  const Card: React.FC<CardProps> = ({ title, description, onClick, buttonText }) => (
    <div className="cardStatic ">
      <div className="card-contentStatic h2">
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="button-static2" onClick={onClick}>{buttonText}</button>
      </div>
    </div>
  );
  
  const barChartData = assignments.map(assignment => {
  const assignmentEvaluations = evaluations.filter(evaluation => evaluation.assignment?.id === assignment.id);

  // Aquí, debes calcular los valores para cada variable basándote en todas las evaluaciones encontradas.
  // Por ejemplo, si quieres la media de la primera variable de todas las evaluaciones de un TP:
  const variable1Average = assignmentEvaluations.reduce((acc, curr) => {
    return acc + parseFloat(curr.variables[0],); 
  }, 0) 
  const variable2Average = assignmentEvaluations.reduce((acc, curr) => {
    return acc + parseFloat(curr.variables[1],); 
  }, 0) 
  // Repite para las demás variables...
  const variable3Average = assignmentEvaluations.reduce((acc, curr) => {
    return acc + parseFloat(curr.variables[2],); 
  }, 0) 

  const variable4Average = assignmentEvaluations.reduce((acc, curr) => {
    return acc + parseFloat(curr.variables[3],); 
  }, 0) 

  const variable5Average = assignmentEvaluations.reduce((acc, curr) => {
    return acc + parseFloat(curr.variables[4],); 
  }, 0) 
  
  return {

    
    tp: `TP: ${assignment.id} - ${assignment.name}`,
    variable1: variable1Average,
    variable2: variable2Average,

    variable3: variable3Average,

    variable4: variable4Average,
    variable5: variable5Average,

    // ... otras variables
  };
});
    
const handleExport = () => {
  // Crear una nueva hoja de trabajo
  const ws = XLSX.utils.json_to_sheet(barChartData);

  // Crear un nuevo libro de trabajo y añadir la hoja de trabajo
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Estadisticas");

  // Escribir el libro de trabajo y descargar el archivo Excel
  XLSX.writeFile(wb, "estadisticas_exportadas.xlsx");







};
  return (
    <SelectedProvider>
    <AppLayout title='Estadisticas'>
       {/* Botón de alternar */}


       <div className="cards-containerStatic">
          <Card
            title="Estadísticas de Variables"
            description="Muestra estadísticas detalladas de las variables."
            onClick={toggleStatsVisibility}
            buttonText={isStatsVisible ? 'Ocultar' : 'Ver Estadísticas'}
          />
          <Card
            title="Estadísticas de TP"
            description="Visualiza las estadísticas relacionadas con TP."
            onClick={toggleStatsVisibility1}
            buttonText={isStatsVisible1 ? 'Ocultar' : 'Ver Estadísticas'}
          />
        </div>
     {/* Paso 3 y 4: Componente desplegable con la vista de estadísticas */}
     {isStatsVisible && (
      
    <><Box

            sx={{
              display: 'flex',
              backgroundColor: '#EEEEEE',
              borderRadius: '30px',
              margin: '30px',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
              height: 1000,
              width: '100%',
            }}


          >

            <BarVariables

              data={barChartData} />


          </Box>        <button  className="buttonstatic" onClick={handleExport}>Exportar a Excel</button>
</>
          
      )}    
     
    {/* Paso 3 y 4: Componente desplegable con la vista de estadísticas */}
    {isStatsVisible1 && (
      <>
      <AssignmentsBar />
  </>
            
        )}    
    
    
    </AppLayout>
    </SelectedProvider>        

  )
  
}
