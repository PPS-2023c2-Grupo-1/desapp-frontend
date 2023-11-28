import React, { useContext, useEffect, useState } from 'react'
import { Box, Table } from '@components'
import { Bar } from './Components'
import { selectAssignments, selectEvaluations } from '@store'
import { SelectedContext } from './context/SelectedContext'
import { fetchEvaluation, fetchEvaluationByCourse } from '@src/services'
import { IAssignment } from '@src/models'
import { Skeleton, Modal  } from "@mui/material"
import { barData } from './Components/Charts/props'
import * as XLSX from 'xlsx';

export const AssignmentsBar = () => {
  const totalEvaluations = selectEvaluations()
  const assignments: IAssignment[] = selectAssignments()
  const [evaluations, setEvaluations] = useState(totalEvaluations)
  const { studentCourse } = useContext(SelectedContext)


  const handleExport = () => {
    // Crear una nueva hoja de trabajo
    const ws = XLSX.utils.json_to_sheet(qualifications);
  
    // Crear un nuevo libro de trabajo y añadir la hoja de trabajo
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Estadisticas");
  
    // Escribir el libro de trabajo y descargar el archivo Excel
    XLSX.writeFile(wb, "estadisticas_exportadas.xlsx");
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
    
    <> <Box
    
      sx={{
        
        backgroundColor: '#EEEEEE', // Change the background color to light gray.
    borderRadius: '30px', // Change the border radius to 30 pixels.
    margin: '30px', // Change the margin to 30 pixels.
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)', // Change the box shadow to a light gray shadow.
    height: 1000, // Change the height to 1000 pixels.
    width: '100%',
      }}

      
    >
      
      <Bar 
        data={qualifications}
        
      />

      
    </Box ><button  className="buttonstatic" onClick={handleExport}>Exportar a Excel</button>







    
</>


  )
}
