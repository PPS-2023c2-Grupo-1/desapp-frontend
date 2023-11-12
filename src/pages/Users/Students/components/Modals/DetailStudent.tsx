import React, { useContext } from "react"
import { Modal, Quote, ReadOnlyField } from "@components"
import { ModalContext, StudentContext } from "../../context"
import { BadgeOutlined, CalendarMonthOutlined, ClassOutlined, EmailOutlined, PhoneOutlined } from "@mui/icons-material"
import { TagsContainer} from './styles'

export const DetailStudentModal = () => {
  const { isOpenDetail, closeDetail } = useContext(ModalContext)
  const { selected } = useContext(StudentContext)




  const formatDate = (date: Date | undefined) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date ? new Date(date).toLocaleDateString('es-ES', options) : '';
  };

  return (
    <Modal
      onClose={() => { closeDetail() }}
      open={isOpenDetail}
      title={selected.fullName()}
    >
      <Quote text={selected.about} />
      <TagsContainer>
      <ReadOnlyField icon={<CalendarMonthOutlined />} label='Nacimiento' text={formatDate(selected.birthdate)} />

        <ReadOnlyField icon={<ClassOutlined />} label='Materia' text={selected.course.name} />
        <ReadOnlyField icon={<EmailOutlined />} label='Correo' text={selected.email} />
        <ReadOnlyField icon={<BadgeOutlined />} label='DNI' text={selected.dni} />
        <ReadOnlyField icon={<PhoneOutlined />} label='Télefono' text={selected.json.phone} />
      </TagsContainer>
    </Modal>
  )
}