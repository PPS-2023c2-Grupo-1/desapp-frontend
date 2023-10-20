import React, { useContext } from "react"
import { BadgeOutlined, EmailOutlined, FullscreenModal, ReadOnlyField } from "@components"
import { Student } from "@models"
import { ModalContext, SelectedContext } from "../../context"
import { Modal } from '../../../../components/Modal/Modal';
import { Quote } from '../../../../components/Quote/Quote';
import { TagsContainer } from './styles';
import { ClassOutlined, CalendarMonthOutlined } from '@mui/icons-material';
import { motion } from "framer-motion";



export const StudentDetailModal = () => {
  const { isOpenStudentDetail, closeStudentDetail } = useContext(ModalContext)
  const selected = useContext(SelectedContext)
  const student = selected.student && new Student(selected.student)

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.8 }, // Establece una escala inicial si lo deseas
    visible: { opacity: 1, scale: 1 },
  };


  
  const imageStyle = {
    width: "220px", // Establece el ancho de la imagen según tus necesidades
    height: "auto",  // El valor "auto" mantiene la proporción original
  };


  return (

    
    <Modal
      onClose={() => { closeStudentDetail() }}
      open={isOpenStudentDetail}
      title={student?.fullName()}
    >
    
      <TagsContainer>
      <ReadOnlyField icon={<CalendarMonthOutlined />} label='Nacimiento' text={student?.birthdate?.toDateString()} />
      <ReadOnlyField icon={<EmailOutlined />} label={"Correo"} text={student?.email} />
      <ReadOnlyField icon={<BadgeOutlined />} label='DNI' text={student?.dni} />
      <ReadOnlyField icon={<ClassOutlined />} label='Materia' text={student?.course.name} />

      </TagsContainer>

      <motion.img
          src="https://www.pngall.com/wp-content/uploads/8/College-Student.png"
          alt="Imagen de estudiante"
          style={{ width: "150px", height: "auto" }}
          initial="hidden"
          animate="visible"
          variants={imageAnimation}
        />
    </Modal>
  )
}